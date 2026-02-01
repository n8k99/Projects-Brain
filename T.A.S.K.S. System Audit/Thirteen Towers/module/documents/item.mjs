/**
 * Extend the base Item document
 */
export class ThirteenTowersItem extends Item {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing derived data.
  }

  /**
   * @override
   * Augment the item source data with additional dynamic data.
   */
  prepareDerivedData() {
    const itemData = this;
    const systemData = itemData.system;
    const flags = itemData.flags.thirteenTowers || {};

    // Make separate methods for each Item type
    this._prepareWeaponData(itemData);
    this._prepareArmorData(itemData);
  }

  /**
   * Prepare Weapon type specific data
   */
  _prepareWeaponData(itemData) {
    if (itemData.type !== 'weapon') return;

    const systemData = itemData.system;

    // Add two-handed damage bonus
    if (systemData.twoHanded) {
      systemData.damageBonus += 2;
    }
  }

  /**
   * Prepare Armor type specific data
   */
  _prepareArmorData(itemData) {
    if (itemData.type !== 'armor') return;
    // Armor calculations if needed
  }

  /**
   * Roll an attack with this weapon
   * @param {Actor} actor - The actor making the attack
   */
  async rollAttack(actor) {
    if (this.type !== 'weapon') {
      ui.notifications.warn('This item cannot be used to attack.');
      return;
    }

    const systemData = this.system;
    const stat = actor.system.stats[systemData.attackStat];

    if (!stat) {
      ui.notifications.warn(`Invalid attack stat: ${systemData.attackStat}`);
      return;
    }

    // Get edge from weapon
    const edge = systemData.edge || 0;

    // Roll to hit
    const attackRoll = await actor.rollCheck(systemData.attackStat, edge, {
      flavor: `Attack with ${this.name}`
    });

    return attackRoll;
  }

  /**
   * Roll damage for this weapon
   */
  async rollDamage() {
    if (this.type !== 'weapon') {
      ui.notifications.warn('This item cannot deal damage.');
      return;
    }

    const systemData = this.system;
    let formula = systemData.damage;

    // Add damage bonus
    if (systemData.damageBonus) {
      formula += ` + ${systemData.damageBonus}`;
    }

    const roll = new Roll(formula);
    await roll.evaluate();

    // Create chat message
    const messageData = {
      flavor: `${this.name} Damage`,
      rolls: [roll],
      type: CONST.CHAT_MESSAGE_TYPES.ROLL
    };

    ChatMessage.create(messageData);
    return roll;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Basic template rendering data
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If the item has a roll formula, roll it
    if (item.system.formula) {
      const rollFormula = item.system.formula;
      const roll = new Roll(rollFormula, this.actor.getRollData());
      await roll.evaluate();

      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }

    // Otherwise, just send a chat message with the item description
    ChatMessage.create({
      speaker: speaker,
      rollMode: rollMode,
      flavor: label,
      content: item.system.description ?? ''
    });
  }
}
