import { Divider, Flex, VStack } from "@chakra-ui/react";
import useHeroStore from "../state-management/heroStore"
import SkillList from "./SkillList";
import SkillInfo from "./SkillInfo";
import { useEffect } from "react";
import useSkillStore from "../state-management/skillStore";
import SectionHeading from "./SectionHeading";

const HeroSkill = () => {
    const { hero } = useHeroStore();
    const {setSelectedSkill} = useSkillStore();

    useEffect(() => {
        if (hero?.skills[0]) {
            setSelectedSkill(hero.skills[0]);
        }
    }, [hero, setSelectedSkill]);

    if (!hero)
        return null;

    return (
        <VStack alignItems="start" padding="10px 20px">
            <SectionHeading title="Skills" />
            <Flex flexDir={{ base: "column", lg: "row" }} gap={4}>
                <SkillList skills={hero.skills} owner={hero.name} type={"hero"} />
                <Divider />
                <SkillInfo />
            </Flex>
        </VStack>
    )
}

export default HeroSkill;