const { Hero, Talent, Skill, Race } = require("../models");
const resolvers = {
    Query: {
        getAllHeroes: async () => {
            return await Hero.find({});
        },
        getHeroByName: async (_parent, { heroName }) => {
            try {
                const hero = await Hero.findOne({ name: heroName });

                if (!hero) {
                    throw new Error("Hero not found");
                }

                return hero;
            } catch (error) {
                console.error("ERROR occurs while fetching hero by name", error);
                throw new Error("Internal error");
            }
        },
        getTalent: async (_parent, { talentName }) => {
            try {
                const talent = await Talent.findOne({ name: talentName });

                if (!talent) {
                    throw new Error("Talent not found");
                }

                return talent;
            } catch (error) {
                console.error("ERROR occurs while fetching talent", error);
                throw new Error("Internal error");
            }
        },
        getHeroSkills: async (_parent, { heroId }) => {
            try {
                const heroSkills = await Skill.find({ heroId });

                return heroSkills;
            } catch (error) {
                console.error("ERROR occurs while fetching hero skills", error);
                throw new Error("Internal error");
            }
        },
        getSkillByName: async (_parent, { skillName }) => {
            try {
                const skill = await Skill.findOne({ name: skillName });

                if (!skill) {
                    throw new Error("Skill not found");
                }

                return skill;
            } catch (error) {
                console.error("ERROR occurs while fetching skill by name", error);
                throw new Error("Internal error");
            }
        },
        getRace: async (_parent, { raceId }) => {
            try {
                const race = await Race.findOne({ _id: raceId });

                if (!race) {
                    throw new Error("Race not found");
                }

                return race;
            } catch (error) {
                console.error("ERROR occurs while fetching race", error);
                throw new Error("Internal error");
            }
        }
    }
}

module.exports = resolvers;