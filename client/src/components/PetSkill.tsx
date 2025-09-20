import { Divider, VStack } from "@chakra-ui/react";
import SectionHeading from "./SectionHeading";
import NumOfPetSkills from "./NumOfPetSkills";
import NumOfSkillSets from "./NumOfSkillSets";

const PetSkill = () => {

    return (
        <VStack justifyContent="start" width="100%">
            <SectionHeading title={"Skill"} />
            <NumOfPetSkills />
            <Divider margin={4} />
            <NumOfSkillSets />
        </VStack>
    )
}

export default PetSkill;