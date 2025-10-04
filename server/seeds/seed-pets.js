import db from "../config/db-connection.js";
import { Pet, Role, PetSkill } from "../models/index.js";
import readJSON from "../utils/readJSON.js";

const pets = readJSON("pets.json");

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

                const recommended_skills = [];
                for(let skillList of pet.recommended_skills) {
                    const skillIdList = [];
                    for(let skillName of skillList) {
                        const skill = await PetSkill.findOne({ name: skillName });
                        if (!skill)
                            throw new Error(`Cannot not found ${skillName}`);
                        skillIdList.push(skill._id);
                    }
                    recommended_skills.push(skillIdList);
                }
                pet.recommended_skills = recommended_skills;
                pet.image = PET_IMG_URL + pet.image;
                
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