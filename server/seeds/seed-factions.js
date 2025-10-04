import db from "../config/db-connection.js";
import { Faction } from "../models/index.js";
import readJSON from "../utils/readJSON.js";

const factions = readJSON("factions.json");

const seedFactions = async () => {
    db.once('open', async () => {
        try {
            console.log('Seeding FACTIONS...');
            await Faction.deleteMany({});
            await Faction.insertMany(factions);
        } catch (error) {
            console.error('Error seeding factions ❌:', error);
            process.exit(1);
        }
        console.log('FACTIONS seeded SUCCESSFULLY ☘️');
        process.exit(0);
    });
}

seedFactions();