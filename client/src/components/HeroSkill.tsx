import { Divider, Flex, VStack } from "@chakra-ui/react";
import useHeroStore from "../state-management/heroStore"
import SkillList from "./SkillList";
import SkillInfo from "./SkillInfo";
import { useEffect } from "react";
import useSkillStore from "../state-management/skillStore";
import SectionHeading from "./SectionHeading";

const HeroSkill = () => {
    const { hero } = useHeroStore();
    const {setHeroSkill} = useSkillStore();

    useEffect(() => {
        if (hero?.skills[0]) {
            setHeroSkill(hero.skills[0]);
        }
    }, [hero, setHeroSkill]);

    if (!hero)
        return null;

    // console.log(hero);

    return (
        <VStack alignItems="start">
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