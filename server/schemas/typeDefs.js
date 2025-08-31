const typeDefs = `
    type Role {
        name: String,
        description: String
    }

    type Faction {
        name: String!
        description: String!
        buff: [String]!
    }

    type HeroSkill {
        description: [String]
        image: String
        name: String
        previews: [String]
        rage_cost: Int
    }

    type ArtifactSkill {
        description: [String]
        image: String
        name: String
        previews: [String]
        rage_cost: Int
        cooldown: String
    }

    type HeroDetails {
        artifacts: [String]
        description: String!
        faction: Faction
        id: ID!
        name: String!
        rarity: Int!
        roles: [Role]
        skills: [HeroSkill]
        title: String!
    }

    type HeroBrief {
        id: ID!
        name: String!
        roles: [Role]
        rarity: Int
    }

    type Query {
        getHeroDetailByName(heroName: String!): HeroDetails
        getAllHeroes: [HeroBrief]
    }
`

module.exports = typeDefs;