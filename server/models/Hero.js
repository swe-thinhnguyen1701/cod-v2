const { Schema, model } = require("mongoose");

/**
 * Rarirty:
 * 1 - Legendary
 * 2 - Epic
 * 3 - Rare
 * 
 * Faction:
 * 1 - Springwardens
 * 2 - League of Order
 * 3 - Wilderburg
 * 
 * Role:
 * 0 - Infantry
 * 1 - Cavalry
 * 2 - Archer
 * 3 - Mage
 * 4 - Overall
 * 10 - PvP
 * 11 - Peacekeepeing
 * 12 - Rally
 * 13 - Garrison
 * 14 - Gather
 * 15 - Engineering
 * 20 - Precision
 * 21 - Skills
 * 22 - Tank
 * 23 - Mobility
 * 24 - Control
 * 25 - Support
 */

const heroSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
    }],
    rarity: {
        type: Number,
        required: true
    },
    faction: {
        type: Schema.Types.ObjectId,
        ref: "Faction",
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
    artifacts: [
        {
            type: String
        }
    ],
    pets: [
        {
            type: String
        }
    ],
});

const Hero = model("Hero", heroSchema);

module.exports = Hero;