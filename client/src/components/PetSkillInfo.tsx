import { Box, HStack, Image, ScaleFade, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import usePetStore from "../state-management/petStore";
import BlurImage from "./BlurImage";
import star from "../assets/star.png";
import starSkeleton from "../assets/star-skeleton.png";
import TextEffect from "./TextEffect";

const TOTAL_STARS = 3; // by default, always show 3 slots

const getAttributeIdx = (attribute: string): number => {
    const ATTRIBUTE_DICT: Record<string, number> = {
        strength: 0,
        agility: 1,
        intelligence: 2,
        endurance: 3,
        spirit: 4,
        luck: 5
    }
    const key = attribute.toLowerCase();

    return ATTRIBUTE_DICT[key];
}

const PetSkillInfo = () => {
    const { selectedSkill, petAttributes } = usePetStore();
    const [selectedStars, setSelectedStars] = useState(0); // 0 → all skeletons

    if (!selectedSkill || !petAttributes || !selectedSkill.skill.attribute || !selectedSkill.skill.scaling_values)
        return;

    const handleStarClick = (count: number) => {
        // If the same number is clicked again → toggle back to skeletons
        setSelectedStars((prev) => (prev === count ? 0 : count));
    };

    return (
        <ScaleFade
            in={!!selectedSkill}
            key={selectedSkill.skill.name}
            initialScale={0.9}
            unmountOnExit
        >
            <HStack gap={4} alignItems="start" justifyContent="start">
                <VStack position="relative" maxHeight="60px">
                    <Box width="60px">
                        <BlurImage
                            src={selectedSkill.skill.image}
                            alt={selectedSkill.skill.name}
                        />
                    </Box>
                    <HStack position="absolute" bottom={0} spacing={1}>
                        {Array.from({ length: TOTAL_STARS }, (_, i) => {
                            const index = i + 1;
                            const isActive = index <= selectedStars;

                            return (
                                <Image
                                    key={index}
                                    src={isActive ? star : starSkeleton}
                                    alt={isActive ? "star" : "star skeleton"}
                                    boxSize="13px"
                                    cursor="pointer"
                                    onClick={() => handleStarClick(index)}
                                />
                            );
                        })}
                    </HStack>
                </VStack>
                <VStack alignItems="start">
                    <Text fontWeight="bold">{selectedSkill.skill.name}</Text>
                    <Text>{selectedSkill.skill.is_rage ? "Rage Skill" : "Passive"}</Text>
                    <TextEffect
                        text={selectedSkill.skill.description[selectedStars]}
                        scalingValue={petAttributes[getAttributeIdx(selectedSkill.skill.attribute)].value * selectedSkill.skill.scaling_values[0][selectedStars]}
                    />
                </VStack>
            </HStack>
        </ScaleFade>
    );
};

export default PetSkillInfo;
