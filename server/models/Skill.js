// const { Schema, model } = require("mongoose");
import {model, Schema} from "mongoose";

const options = { discriminatorKey: "skillType", collection: "skills" };

const baseSkillSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        description: [{ type: String, required: true }],
        owner: { type: String },
    },
    options
);

const Skill = model("Skill", baseSkillSchema);

// Hero-specific
const heroSkillSchema = new Schema({
    rage_cost: { type: Number },
    previews: [{ type: String }],
    image: { type: String },
});

// Artifact-specific
const artifactSkillSchema = new Schema({
    rage_cost: { type: Number },
    cooldown: { type: String },
    additional_effect: { type: String },
    exemplar_effect: { type: String },
    previews: [{ type: String }]
});

// Pet-specific
const petSkillSchema = new Schema({
    scaling_values: [[{ type: Number }]], // e.g. [[10, 15, 20]]
    attribute: { type: String }, // e.g. "strength", "agility", "intelligence"
    image: { type: String },
    is_rage: { type: Boolean },
    is_talent: { type: Boolean }
});

const ArtifactSkill = Skill.discriminator("ArtifactSkill", artifactSkillSchema);
const HeroSkill = Skill.discriminator("HeroSkill", heroSkillSchema);
const PetSkill = Skill.discriminator("PetSkill", petSkillSchema);

// module.exports = { Skill, ArtifactSkill, HeroSkill, PetSkill };
export { Skill, ArtifactSkill, HeroSkill, PetSkill };