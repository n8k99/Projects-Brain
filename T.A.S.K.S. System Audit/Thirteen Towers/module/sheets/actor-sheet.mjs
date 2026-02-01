import {rollCheck, getDifficulty} from "../dice/dice.mjs";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ThirteenTowersActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["thirteen-towers", "sheet", "actor"],
      width: 720,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
    });
  }

  /** @override */
  get template() {
    return `systems/thirteen-towers/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve the data structure from the base sheet.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.document.toObject(false);

    // Add the actor's data to context.data for easier access
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Add roll data for TinyMCE editors.
    context.rollData = this.actor.getRollData();

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Enrich biography info for display
    context.enrichedBiography = await TextEditor.enrichHTML(
      this.actor.system.biography,
      {
        secrets: this.document.isOwner,
        async: true
      }
    );

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} context  The context object to mutate
   */
  _prepareCharacterData(context) {
    // Add archetype data
    const archetypes = {
      shieldbearer: "Shieldbearer",
      silentknife: "Silentknife",
      songbearer: "Songbearer",
      oathbound: "Oathbound",
      patternweaver: "Patternweaver",
      edgerunner: "Edgerunner",
      linekeeper: "Linekeeper"
    };
    context.archetypes = archetypes;

    // Add domain data
    const domains = {
      martial: "Martial",
      covert: "Covert",
      magicTech: "Magic/Tech",
      spiritual: "Spiritual",
      economic: "Economic",
      political: "Political"
    };
    context.domains = domains;

    // Add cultures
    context.cultures = [
      "Dail Human",
      "Celanthari High Elves",
      "Elfish",
      "Lothian Dark Elfish",
      "Zhulmar Dwarves",
      "Khazadur Dwarves",
      "Halfling Valewardens",
      "Yotunn Giants",
      "Etrivalian"
    ];
  }

  /**
   * Organize and classify Items for all sheets.
   *
   * @param {Object} context  The context object to mutate
   */
  _prepareItems(context) {
    // Initialize containers.
    const weapons = [];
    const armor = [];
    const equipment = [];
    const archetypes = [];
    const domains = [];
    const treeNodes = [];
    const tags = [];
    const principles = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to appropriate array
      switch (i.type) {
        case 'weapon':
          weapons.push(i);
          break;
        case 'armor':
          armor.push(i);
          break;
        case 'equipment':
          equipment.push(i);
          break;
        case 'archetype':
          archetypes.push(i);
          break;
        case 'domain':
          domains.push(i);
          break;
        case 'treeNode':
          treeNodes.push(i);
          break;
        case 'tag':
          tags.push(i);
          break;
        case 'principle':
          principles.push(i);
          break;
      }
    }

    // Assign and return
    context.weapons = weapons;
    context.armor = armor;
    context.equipment = equipment;
    context.archetypes = archetypes;
    context.domains = domains;
    context.treeNodes = treeNodes;
    context.tags = tags;
    context.principles = principles;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Stat rolls
    html.on('click', '.stat-roll', this._onStatRoll.bind(this));

    // Weapon attack
    html.on('click', '.weapon-attack', this._onWeaponAttack.bind(this));

    // Weapon damage
    html.on('click', '.weapon-damage', this._onWeaponDamage.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[${dataset.label}]` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  /**
   * Handle stat rolls
   * @param {Event} event   The originating click event
   * @private
   */
  async _onStatRoll(event) {
    event.preventDefault();
    const statKey = event.currentTarget.dataset.stat;

    // Create dialog to get edge and difficulty
    const dialogContent = `
      <form>
        <div class="form-group">
          <label>Edge Modifier:</label>
          <input type="number" name="edge" value="0" />
        </div>
        <div class="form-group">
          <label>Difficulty:</label>
          <select name="difficulty">
            <option value="8">8 - Trivial</option>
            <option value="12" selected>12 - Standard</option>
            <option value="16">16 - Hard</option>
            <option value="20">20 - Extreme</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div class="form-group" id="custom-difficulty" style="display:none;">
          <label>Custom Difficulty:</label>
          <input type="number" name="customDifficulty" value="12" />
        </div>
      </form>
    `;

    new Dialog({
      title: `${statKey.toUpperCase()} Check`,
      content: dialogContent,
      buttons: {
        roll: {
          label: "Roll",
          callback: async (html) => {
            const edge = parseInt(html.find('[name="edge"]').val()) || 0;
            let difficulty = html.find('[name="difficulty"]').val();

            if (difficulty === 'custom') {
              difficulty = parseInt(html.find('[name="customDifficulty"]').val()) || 12;
            } else {
              difficulty = parseInt(difficulty);
            }

            await this.actor.rollCheck(statKey, edge, {
              flavor: `${statKey.toUpperCase()} Check (DC ${difficulty})`
            });
          }
        },
        cancel: {
          label: "Cancel"
        }
      },
      render: (html) => {
        html.find('[name="difficulty"]').change((ev) => {
          if (ev.target.value === 'custom') {
            html.find('#custom-difficulty').show();
          } else {
            html.find('#custom-difficulty').hide();
          }
        });
      },
      default: "roll"
    }).render(true);
  }

  /**
   * Handle weapon attack rolls
   * @param {Event} event   The originating click event
   * @private
   */
  async _onWeaponAttack(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest('.item').dataset.itemId;
    const item = this.actor.items.get(itemId);

    if (item) {
      await item.rollAttack(this.actor);
    }
  }

  /**
   * Handle weapon damage rolls
   * @param {Event} event   The originating click event
   * @private
   */
  async _onWeaponDamage(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest('.item').dataset.itemId;
    const item = this.actor.items.get(itemId);

    if (item) {
      await item.rollDamage();
    }
  }
}
