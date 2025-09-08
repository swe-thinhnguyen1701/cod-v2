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
        name: String
        description: [String]
        previews: [String]
        rage_cost: Int
        additional_effect: String
        exemplar_effect: String
        cooldown: String
    }

    type ArtifactStat{
        name: String
        values: [Float]
        image: String
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
        pets: [String]
        partners: [String]
        is_flying: Boolean
        image: String
    }

    type HeroBrief {
        id: ID!
        name: String!
        roles: [Role]
        rarity: Int
        image: String
    }

    type ArtifactDetais {
        name: String!
        rarity: Int!
        is_exemplar: Boolean
        roles: [Role]!
        skills: [ArtifactSkill]!
        stats: [ArtifactStat]!
        image: String
    }

    type ArtifactBrief {
        id: ID!
        name: String!
        rarity: Int!
        roles: [Role]!
        is_exemplar: Boolean!
        image: String
    }

    type Query {
        getHeroDetailByName(heroName: String!): HeroDetails
        getAllHeroes: [HeroBrief]
        getArtifactDetailByName(artifactName: String!): ArtifactDetais
        getAllArtifacts: [ArtifactBrief]
    }
`

module.exports = typeDefs;