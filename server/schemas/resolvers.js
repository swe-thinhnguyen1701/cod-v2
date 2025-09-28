// const { Hero, Artifact, Pet } = require('../models');
import {Hero, Artifact, Pet} from '../models/index.js';

const resolvers = {
    Query: {
        getAllHeroes: async () => {
            const heroes = await Hero.find().populate("roles").sort({ name: 1 });
            if (!heroes || heroes.length === 0) {
                throw new Error('No heroes found');
            }
            return heroes;
        },
        getHeroDetailByName: async (_parent, { heroName }) => {
            const hero = await Hero.findOne({ name: heroName }).populate(["roles", "skills", "faction"]);
            if (!hero) {
                throw new Error('Hero not found');
            }
            return hero;
        },
        getAllArtifacts: async () => {
            const artifacts = await Artifact.find().populate("roles").sort({ name: 1 });
            if (!artifacts || artifacts.length === 0) {
                throw new Error('No artifacts found');
            }
            return artifacts;
        },
        getArtifactDetailByName: async (_parent, { artifactName }) => {
            const artifact = await Artifact.findOne({ name: artifactName }).populate(["roles", "skills"]);
            if (!artifact) {
                throw new Error('Artifact not found');
            }
            return artifact;
        },
        getAllPets: async () => {
            const pets = await Pet.find().populate("roles").sort({ name: 1 });
            if (!pets || pets.length === 0) {
                throw new Error('No pets found');
            }
            return pets;
        },
        getPetDetailByName: async (_parent, { petName }) => {
            const pet = await Pet
                .findOne({ name: petName })
                .populate("roles")
                .populate({
                    path: "recommended_skills",
                    model: "Skill"
                });
            if (!pet) {
                throw new Error('Pet not found');
            }
            return pet;
        }
    }
}

export default resolvers;