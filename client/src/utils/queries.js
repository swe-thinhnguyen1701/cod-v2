import { gql } from "@apollo/client";

export const GET_ALL_HEROES = gql`
    query getAllHeroes {
        getAllHeroes {
            _id
            description
            fullImage
            isFlying
            mainTalent
            name
            rank
            race
            talents
            title
        }
    }
`;

export const GET_HERO_BY_NAME = gql`
    query getHeroByName($heroName: String!) {
        getHeroByName(heroName: $heroName) {
            _id
            description
            fullImage
            isFlying
            mainTalent
            name
            rank
            race
            talents
            title
        }
    }
`;

export const GET_TALENT = gql`
    query getTalent($talentName: String!) {
        getTalent(talentName: $talentName) {
            name
            description
            icon
        }
    }
`;

export const GET_HERO_SKILLS = gql`
    query getHeroSkills($heroId: ID!) {
        getHeroSkills(heroId: $heroId) {
            name
            description
            effects {
                name
                value
            }
            isRage
            image
        }
    }
`;

export const GET_RACE = gql`
    query getRace($raceId: String!) {
        getRace(raceId: $raceId) {
            name
            description
            logo
            icon
            effects {
                name
                value
            }
        }
    }
`