import { Box, Button, Grid, HStack, Text } from "@chakra-ui/react";
import SectionHeading from "./SectionHeading";
import { useState } from "react";

const PetSkill = () => {
    const [selectedNumOfSkillsOpt, setSelectedNumOfSkillsOpt] = useState(0);

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        const numOfSkills = target.closest("li")?.getAttribute("data-index");
        if (numOfSkills === null || numOfSkills === undefined)
            return;
        const idx = parseInt(numOfSkills, 10);
        setSelectedNumOfSkillsOpt(idx);
    }

    return (
        <Box>
            <SectionHeading title={"Skill"} />
            <HStack>
                <Text fontWeight="bold">Number of slots</Text>
                <HStack as="ul" listStyleType="none" onClick={(e) => onClickHandler(e)}>
                    {Array(5).fill(null).map((_, idx) => (
                        <Button
                            as="li"
                            // color={selectedNumOfSkillsOpt === idx ? "white" : "initial"}
                            colorScheme={selectedNumOfSkillsOpt === idx ? "yellow" : "gray"}
                            px={4} py={2} cursor="pointer" key={idx}
                            data-index={idx}
                        >
                            <Text fontWeight="bold">{idx + 4}</Text>
                        </Button>
                    ))}
                </HStack>
            </HStack>
            <Grid as="ul" listStyleType="none" templateColumns="repeat(4, 1fr)">

            </Grid>
        </Box>
    )
}

export default PetSkill;