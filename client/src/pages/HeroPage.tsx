import { useQuery } from "@apollo/client";
import { GET_ALL_HEROES } from "../graphql/queries";
import { Heading, UnorderedList, ListItem, VStack, Text } from "@chakra-ui/react";
import type HeroBriefEntity from "../entities/HeroEntity";
import ItemCard from "../components/ItemCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const HeroPage = () => {
    const { data, error, loading } = useQuery(GET_ALL_HEROES);

    if (loading)
        return <Spinner />

    if (error) {
        console.log(error);
        return <Heading>Something went wrong {error.message}</Heading>
    }

    const heroes: HeroBriefEntity[] = data.getAllHeroes;

    return (
        <VStack>
            <VStack mb={8}>
                <Heading as="h1" size="h1">Heroes</Heading>
                <Text textAlign="center">With various heroes to choose from, you can pair commanders and build your own legion to dominate the battlefield.</Text>
            </VStack>
            <UnorderedList display="flex" flexWrap="wrap" justifyContent="center" gap={8} listStyleType="none" padding={0} margin={0}>
                {heroes.map(hero => (
                    <ListItem key={hero.id} cursor="pointer">
                        <Link to={`/heroes/${hero.name}`}>
                            <ItemCard data={hero} key={hero.id} />
                        </Link>
                    </ListItem>
                ))}
            </UnorderedList>
        </VStack>
    )
}

export default HeroPage;