import { useQuery } from "@apollo/client";
import { GET_ALL_PETS } from "../graphql/queries";
import { Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import type { PetBriefEntity } from "../entities/PetEntity";

const PetPage = () => {
    const { data, error, loading } = useQuery(GET_ALL_PETS);

    if (loading) {
        return (
            <VStack minHeight="90vh" justifyContent="center">
                <Spinner />
            </VStack>
        )
    }

    if (error) {
        console.log(error);
        return <Heading>Something went wrong {error.message}</Heading>
    }

    const pets: PetBriefEntity[] = data.getAllPets;

    return (
        <VStack>
            <VStack mb={8}>
                <Heading as="h1" size="h1">Pets</Heading>
                <Text textAlign="center">Pets aren’t just companions — they’re a key part of your strategy in Call of Dragons. From boosting your heroes’ strengths to providing powerful combat skills, pets make every legion stronger. Explore our full pet guide below to see their abilities, recommended builds, and how they fit into your overall gameplay. Don’t forget to share your favorite pet strategies with the community!</Text>
            </VStack>
            <UnorderedList display="flex" flexWrap="wrap" justifyContent="center" gap={8} listStyleType="none" padding={0} margin={0}>
                {pets.map(pet => (
                    <ListItem key={pet.id} cursor="pointer">
                        <Link to={`/pets/${pet.name}`}>
                            <ItemCard data={pet} key={pet.id} />
                        </Link>
                    </ListItem>
                ))}
            </UnorderedList>
        </VStack>
    )
}

export default PetPage;