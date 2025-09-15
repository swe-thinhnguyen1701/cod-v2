import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useArtifactStore from "../state-management/artifactStore";
import { Link } from "react-router-dom";
import { GET_ALL_ARTIFACTS } from "../graphql/queries";
import { Heading, UnorderedList, ListItem, Text, VStack } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import Spinner from "../components/Spinner";
import type {HeroBriefEntity} from "../entities/HeroEntity";

const ArtifactPage = () => {
    const { data, error, loading } = useQuery(GET_ALL_ARTIFACTS);
    const { resetArtifactRank } = useArtifactStore();

    useEffect(() => {
        resetArtifactRank();
    }, []);

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

    const artifacts: HeroBriefEntity[] = data.getAllArtifacts;

    return (
        <VStack>
            <VStack mb={8}>
                <Heading as="h1" size="h1">Artifacts</Heading>
                <Text textAlign="center">Artifacts are powerful items that boost your heroes and shape your battle strategy. Explore the full list below and click on any artifact to see its skills, upgrades, and how to use it effectively.</Text>
            </VStack>
            <UnorderedList display="flex" flexWrap="wrap" justifyContent="center" gap={8} listStyleType="none" padding={0} margin={0}>
                {artifacts.map(artifact => (
                    <ListItem key={artifact.id} cursor="pointer">
                        <Link to={`/artifacts/${artifact.name}`}>
                            <ItemCard data={artifact} key={artifact.id} />
                        </Link>
                    </ListItem>
                ))}
            </UnorderedList>
        </VStack>
    )
}

export default ArtifactPage;