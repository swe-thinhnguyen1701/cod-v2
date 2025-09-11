import { gql } from "@apollo/client";

export const GET_ALL_HEROES = gql`
  query getAllHeroes {
    getAllHeroes {
      id
      name
      roles {
        name
        description
        rank
      }
      rarity
      image
    }
  }
`;

export const GET_HERO_DETAIL_BY_NAME = gql`
  query getHeroDetailByName($heroName: String!) {
    getHeroDetailByName(heroName: $heroName) {
      artifacts
      description
      faction {
        name
        description
        buff
      }
      id
      name
      rarity
      roles {
        name
        description
        rank
      }
      skills {
        description
        image
        name
        previews
        rage_cost
      }
      title
      pets
      partners
      is_flying
      image
    }
  }
`;

export const GET_ALL_ARTIFACTS = gql`
  query getAllArtifacts {
    getAllArtifacts {
      id
      name
      rarity
      roles {
        name
        description
        rank
      }
      is_exemplar
      image
    }
  }
`;

export const GET_ARTIFACT_DETAIL_BY_NAME = gql`
  query getArtifactDetailByName($artifactName: String!) {
    getArtifactDetailByName(artifactName: $artifactName) {
      name
      rarity
      roles {
        name
        description
        rank
      }
      is_exemplar
      skills {
        description
        name
        previews
        rage_cost
        additional_effect
        exemplar_effect
        cooldown
      }
      stats {
        name
        values
        image
      }
      image
    }
  }
`;

export const GET_ALL_PETS = gql`
  query getAllPets {
    getAllPets {
      id
      name
      roles {
        name
        description
        rank
      }
      image
    }
  }
`;

export const GET_PET_DETAIL_BY_NAME = gql`
  query getPetDetailByName($petName: String!) {
    getPetDetailByName(petName: $petName) {
      name
      attributes
      roles {
        name
        description
        rank
      }
      skills
      recommended_heroes
      recommended_skills
      image
    }
  }
`;
