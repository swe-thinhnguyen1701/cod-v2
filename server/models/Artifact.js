// const { model, Schema } = require("mongoose");
import {model, Schema} from "mongoose";

const statSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    values: {
        type: [Number],
        required: true
    },
    image: {
        type: String
    }
});

const artifactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rarity: {
        type: Number,
        required: true,
    },
    is_exemplar: {
        type: Boolean,
        required: true
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
    stats: [{
        type: statSchema,
        required: true
    }],
    skills: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
    }],
    image: {
        type: String
    }
});

const Artifact = model("Artifact", artifactSchema);
// module.exports = Artifact;
export default Artifact;