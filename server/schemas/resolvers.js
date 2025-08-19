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
        getHero: async (_parent, {heroId}) => {
            const hero = await Hero.findById(heroId).populate(["skills", "faction", "roles"]);
            if (!hero) {
                throw new Error('Hero not found');
            }
            return hero;
        }
    }
}

module.exports = resolvers;