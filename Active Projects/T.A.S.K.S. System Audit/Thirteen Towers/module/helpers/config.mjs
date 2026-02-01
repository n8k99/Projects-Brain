/**
 * Configuration constants for Thirteen Towers
 */

export const THIRTEEN_TOWERS = {};

/**
 * The eight core stats
 */
THIRTEEN_TOWERS.stats = {
  body: "Body",
  reflex: "Reflex",
  charm: "Charm",
  sense: "Sense",
  spirit: "Spirit",
  mind: "Mind",
  luck: "Luck",
  will: "Will"
};

/**
 * The seven archetypes
 */
THIRTEEN_TOWERS.archetypes = {
  shieldbearer: "Shieldbearer",
  silentknife: "Silentknife",
  songbearer: "Songbearer",
  oathbound: "Oathbound",
  patternweaver: "Patternweaver",
  edgerunner: "Edgerunner",
  linekeeper: "Linekeeper"
};

/**
 * The six domains
 */
THIRTEEN_TOWERS.domains = {
  martial: "Martial",
  covert: "Covert",
  magicTech: "Magic/Tech",
  spiritual: "Spiritual",
  economic: "Economic",
  political: "Political"
};

/**
 * Position levels
 */
THIRTEEN_TOWERS.positions = {
  controlled: "Controlled",
  risky: "Risky",
  desperate: "Desperate"
};

/**
 * Effect levels
 */
THIRTEEN_TOWERS.effects = {
  limited: "Limited",
  standard: "Standard",
  great: "Great"
};

/**
 * Difficulty bands
 */
THIRTEEN_TOWERS.difficulties = {
  trivial: 8,
  standard: 12,
  hard: 16,
  extreme: 20
};

/**
 * Tree node tiers
 */
THIRTEEN_TOWERS.tiers = {
  novice: "Novice",
  journeyman: "Journeyman",
  adept: "Adept",
  expert: "Expert",
  master: "Master",
  apex: "Apex"
};

/**
 * Weapon types
 */
THIRTEEN_TOWERS.weaponTypes = {
  light: "Light",
  medium: "Medium",
  heavy: "Heavy"
};

/**
 * Weapon damage by type
 */
THIRTEEN_TOWERS.weaponDamage = {
  light: "1d6",
  medium: "1d8",
  heavy: "1d10"
};

/**
 * Armor types
 */
THIRTEEN_TOWERS.armorTypes = {
  none: "None",
  light: "Light",
  medium: "Medium",
  heavy: "Heavy"
};

/**
 * NPC types
 */
THIRTEEN_TOWERS.npcTypes = {
  mook: "Mook",
  lieutenant: "Lieutenant",
  boss: "Boss",
  custom: "Custom"
};

/**
 * Cultures
 */
THIRTEEN_TOWERS.cultures = [
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

/**
 * Knowledge tiers (for NPCs and information gating)
 */
THIRTEEN_TOWERS.knowledgeTiers = {
  0: "Tier 0 - Commoner (Surface reality only)",
  1: "Tier 1 - Scholar (Ancient history, Monument basics)",
  2: "Tier 2 - Tower Scholaria (Monument theory, Tower observations)",
  3: "Tier 3 - Dragon Agent (Partial truth, functional understanding)",
  4: "Tier 4 - Dragon (Complete truth)"
};
