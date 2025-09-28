const typeDefs = `
    type Role {
        name: String,
        description: String
        rank: Int
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

   type PetAttribute {
        name: String
        value: Int
    }

   type PetSkill {
        name: String
        description: [String]
        scaling_values: [[Float]]
        attribute: String
        is_rage: Boolean
        is_talent: Boolean
        image: String
    }

    type HeroBrief {
        id: ID!
        name: String!
        roles: [Role]
        rarity: Int
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

    type PetBrief {
        id: ID!
        name: String!
        roles: [Role]
        image: String
        rarity: Int
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

    type ArtifactDetais {
        name: String!
        rarity: Int!
        is_exemplar: Boolean
        roles: [Role]!
        skills: [ArtifactSkill]!
        stats: [ArtifactStat]!
        image: String
    }

    type PetDetails {
        name: String
        attributes: [PetAttribute]
        roles: [Role]
        recommended_skills: [[PetSkill]]
        recommended_heroes: [String]
        is_flying: Boolean
        image: String
    }

    type Query {
        getAllHeroes: [HeroBrief]
        getAllArtifacts: [ArtifactBrief]
        getAllPets: [PetBrief]
        getHeroDetailByName(heroName: String!): HeroDetails
        getArtifactDetailByName(artifactName: String!): ArtifactDetais
        getPetDetailByName(petName: String!): PetDetails
    }
`

export default typeDefs