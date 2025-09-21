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
                <Heading as="h1" size="h1">Artifacts</Heading>
                <Text textAlign="center">Artifacts are powerful items that boost your heroes and shape your battle strategy. Explore the full list below and click on any artifact to see its skills, upgrades, and how to use it effectively.</Text>
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