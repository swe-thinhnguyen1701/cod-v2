import { UnorderedList, ListItem, Box, Text, Image } from "@chakra-ui/react"
import type SkillEntity from "../entities/SkillEntity"
import useSkillStore from "../state-management/skillStore";
import { useState } from "react";

interface Props {
    skills: [SkillEntity],
}

const SkillList = ({ skills }: Props) => {
    const [selectedItem, setSelectedItem] = useState(0);
    const { setHeroSkill } = useSkillStore();

    const handleClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        const selectedSkillIdx = target.closest("li")?.id;
        if (selectedSkillIdx === undefined)
            return;
        const idx = Number(selectedSkillIdx);
        if (isNaN(idx) || !skills[idx]) {
            return;
        }
        setHeroSkill(skills[idx]);
        setSelectedItem(idx);
    }

    return (
        <UnorderedList
            display="flex"
            flexDirection={{ base: "row", lg: "column" }}
            gap={{ base: 8, md: 8, lg: 4 }}
            listStyleType="none"
            margin={0}
            maxWidth={{ base: "93vw", md: "none" }}
            overflowX={{ base: "scroll", md: "unset" }}
            overflowY={{ base: "hidden", md: "unset" }}
            onClick={(e) => handleClick(e)}
            cursor="pointer"
            height={{ base: "100px" }}
            pt={4}
            pl={4}
        >
            {skills.map((skill, idx) => (
                <ListItem
                    key={idx}
                    id={`${idx}`}
                    width={{ base: "60px", md: "80px", lg: "120px" }}
                    display="flex"
                    flex="0 0 auto"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="start"
                    opacity={idx === selectedItem ? 1 : 0.5}
                    transform={idx === selectedItem ? "scale(1.2)" : "scale(1)"}
                    className="list-item"
                >
                    <Box width={{ base: "30px", md: "50px" }}>
                        <Image src={skill.image} alt={`${skill.name} skill image`} />
                    </Box>
                    <Text
                        textTransform="uppercase"
                        fontSize={{ base: "0.6rem", md: "0.8rem" }}
                        fontWeight="bold"
                        textAlign="center">
                        {skill.name}
                    </Text>
                </ListItem>
            ))}
        </UnorderedList>
    )
}

export default SkillList;