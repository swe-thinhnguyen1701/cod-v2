// const { Schema, model } = require("mongoose");
import {model, Schema} from "mongoose";

const petSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    attributes: [{
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        }
    }],
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
    recommended_skills: [[
        {
            type: Schema.Types.ObjectId,
            ref: "Skill"
            // type: String,
        }
    ]],
    recommended_heroes: [{
        type: String
    }],
    is_flying: {
        type: Boolean,
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    rarity: {
        type: Number,
        default: 1
    }
});

const Pet = model("Pet", petSchema);

// module.exports = Pet;
export default Pet;