import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_HERO_DETAIL_BY_NAME } from "../graphql/queries";
import { useEffect } from "react";
import { Card, Flex, Heading, useColorMode, VStack } from "@chakra-ui/react";
import useHeroStore from "../state-management/heroStore";
import Spinner from "../components/Spinner";
import HeroInfo from "../components/HeroInfo";
import HeroSkill from "../components/HeroSkill";
import RecommendationList from "../components/RecommendationList";

const RECOMMENDATION_LIST = ["artifact", "pet", "partner"] as const;

const HeroDetailPage = () => {
    const { colorMode } = useColorMode();
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
        <VStack gap="100px">
            <HeroInfo />
            <Flex flexDirection={{ base: "column", xl: "row" }} gap="50px">
                <Card
                    rounded="md"
                    padding={{ base: "10px 0", md: "10px 20px" }}
                    backgroundColor={colorMode === "light" ? "blackAlpha.50" : "gray.700"}>
                    <HeroSkill />
                </Card>
                <Flex 
                flexDirection={{base: "column", md:"row",  xl: "column"}} 
                gap="50px"
                flexWrap="wrap"
                >
                    {RECOMMENDATION_LIST.map((type, idx) => (
                        <Card
                        rounded="md"
                        padding={{ base: "10px 0", md: "10px 20px" }}
                        backgroundColor={colorMode === "light" ? "blackAlpha.50" : "gray.700"}
                        width={{ base: "100vw", md: "360px" }}
                        key={idx}
                    >
                        <RecommendationList type={type} />
                    </Card>
                    ))}
                </Flex>

            </Flex>
        </VStack>
    )
}

export default HeroDetailPage;