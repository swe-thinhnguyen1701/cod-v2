const typeDefs = `
    type Hero {
        _id: ID!
        description: String!
        fullImage: String!
        isFlying: Boolean
        mainTalent: String
        name: String
        rank: String
        race: String
        talents: [String]
        title: String
    }

    type Skill {
        name: String
        description: String
        effects: [SkillEffect]
        isRage: Boolean
        image: String
    }

    type SkillEffect {
        name: String
        value: String
    }

    type Race {
        name: String
        description: String
        logo: String
        icon: String
        effects: [RaceEffect]
        heroes: [Hero]
    }

    type RaceEffect {
        name: String
        value: String
    }

    type Talent {
        name: String
        description: String
        icon: String
    }

    type Query {
        getAllHeroes: [Hero]
        getHeroByName(heroName: String!): Hero
        getTalent (talentName: String!): Talent
        getHeroSkills(heroId: ID!): [Skill]
        getSkillByName(skillName: String): Skill
        getRace(raceId: String): Race
    }
`;

module.exports = typeDefs;