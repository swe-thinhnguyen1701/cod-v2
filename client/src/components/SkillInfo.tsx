import { Box, ScaleFade, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import useSkillStore from "../state-management/skillStore";
import TextEffect from "./TextEffect";
import useArtifactStore from "../state-management/artifactStore";

// pet skill: if talent maybe rage, otherwise passive
// hero skill: if a skill has rage_cost, then it is a rage skill. otherwise passive
// artifact skills: no passive skill, only rage

const SkillInfo = () => {
    const { selectedSkill, isHeroSkill, isArtifactSkill, isPetSkill } = useSkillStore();
    const { selectedArtifactRank } = useArtifactStore();
    if (!selectedSkill)
        return;

    return (
        <ScaleFade
            in={!!selectedSkill}
            key={selectedSkill?.name}
            initialScale={0.9}
            unmountOnExit
        >
            <VStack
                alignItems="start"
                width={{ base: "100%" }}
                // maxWidth={{ base: "450px", md:"unset", lg: "550px" }}
                height={isArtifactSkill ? "auto" : { base: "400px", lg: "530px" }}
                overflowY={"auto"}
                spacing={2}
                p={2}>
                <Heading as="h3" size="h3">
                    {selectedSkill.name}
                </Heading>
                {selectedSkill.rage_cost && isPetSkill &&
                    <Text fontWeight="bold">Rage Skill</Text>}
                {selectedSkill.rage_cost && (isHeroSkill || isArtifactSkill) &&
                    <Text fontWeight="bold">
                        Rage Cost: <Text as="span" color="red.600">{`${selectedSkill.rage_cost}`}</Text>
                    </Text>}
                {!selectedSkill.rage_cost && isArtifactSkill &&
                    <Text fontWeight="bold">Rage Cost: None</Text>}
                {!selectedSkill.rage_cost && (isHeroSkill || isPetSkill) &&
                    <Text fontWeight="bold">Passive</Text>}
                <Box mt={2} mb={4}>
                    <Text fontWeight="bold">Description</Text>
                    {isArtifactSkill && selectedArtifactRank === "Exemplar"
                        ? <TextEffect text={selectedSkill.description[1]} />
                        : <TextEffect text={selectedSkill.description[0]} />
                    }
                </Box>
                {
                    isArtifactSkill && selectedSkill.additional_effect &&
                    <Box>
                        <Text fontWeight="bold">Additional Effect</Text>
                        <TextEffect text={selectedSkill.additional_effect} />
                    </Box>
                }
                <Box my={4}>
                    <UnorderedList listStyleType="none" margin={0}>
                        {selectedSkill.previews.length > 0
                            ? <ListItem>
                                <Text fontWeight="bold">Skill Upgrade Preview</Text>
                            </ListItem>
                            : null}
                        {selectedSkill.previews.map((preview, idx) =>
                            <ListItem key={idx}>
                                <TextEffect text={preview} />
                            </ListItem>)}
                    </UnorderedList>
                </Box>
                {
                    isArtifactSkill && selectedArtifactRank === "Exemplar" &&
                    <Box>
                        <Text fontWeight="bold">Exemplar Effect</Text>
                        <TextEffect text={selectedSkill.exemplar_effect ?? ""} />
                    </Box>
                }
            </VStack>
        </ScaleFade>
    )
}

export default SkillInfo;