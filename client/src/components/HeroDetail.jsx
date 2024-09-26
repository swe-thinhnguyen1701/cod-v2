/* eslint-disable react/prop-types */
import HeroIntro from "./HeroIntro";
import HeroSkill from "./HeroSkill";
import { GET_RACE, GET_HERO_SKILLS } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Hero({ hero }) {
    const { loading: raceLoading, data: raceData, error: raceError } = useQuery(GET_RACE, {
        variables: { raceId: hero.race }
    });
    const { loading: heroSkillsLoading, data: heroSkillsData, error: heroSkillsError } = useQuery(GET_HERO_SKILLS, {
        variables: { heroId: hero._id }
    });
    if (raceLoading || heroSkillsLoading) return <p>Loading...</p>;
    if (raceError || heroSkillsError) return <p>500 Internal Error</p>;

    // console.log("hero :>>", hero);
    
    // console.log("heroSkillsData :>>", heroSkillsData.getHeroSkills);
    return (
        <>
            <HeroIntro hero={hero} race={raceData.getRace} />
            <HeroSkill heroSkills={heroSkillsData.getHeroSkills} race={raceData.getRace} />
        </>
    )
}

export default Hero;