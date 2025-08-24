import { Box, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import useSkillStore from "../state-management/skillStore";
import TextEffect from "./TextEffect";

const SkillInfo = () => {
    const { selectedSkill } = useSkillStore();

    if (!selectedSkill)
        return;

    return (
        <VStack alignItems="start">
            <Heading as="h3">
                {selectedSkill.name}
            </Heading>
            {selectedSkill.rage_cost &&
                <Text fontWeight="bold">
                    Rage cost: <Text as="span" color="red.600">{`${selectedSkill.rage_cost}`}</Text>
                </Text>
            }
            <TextEffect text={selectedSkill.description} />
            <Box>
                <UnorderedList listStyleType="none" margin={0}>
                    <ListItem>
                        <Text fontWeight="bold">Skill Upgrade Preview</Text>
                    </ListItem>
                    {selectedSkill.previews.map((preview, idx) => 
                    <ListItem key={idx}>
                        <TextEffect text={preview} />
                    </ListItem>)}
                </UnorderedList>
            </Box>
        </VStack>
    )
}

export default SkillInfo;