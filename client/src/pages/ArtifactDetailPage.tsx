import { Card, Flex, Heading } from "@chakra-ui/react";
import useArtifactStore from "../state-management/artifactStore";
import { useParams } from "react-router-dom";
import { GET_ARTIFACT_DETAIL_BY_NAME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import ArtifactInfo from "../components/ArtifactInfo";
import SkillInfo from "../components/SkillInfo";
import useSkillStore from "../state-management/skillStore";
import SectionHeading from "../components/SectionHeading";

const ArtifactDetailPage = () => {
    const { artifactName: artifactName } = useParams();
    const {setArtifactSkill} = useSkillStore();
    const { loading, error, data } = useQuery(GET_ARTIFACT_DETAIL_BY_NAME, {
        variables: { artifactName: artifactName }
    })
    const { setArtifacts } = useArtifactStore();

    useEffect(() => {
        if (data?.getArtifactDetailByName) {
            setArtifacts(data.getArtifactDetailByName);
            setArtifactSkill(data.getArtifactDetailByName.skills[0]);
        }
    }, [data, setArtifacts, setArtifactSkill]);

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <Heading>{`${error.message}`}</Heading>
    }

    // console.log(data.getArtifactDetailByName);

    return (
        <Flex flexDirection={{base: "column", lg: "row"}} width="100%" gap={8}>
            <Card overflow="hidden" width="100%" pb={4}>
                <ArtifactInfo />
            </Card>
            <Card width="100%">
                <SectionHeading title="Skill Description" />
                <SkillInfo />
            </Card>
        </Flex>
    )
}

export default ArtifactDetailPage;