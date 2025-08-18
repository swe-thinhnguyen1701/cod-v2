const db = require("../config/db-connection");
const { Skill } = require("../models");
const skills = require("../database/skills.json");

const seedSkills = async () => {
    db.once("open", async () => {
        try {
            console.log("Seeding SKILLS...");
            await Skill.deleteMany({});
            await Skill.insertMany(skills);
        } catch (error) {
            console.error("Error seeding skills ❌:", error);
            process.exit(1);
        }
        console.log("SKILLS seeded SUCCESSFULLY ☘️");
        process.exit(0);
    });
}

seedSkills();