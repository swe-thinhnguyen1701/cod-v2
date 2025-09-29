// const { Hero, Artifact, Pet } = require('../models');
import { Hero, Artifact, Pet, User } from '../models/index.js';
import { signToken, AuthenticationError } from "../utils/auth.js";

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
    },

    Mutation: {
        addUser: async (_parent, { username, email, password }) => {
            try {
                let user = await User.findOne({ email });
                if (user)
                    throw new Error("User already exists");
                
                user = await User.create({ username, email, password });
                const token = signToken(user);
                console.log(`New user created: ${user}`);
                return { token, user };
            }
            catch (error) {
                console.log("Something went wrong during user creation: ", error);
                throw new Error("Failed to create user");
            }
        },
        login: async (_parent, { username, password }) => {
            try {
                const user = await User.findOne({ username });
                if (!user)
                    throw AuthenticationError

                const isPasswordCorrect = await user.isCorrectPassword(password);
                if (!isPasswordCorrect)
                    throw AuthenticationError

                const token = signToken(user);
                return { token, user };
            } catch (error) {
                console.log("Something went wrong during login: ", error);
                throw AuthenticationError
            }
        }
    }
}

export default resolvers;