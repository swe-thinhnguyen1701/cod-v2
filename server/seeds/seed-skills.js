import db from "../config/db-connection.js";
import { Skill, HeroSkill, ArtifactSkill, PetSkill } from "../models/index.js";
import readJSON from "../utils/readJSON.js";

const heroSkills = readJSON("skill-hero.json");
const artifactSkills = readJSON("skill-artifact.json");
const petSkills = readJSON("skill-pet.json");

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