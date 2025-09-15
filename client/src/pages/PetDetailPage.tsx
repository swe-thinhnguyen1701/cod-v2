import { Heading, Flex, Card } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import usePetStore from "../state-management/petStore";
import { GET_PET_DETAIL_BY_NAME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
// import { useEffect } from "react";
import Spinner from "../components/Spinner";
import PetInfo from "../components/PetInfo";
import { useEffect } from "react";
import PetSkill from "../components/PetSkill";

const PetDetailPage = () => {
    const { petName: petName } = useParams();
    const { setPet } = usePetStore();
    const { loading, error, data } = useQuery(GET_PET_DETAIL_BY_NAME, ({
        variables: { petName: petName }
    }));

    useEffect(() => {
        if (data)
            setPet(data.getPetDetailByName);
    }, [data, setPet])

    if (loading)
        return <Spinner />

    if (error)
        return <Heading>{`${error.message}`}</Heading>


    return (
        <Flex width="100%" flexDir={{base: "column"}}>
            <Card py={4} width={{base: "100%", lg: "550px"}}>
                <PetInfo />
            </Card>
            <Card width={{base: "100%", lg: "700px"}}>
                <PetSkill />
            </Card>
        </Flex>
    )
}

export default PetDetailPage;