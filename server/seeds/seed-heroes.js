const { Hero, Skill, Faction, Role } = require("../models");
const db = require("../config/db-connection");
const heroes = require("../database/heroes.json");

const FACTION = ["Springwardens", "League of Order", "Wilderburg"];
const HERO_IMG_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-full/"

const seedHeroes = async () => {
    db.once("open", async () => {
        try {
            await Hero.deleteMany({});
            for (let hero of heroes) {
                const heroSkills = await Skill.find({ owner: hero.name });
                if (heroSkills.length === 0) {
                    throw new Error(`No skills found for hero: ${hero.name}`);
                }
                hero.skills = heroSkills.map(skill => skill._id);
                
                const faction = await Faction.findOne({ name: FACTION[hero.faction - 1] });
                if (!faction) {
                    throw new Error(`Faction not found for hero: ${hero.name}`);
                }
                hero.faction = faction._id;

                const roles = [];
                for(let i = 0; i < 3; i++) {
                    const role = await Role.findOne({name: hero.roles[i]});
                    if(!role) {
                        console.log(hero.roles[i]);
                        throw new Error(`Role not found for hero: ${hero.name}`);
                    }
                    roles.push(role._id);
                }
                hero.roles = roles;
                hero.image = `${HERO_IMG_URL}${hero.image}`
                await Hero.create(hero);
            }
        } catch (error) {
            console.error("Error seeding heroes ❌:", error);
            process.exit(1);
        }
        console.log("HEROES seeded SUCCESSFULLY ☘️");
        process.exit(0);
    });
}

seedHeroes();