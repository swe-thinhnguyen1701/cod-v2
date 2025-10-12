import { GET_ALL_ARTIFACTS, GET_ALL_HEROES, GET_ALL_PETS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import type { ArtifactBriefEntity } from "../../entities/ArtifactEntity";
import type { HeroBriefEntity } from "../../entities/HeroEntity";
import type { PetBriefEntity } from "../../entities/PetEntity";
import { Heading, ListItem, UnorderedList, VStack } from "@chakra-ui/react";
import useCategoryStore from "../../state-management/categoryStore";
import ItemCard from "../ItemCard";
import Spinner from "../Spinner";

const getQuery = (category: string) => {
    if (category === "hero") return GET_ALL_HEROES;
    if (category === "pet") return GET_ALL_PETS;
    return GET_ALL_ARTIFACTS;
}

const DataList = () => {
    const { selectedCategory } = useCategoryStore();

    const { data, error, loading } = useQuery(getQuery(selectedCategory));

    let list: ArtifactBriefEntity[] | HeroBriefEntity[] | PetBriefEntity[] = [];

    if (loading)
        return (
            <VStack minHeight="90vh" justifyContent="center">
                <Spinner />
            </VStack>
        )

    if (error)
        return <Heading>Something went wrong {error.message}</Heading>

    if (selectedCategory === "artifact")
        list = data.getAllArtifacts as ArtifactBriefEntity[];
    else if (selectedCategory === "hero")
        list = data.getAllHeroes as HeroBriefEntity[];
    else if (selectedCategory === "pet")
        list = data.getAllPets as PetBriefEntity[];

    return (
        <VStack>
            <VStack mb={8}>
                <Heading as="h1" size="h1" textTransform="capitalize">{selectedCategory} list</Heading>
            </VStack>
            <UnorderedList
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={8}
                listStyleType="none"
                padding={0}
                margin={0}
            >
                {list.map(data => (
                    <ListItem key={data.id} cursor="pointer">
                        <ItemCard data={data} key={data.id} />
                    </ListItem>
                ))}
            </UnorderedList>
        </VStack>
    )
}

export default DataList;