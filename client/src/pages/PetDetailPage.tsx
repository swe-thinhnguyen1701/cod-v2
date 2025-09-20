import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_PET_DETAIL_BY_NAME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Heading, Flex, Card } from "@chakra-ui/react";
import usePetStore from "../state-management/petStore";
import Spinner from "../components/Spinner";
import PetInfo from "../components/PetInfo";
import PetSkill from "../components/PetSkill";
import type { PetEntity } from "../entities/PetEntity";

const PetDetailPage = () => {
    const { petName: petName } = useParams();
    const { setPet, initializePetAttributes } = usePetStore();
    const { loading, error, data } = useQuery(GET_PET_DETAIL_BY_NAME, ({
        variables: { petName: petName }
    }));

    useEffect(() => {
        if (data) {
            const pet: PetEntity = data.getPetDetailByName
            setPet(pet);
            initializePetAttributes(pet.attributes);
        }
    }, [data, setPet, initializePetAttributes])

    if (loading)
        return <Spinner />

    if (error)
        return <Heading>{`${error.message}`}</Heading>

    return (
        <Flex width="100%" flexDir={{ base: "column", lg: "row" }} gap={8}>
            <Card py={4} width={{ base: "100%", lg: "550px" }}>
                <PetInfo />
            </Card>
            <Card width={{ base: "100%", lg: "700px" }}>
                <PetSkill />
            </Card>
        </Flex>
    )
}

export default PetDetailPage;