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
        }
    }
`

export const GET_HERO_DETAIL_BY_NAME = gql`
    query getHeroDetailByName($heroName: String!) {
        getHeroDetailByName(heroName: $heroName) {
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
                preview
                rage_cost
            }
            title
        }
    }
`