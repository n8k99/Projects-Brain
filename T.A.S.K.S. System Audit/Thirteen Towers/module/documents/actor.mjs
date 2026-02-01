/**
 * Extend the base Actor document
 */
export class ThirteenTowersActor extends Actor {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the actor source data with additional dynamic data.
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.thirteenTowers || {};

    // Make separate methods for each Actor type
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    const systemData = actorData.system;

    // Calculate stat modifiers
    for (let [key, stat] of Object.entries(systemData.stats)) {
      stat.mod = this._calculateStatModifier(stat.value);
    }

    // Calculate derived values
    this._calculateHealth(systemData);
    this._calculateResolve(systemData);
    this._calculateDefense(systemData);
  }

  /**
   * Prepare NPC type specific data
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    const systemData = actorData.system;

    // Calculate stat modifiers
    for (let [key, stat] of Object.entries(systemData.stats)) {
      stat.mod = this._calculateStatModifier(stat.value);
    }

    // Calculate derived values based on NPC type
    this._calculateNPCStats(systemData);
  }

  /**
   * Calculate stat modifier from stat value
   * @param {Number} value - The stat value
   * @returns {Number} The modifier
   */
  _calculateStatModifier(value) {
    if (value <= 7) return -2;
    if (value <= 9) return -1;
    if (value <= 11) return 0;
    if (value <= 13) return +1;
    if (value <= 15) return +2;
    if (value <= 17) return +3;
    if (value <= 19) return +4;
    return +5;
  }

  /**
   * Calculate maximum health
   * @param {Object} systemData - The actor's system data
   */
  _calculateHealth(systemData) {
    const bodMod = systemData.stats.body.mod;
    systemData.health.max = Math.max(8, 10 + (bodMod * 2));

    // Ensure current health doesn't exceed max
    if (systemData.health.value > systemData.health.max) {
      systemData.health.value = systemData.health.max;
    }
  }

  /**
   * Calculate maximum resolve
   * @param {Object} systemData - The actor's system data
   */
  _calculateResolve(systemData) {
    const sprMod = systemData.stats.spirit.mod;
    const wilMod = systemData.stats.will.mod;
    systemData.resolve.max = Math.max(3, 3 + Math.max(sprMod, wilMod));

    // Ensure current resolve doesn't exceed max
    if (systemData.resolve.value > systemData.resolve.max) {
      systemData.resolve.value = systemData.resolve.max;
    }
  }

  /**
   * Calculate defense
   * @param {Object} systemData - The actor's system data
   */
  _calculateDefense(systemData) {
    const refMod = systemData.stats.reflex.mod;

    // Get armor bonus from equipped armor
    let armorBonus = 0;
    const armor = this.items.filter(i => i.type === 'armor' && i.system.equipped);
    if (armor.length > 0) {
      armorBonus = Math.max(...armor.map(a => a.system.armorBonus));
    }

    systemData.defense.armor = armorBonus;
    systemData.defense.value = 10 + refMod + armorBonus;
  }

  /**
   * Calculate NPC stats based on type
   * @param {Object} systemData - The NPC's system data
   */
  _calculateNPCStats(systemData) {
    const refMod = systemData.stats.reflex.mod;

    // Set default stats based on NPC type
    switch(systemData.npcType) {
      case 'mook':
        if (!systemData.health.max) systemData.health.max = 10;
        systemData.defense.value = 12;
        break;
      case 'lieutenant':
        if (!systemData.health.max) systemData.health.max = 25;
        systemData.defense.value = 14;
        break;
      case 'boss':
        if (!systemData.health.max) systemData.health.max = 50;
        systemData.defense.value = 17;
        break;
      default:
        systemData.defense.value = 10 + refMod;
    }
  }

  /**
   * Roll a skill check
   * @param {String} statKey - The stat to use for the roll
   * @param {Number} edge - Edge modifier
   * @param {Object} options - Additional roll options
   */
  async rollCheck(statKey, edge = 0, options = {}) {
    const stat = this.system.stats[statKey];
    if (!stat) {
      ui.notifications.warn(`Invalid stat: ${statKey}`);
      return;
    }

    // Calculate total modifier
    let totalMod = stat.mod + edge;

    // Apply harm penalties
    if (this.type === 'character') {
      const harm = this.system.harm;
      if (harm.level1.value) totalMod += harm.level1.penalty;
      if (harm.level2.value) totalMod += harm.level2.penalty;
      if (harm.level3.value) totalMod += harm.level3.penalty;

      // Apply moral friction
      if (this.system.moralFriction.active) {
        // Moral friction increases difficulty, not reduces modifier
        // This should be handled at the difficulty level
      }
    }

    // Create the roll
    const rollFormula = `1d20 + ${totalMod}`;
    const roll = new Roll(rollFormula, this.getRollData());
    await roll.evaluate();

    // Create chat message
    const messageData = {
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: options.flavor || `${statKey.toUpperCase()} Check`,
      rolls: [roll],
      type: CONST.CHAT_MESSAGE_TYPES.ROLL
    };

    ChatMessage.create(messageData);
    return roll;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = { ...super.getRollData() };

    // Add calculated modifiers
    if (this.system.stats) {
      for (let [k, v] of Object.entries(this.system.stats)) {
        data[k] = v.mod;
      }
    }

    return data;
  }
}
