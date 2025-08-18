const { Faction } = require('../models');
const db = require('../config/db-connection');
const factions = require('../database/factions.json');

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