import { Flex, Heading} from "@chakra-ui/react";
import useHeroStore from "../state-management/heroStore"
import SkillList from "./SkillList";
import SkillInfo from "./SkillInfo";

const HeroSkill = () => {
    const {hero} = useHeroStore();

    if(!hero)
        return null;

    return (
        <Flex flexDir={{base: "column", lg: "row"}} overflow="hidden" gap={4} padding={4}>
            <Heading as="h2" size="h2" textTransform="uppercase" mb={4}>Skills</Heading>
            <SkillList skills={hero.skills} owner={hero.name} type={"hero"}/>
            <SkillInfo />
        </Flex>
    )
}

export default HeroSkill;