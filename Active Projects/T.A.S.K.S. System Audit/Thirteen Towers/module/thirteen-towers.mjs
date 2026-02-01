/**
 * The Thirteen Towers game system for Foundry Virtual Tabletop
 * Author: N8 / Eckenrode Muziekopname
 * Software License: LICENSE.txt
 */

// Import document classes
import { ThirteenTowersActor } from "./documents/actor.mjs";
import { ThirteenTowersItem } from "./documents/item.mjs";

// Import sheet classes
import { ThirteenTowersActorSheet } from "./sheets/actor-sheet.mjs";
import { ThirteenTowersItemSheet } from "./sheets/item-sheet.mjs";

// Import helpers
import * as dice from "./dice/dice.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {
  console.log('Thirteen Towers | Initializing the Thirteen Towers Game System');

  // Add custom constants
  game.thirteenTowers = {
    ThirteenTowersActor,
    ThirteenTowersItem,
    dice
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20 + @stats.reflex.mod",
    decimals: 2
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = ThirteenTowersActor;
  CONFIG.Item.documentClass = ThirteenTowersItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("thirteen-towers", ThirteenTowersActorSheet, {
    makeDefault: true,
    label: "THIRTEEN_TOWERS.SheetLabels.Actor"
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("thirteen-towers", ThirteenTowersItemSheet, {
    makeDefault: true,
    label: "THIRTEEN_TOWERS.SheetLabels.Item"
  });

  // Preload Handlebars templates
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

Hooks.once('ready', async function() {
  // Register Handlebars helpers
  Handlebars.registerHelper('concat', function() {
    let outStr = '';
    for (let arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('times', function(n, block) {
    let accum = '';
    for(let i = 0; i < n; ++i)
      accum += block.fn(i);
    return accum;
  });
});

/* -------------------------------------------- */
/*  Handlebars Templates                        */
/* -------------------------------------------- */

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
async function preloadHandlebarsTemplates() {
  return loadTemplates([
    // Actor partials
    "systems/thirteen-towers/templates/actor/parts/actor-stats.hbs",
    "systems/thirteen-towers/templates/actor/parts/actor-combat.hbs",
    "systems/thirteen-towers/templates/actor/parts/actor-domains.hbs",
    "systems/thirteen-towers/templates/actor/parts/actor-items.hbs",

    // Item partials
    "systems/thirteen-towers/templates/item/parts/item-effects.hbs"
  ]);
}
