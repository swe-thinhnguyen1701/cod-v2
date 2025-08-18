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

    type Skill {
        description: String!
        image: String!
        name: String!
        preview: [String]
        rage_cost: Int
    }

    type HeroDetails {
        description: String!
        faction: Faction
        id: ID!
        name: String!
        rarity: Int!
        roles: [Role]
        skills: [Skill]
        title: String!
    }

    type HeroBrief {
        id: ID!
        name: String!
        roles: [Role]
        rarity: Int
    }

    type Query {
        getHero(heroId: ID!): HeroDetails
        getAllHeroes: [HeroBrief]
    }
`

module.exports = typeDefs;