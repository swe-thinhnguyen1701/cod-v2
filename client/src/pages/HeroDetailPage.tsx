import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_HERO_DETAIL_BY_NAME } from "../graphql/queries";
import { useEffect } from "react";
import { Heading, VStack } from "@chakra-ui/react";
import useHeroStore from "../state-management/heroStore";
import Spinner from "../components/Spinner";
import HeroInfo from "../components/HeroInfo";
import HeroSkill from "../components/HeroSkill";


const HeroDetailPage = () => {
    const { heroName: heroName } = useParams();
    const { loading, error, data } = useQuery(GET_HERO_DETAIL_BY_NAME, {
        variables: { heroName: heroName }
    });
    const { setHero } = useHeroStore();

    useEffect(() => {
        if (data?.getHeroDetailByName)
            setHero(data.getHeroDetailByName);
    }, [data, setHero]);

    if (loading)
        return <Spinner />

    if (error)
        return <Heading>{`Something went wrong ${error.message}`}</Heading>

    return (
        <VStack>
            <HeroInfo />
            <HeroSkill />
        </VStack>
    )
}

export default HeroDetailPage;