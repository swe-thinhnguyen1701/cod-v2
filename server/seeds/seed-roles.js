import db from "../config/db-connection.js";
import { Role } from "../models/index.js";
import readJSON from "../utils/readJSON.js";

const roles = readJSON("../database/roles.json");

const seedRoles = async () => {
    db.once("open", async () => {
        try {
            await Role.deleteMany({});
            const createdRoles = await Role.insertMany(roles);
            console.log(`${createdRoles.length} roles seeded successfully!`);
        } catch (error) {
            console.error("Error seeding heroes ❌:", error);
            process.exit(1);
        } finally {
            db.close();
        }
        console.log("ROLES seeded SUCCESSFULLY ☘️");
        process.exit(0);
    });
}

seedRoles();
module.exports = seedRoles;