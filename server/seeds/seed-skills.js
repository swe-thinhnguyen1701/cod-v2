const db = require("../config/db-connection");
const { Skill, HeroSkill, ArtifactSkill, PetSkill } = require("../models");
const heroSkills = require("../database/skill-hero.json");
const artifactSkills = require("../database/skill-artifact.json");
const petSkills = require("../database/skill-pet.json");

const seedSkills = async () => {
    db.once("open", async () => {
        try {
            console.log("Seeding SKILLS...");
            await Skill.deleteMany({});
            await HeroSkill.insertMany(heroSkills);
            console.log("HERO SKILLS inserted SUCCESSFULLY ☘️");
            await ArtifactSkill.insertMany(artifactSkills);
            console.log("ARTIFACT SKILLS inserted SUCCESSFULLY ☘️");
            await PetSkill.insertMany(petSkills);
            console.log("PET SKILLS inserted SUCCESSFULLY ☘️");
        } catch (error) {
            console.error("Error seeding skills ❌:", error);
            process.exit(1);
        }
        console.log("SKILLS seeded SUCCESSFULLY ☘️");
        process.exit(0);
    });
}

seedSkills();