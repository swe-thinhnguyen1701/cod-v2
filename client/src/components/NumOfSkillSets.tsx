import { Box, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import usePetStore from "../state-management/petStore";
import BlurImage from "./BlurImage";
import PetSkillInfo from "./PetSkillInfo";

const NumOfSkillSets = () => {
    const { numOfSkillSets, selectedSkillSet, selectedSkill, setSelectedSkillSet, setSelectedSkill } = usePetStore();

    if (!selectedSkill)
        return;

    return (
        <VStack>
            <HStack
                as="ul"
                listStyleType="none"
                flexWrap="wrap"
                mb={4}
            >
                {numOfSkillSets.map((_, idx) => (
                    <Text
                        as="li"
                        key={idx}
                        color={idx === selectedSkillSet.idx ? "white" : "initial"}
                        bg={idx === selectedSkillSet.idx ? "teal" : "inherit"}
                        px={3}
                        py={1}
                        cursor="pointer"
                        rounded={4}
                        data-index={idx}
                        transitionProperty={"background-color color"}
                        transitionDuration="0.3s"
                        transitionTimingFunction="ease-in-out"
                        _hover={{ bg: "teal", color: "white" }}
                        onClick={() => { setSelectedSkillSet(idx); setSelectedSkill(0) }}
                    >
                        Skill Set {idx + 1}
                    </Text>
                ))}
            </HStack>
            <Box>
                <Grid
                    as="ul"
                    margin={0}
                    listStyleType="none"
                    templateColumns="repeat(4, 1fr)"
                    fontWeight="bold"
                    fontSize="10px"
                    gap={7}
                // onClick={(e) => onSelectedSkill(e)}
                >
                    {selectedSkillSet.skills
                        .map((skill, idx) => (
                            <GridItem
                                as="li"
                                key={idx}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                maxWidth="50px"
                                transform={idx === selectedSkill.idx ? "scale(1.2)" : "unset"}
                                transitionProperty={"transform opacity"}
                                transitionDuration={"0.3s"}
                                transitionTimingFunction={"ease-in-out"}
                                opacity={idx === selectedSkill.idx ? 1 : 0.5}
                                _hover={{ transform: "scale(1.2)" }}
                                onClick={() => setSelectedSkill(idx)}
                            >
                                <Box width={"40px"}>
                                    <BlurImage src={skill.image} alt={skill.name} />
                                </Box>
                                <Text textAlign="center" >{skill.name}</Text>
                            </GridItem>
                        ))}
                </Grid>
                <PetSkillInfo />
            </Box>
        </VStack>
    )
}

export default NumOfSkillSets;