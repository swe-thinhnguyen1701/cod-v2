const { Pet, Role } = require("../models");
const db = require("../config/db-connection");
const pets = require("../database/pets.json");

const PET_IMG_URL = "https://d3bhl6gkk81cq1.cloudfront.net/pets/";

const seedPets = async () => {
    db.once("open", async () => {
        try {
            await Pet.deleteMany({});
            for (let pet of pets) {
                pet.roles = await Promise.all(
                    pet.roles.map(async (roleName) => {
                        const role = await Role.findOne({ name: roleName });
                        if (!role)
                            throw new Error(`Role not found for pet: ${pet.name}`);

                        return role._id;
                    })
                );
                    
                pet.image = `${PET_IMG_URL}${pet.image}`
                await Pet.create(pet);
            }
        } catch (error) {
            console.error("Error seeding pets ❌:", error);
            process.exit(1);
        }
        console.log("PETS seeded SUCCESSFULLY ☘️");
        process.exit(0);
    });
}

seedPets();