import { Flex, Heading } from "@chakra-ui/react";
import useArtifactStore from "../state-management/artifactStore";
import { useParams } from "react-router-dom";
import { GET_ARTIFACT_DETAIL_BY_NAME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import ArtifactInfo from "../components/ArtifactInfo";

const ArtifactDetailPage = () => {
    const {artifactName: artifactName} = useParams();
    const {loading, error, data} = useQuery(GET_ARTIFACT_DETAIL_BY_NAME, {
        variables: {artifactName: artifactName}
    })
    const {setArtifacts} = useArtifactStore();

    useEffect(() => {
        if (data?.getArtifactDetailByName) {
            setArtifacts(data.getArtifactDetailByName);
        }
    }, [data, setArtifacts]);

    if (loading) {
        return <Spinner />
    }

    if(error) {
        return <Heading>{`${error.message}`}</Heading>
    }

    // console.log(data.getArtifactDetailByName);

    return (
        <Flex>
            <ArtifactInfo />
        </Flex>
    )
}

export default ArtifactDetailPage;