/**
 * Dice rolling utilities for Thirteen Towers
 */

/**
 * Roll a check with the Thirteen Towers system
 * @param {Object} options - Roll options
 * @param {Number} options.statMod - The stat modifier
 * @param {Number} options.edge - Edge modifier
 * @param {Number} options.difficulty - The difficulty to beat
 * @param {String} options.flavor - Description of the roll
 * @param {Actor} options.actor - The actor making the roll
 */
export async function rollCheck({
  statMod = 0,
  edge = 0,
  difficulty = 12,
  flavor = "Skill Check",
  actor = null
} = {}) {

  const totalMod = statMod + edge;
  const formula = `1d20 + ${totalMod}`;

  const roll = new Roll(formula);
  await roll.evaluate();

  // Determine success level
  let successLevel = "failure";
  let cssClass = "failure";

  if (roll.total > difficulty) {
    successLevel = "success";
    cssClass = "success";
  } else if (roll.total === difficulty) {
    successLevel = "partial";
    cssClass = "partial";
  }

  // Create chat message
  const messageData = {
    speaker: actor ? ChatMessage.getSpeaker({ actor }) : null,
    flavor: flavor,
    rolls: [roll],
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    content: await renderTemplate("systems/thirteen-towers/templates/chat/roll-check.hbs", {
      formula: formula,
      total: roll.total,
      difficulty: difficulty,
      successLevel: successLevel,
      cssClass: cssClass,
      statMod: statMod,
      edge: edge
    })
  };

  ChatMessage.create(messageData);
  return roll;
}

/**
 * Roll for Position and Effect
 * @param {Object} options - Roll options
 */
export async function rollPositionEffect({
  position = "risky",
  effect = "standard",
  actor = null
} = {}) {

  const positionData = {
    controlled: {
      label: "Controlled",
      description: "Low risk, minimal consequences"
    },
    risky: {
      label: "Risky",
      description: "Moderate risk, real consequences"
    },
    desperate: {
      label: "Desperate",
      description: "High risk, severe consequences"
    }
  };

  const effectData = {
    limited: {
      label: "Limited",
      description: "Partial progress, small change"
    },
    standard: {
      label: "Standard",
      description: "Normal success, expected result"
    },
    great: {
      label: "Great",
      description: "Major success, significant change"
    }
  };

  const messageData = {
    speaker: actor ? ChatMessage.getSpeaker({ actor }) : null,
    content: await renderTemplate("systems/thirteen-towers/templates/chat/position-effect.hbs", {
      position: positionData[position],
      effect: effectData[effect]
    })
  };

  ChatMessage.create(messageData);
}

/**
 * Calculate difficulty bands
 * @param {String} band - The difficulty band (trivial, standard, hard, extreme)
 * @returns {Number} The difficulty value
 */
export function getDifficulty(band) {
  const difficulties = {
    trivial: 8,
    standard: 12,
    hard: 16,
    extreme: 20
  };

  return difficulties[band] || 12;
}

/**
 * Roll initiative (Battle Order)
 * @param {Actor} actor - The actor rolling initiative
 */
export async function rollBattleOrder(actor) {
  const refMod = actor.system.stats.reflex.mod;
  const formula = `1d20 + ${refMod}`;

  const roll = new Roll(formula);
  await roll.evaluate();

  return roll.total;
}
