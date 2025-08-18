const seedSkills = require("./seed-skills");
const seedHeroes = require("./seed-heroes");
const seedFactions = require("./seed-factions");
const db = require("../config/db-connection");

const seedDatabase = async () => {
    try {
        db.once('open', async () => {
            await seedSkills();
            await seedFactions();
            await seedHeroes();
        });
        
    } catch (error) {
        console.error("Error seeding database ❌:", error);
        process.exit(1);
    }
    console.log("Database seeded successfully ☘️");
    process.exit(0);
}

seedDatabase();