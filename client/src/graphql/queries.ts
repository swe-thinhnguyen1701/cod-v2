import { gql } from "@apollo/client";

export const GET_ALL_HEROES = gql`
    query getAllHeroes {
        getAllHeroes {
            id
            name
            roles {
                name
                description
            }
            rarity
            image
        }
    }
`

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
`

export const GET_ALL_ARTIFACTS = gql`
    query getAllArtifacts {
        getAllArtifacts {
            id
            name
            rarity
            roles {
                name
                description
            }
            is_exemplar
            image
        }
    }
`

export const GET_ARTIFACT_DETAIL_BY_NAME = gql`
    query getArtifactDetailByName($artifactName: String!) {
        getArtifactDetailByName(artifactName: $artifactName) {
            name
            rarity
            roles
            is_exemplar
            previews
            skills
            image
        }
    }
`