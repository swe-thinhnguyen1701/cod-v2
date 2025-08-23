const {Hero} = require('../models');

const resolvers = {
    Query: {
        getAllHeroes: async () => {
            const heroes = await Hero.find().populate("roles").sort({name: 1});
            if (!heroes || heroes.length === 0) {
                throw new Error('No heroes found');
            }
            return heroes;
        },
        getHeroDetailByName: async (_parent, {heroName}) => {
            const hero = await Hero.findOne({name: heroName}).populate(["roles", "skills", "faction"]);
            if (!hero) {
                throw new Error('Hero not found');
            }
            return hero;
        }
    }
}

module.exports = resolvers;