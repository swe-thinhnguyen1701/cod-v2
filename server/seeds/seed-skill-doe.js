const db = require("../config/db-connection");
const { Skill, HeroSkill, ArtifactSkill, PetSkill } = require("../models/Skill-DoE");
const heroSkills = require("../database/skill-hero.json");
const artifactSkills = require("../database/skill-artifact.json");
const petSkills = require("../database/skill-pet.json");

/**
 * DoE = Design of Experience
 * This function seeds the database with skills for heroes, artifacts, and pets.
 * It first deletes all existing skills, then inserts the new skills from the respective JSON files.
 * If there's an error during the seeding process, it logs the error and exits the process.
 * Finally, it logs a success message and exits the process with a status code of 0 (success).
 */

const seedSkills = async () => {
    db.once("open", async () => {
        try {
            console.log("Seeding SKILLS...");
            await Skill.deleteMany({});
            await HeroSkill.insertMany(heroSkills);
            console.log("SKILLS inserted SUCCESSFULLY ☘️");
            await ArtifactSkill.insertMany(artifactSkills);
            console.log("SKILLS inserted SUCCESSFULLY ☘️");
            await PetSkill.insertMany(petSkills);
            console.log("SKILLS inserted SUCCESSFULLY ☘️");
        } catch (error) {
            console.error("Error seeding skills ❌:", error);
            process.exit(1);
        }
        console.log("SKILLS seeded SUCCESSFULLY ☘️");
        process.exit(0);
    });
}

seedSkills();