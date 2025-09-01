import { Box, ScaleFade, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import useSkillStore from "../state-management/skillStore";
import TextEffect from "./TextEffect";

const SkillInfo = () => {
    const { selectedSkill } = useSkillStore();

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
                width={{ base: "100vw" }}
                maxWidth={{ base: "450px", md: "500px", lg: "550px" }}
                height={{ base: "400px", lg: "530px" }}
                overflowY={"auto"}
                spacing={2}
                p={2}>
                <Heading as="h3" size="h3">
                    {selectedSkill.name}
                </Heading>
                {selectedSkill.rage_cost
                    ? <Text fontWeight="bold">
                        Rage cost: <Text as="span" color="red.600">{`${selectedSkill.rage_cost}`}</Text>
                    </Text>
                    : <Text fontWeight="bold">Passive</Text>
                }
                <Box mt={2} mb={4}>
                    <Text fontWeight="bold">Description</Text>
                    <TextEffect text={selectedSkill.description[0]} />
                </Box>
                <Box >
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
            </VStack>
        </ScaleFade>
    )
}

export default SkillInfo;