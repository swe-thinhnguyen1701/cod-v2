const { Hero, Talent, Skill, Race } = require("../models");
const db = require("./db-connection");

const heroData = require("./heroes.json");
const talentData = require("./talents.json");
const skillData = require("./skills.json");
const raceData = require("./races.json")
// link: dvziaj2aejtz9.cloudfront.net

db.once("open", async () => {
    try {
        await Talent.deleteMany({});

        talentData.forEach(talent => {
            const iconImg = `https://d2ra78dyvfpw2s.cloudfront.net/talents-v2/${talent.name}.webp`;
            talent.icon = iconImg;
        })
        await seedRaceData();
        await seedHeroData();
        await seedSkillData();

        await Talent.insertMany(talentData);
        console.log("SEED success");
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});

const seedSkillData = async () => {
    try {
        await Skill.deleteMany({});

        for (const skill of skillData) {
            const heroName = skill.image.split("-")[0];
            const hero = await Hero.findOne({ name: heroName });
            if (hero) {
                skill.heroId = hero._id;
                const imageUrl = `https://d2ra78dyvfpw2s.cloudfront.net/skills/${skill.image}`;
                skill.image = imageUrl;
            }
        }

        await Skill.insertMany(skillData);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const seedRaceData = async () => {
    try {
        await Race.deleteMany({});

        for (const race of raceData) {
            const logoUrl = `https://d2ra78dyvfpw2s.cloudfront.net/races/${race.logo}`;
            const iconUrl = `https://d2ra78dyvfpw2s.cloudfront.net/races/${race.icon}`
            race.logo = logoUrl;
            race.icon = iconUrl;
        }

        await Race.insertMany(raceData);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const seedHeroData = async () => {
    try {
        await Hero.deleteMany({});

        for (const hero of heroData) {
            hero.fullImage = `https://d2ra78dyvfpw2s.cloudfront.net/heroes/${hero.name}-full.webp`;
            const race = await Race.findOne({ name: hero.race.name });
            hero.race = race._id;
            race.heroes.push(hero._id);
            await race.save();
        }

        await Hero.insertMany(heroData);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};