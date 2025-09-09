import { useState } from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import useArtifactStore from "../state-management/artifactStore";

const ARTIFACT_RANK = [
    {
        rank: "Legendary",
        color: "#c3ab76"
    },
    {
        rank: "Exemplar",
        color: "#6f0000"
    }
];

const ArtifactRankSelection = () => {
    const [selectedOption, setSelectedOption] = useState(0)
    const {setArtifactRank} = useArtifactStore();

    const handleOnClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        const selectedRank = target.closest("li")?.getAttribute("data-index");
        if (selectedRank === null || selectedRank === undefined)
            return;
        const idx = parseInt(selectedRank, 10);
        setSelectedOption(idx);
        setArtifactRank(ARTIFACT_RANK[idx].rank)
    }

    return (
        <UnorderedList
            display="flex"
            fontWeight="bold"
            listStyleType="none"
            margin={0}
            onClick={(e) => handleOnClick(e)}
            cursor="pointer"
        >
            {ARTIFACT_RANK.map((type, idx) => (
                <ListItem
                    key={idx}
                    id={type.rank}
                    backgroundColor={selectedOption === idx ? type.color : "unset"}
                    padding={1}
                    textAlign="center"
                    width="100%"
                    data-index={idx}
                    color={selectedOption === idx ? "white" : "inherit"}
                    _hover={{textDecor:"underline"}}
                    transition={"background-color 0.3s ease-in-out"}
                >
                    {type.rank}
                </ListItem>

            ))}
        </UnorderedList>
    )
}

export default ArtifactRankSelection;