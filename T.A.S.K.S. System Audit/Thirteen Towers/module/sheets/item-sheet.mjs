/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ThirteenTowersItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["thirteen-towers", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/thirteen-towers/templates/item";
    // Return a single sheet for all item types for now.
    // Later you can create specific templates:
    // return `${path}/item-${this.item.type}-sheet.hbs`;
    return `${path}/item-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = this.document.toObject(false);

    // Add the item's data to context.data for easier access
    context.system = itemData.system;
    context.flags = itemData.flags;

    // Add configuration options
    context.config = {
      archetypeTypes: {
        shieldbearer: "Shieldbearer",
        silentknife: "Silentknife",
        songbearer: "Songbearer",
        oathbound: "Oathbound",
        patternweaver: "Patternweaver",
        edgerunner: "Edgerunner",
        linekeeper: "Linekeeper"
      },
      domainTypes: {
        martial: "Martial",
        covert: "Covert",
        magicTech: "Magic/Tech",
        spiritual: "Spiritual",
        economic: "Economic",
        political: "Political"
      },
      tierTypes: {
        novice: "Novice",
        journeyman: "Journeyman",
        adept: "Adept",
        expert: "Expert",
        master: "Master",
        apex: "Apex"
      },
      weaponTypes: {
        light: "Light (1d6)",
        medium: "Medium (1d8)",
        heavy: "Heavy (1d10)"
      },
      armorTypes: {
        none: "None",
        light: "Light",
        medium: "Medium",
        heavy: "Heavy"
      },
      attackStats: {
        body: "Body",
        reflex: "Reflex"
      }
    };

    // Enrich description for display
    context.enrichedDescription = await TextEditor.enrichHTML(
      this.item.system.description,
      {
        secrets: this.document.isOwner,
        async: true
      }
    );

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.
  }
}
