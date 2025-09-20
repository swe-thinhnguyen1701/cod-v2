import { Button, HStack, Text } from "@chakra-ui/react";
import usePetStore from "../state-management/petStore";

const NumOfPetSkills = () => {
    const { selectedNumOfSkills, setSelectedNumOfSkills, setSelectedSkillSet, setSelectedSkill } = usePetStore();

    const onClickHandler = (idx: number) => {
        setSelectedNumOfSkills(idx + 4);
        setSelectedSkillSet(0);
        setSelectedSkill(0);
    }

    return (
        <HStack>
            <Text fontWeight="bold">Number of skills</Text>
            <HStack as="ul" listStyleType="none">
                {Array(5).fill(null).map((_, idx) => (
                    <Button
                        as="li"
                        // color={selectedNumOfSkillSlots === idx + 4 ? "white" : "initial"}
                        colorScheme={selectedNumOfSkills === idx + 4 ? "yellow" : "gray"}
                        px={4} py={2} cursor="pointer" key={idx}
                        onClick={() => onClickHandler(idx)}
                    >
                        <Text fontWeight="bold">{idx + 4}</Text>
                    </Button>
                ))}
            </HStack>
        </HStack>
    )
}

export default NumOfPetSkills;