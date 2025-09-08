import { Box, Checkbox, Heading, Image, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import useArtifactStore from "../state-management/artifactStore";
import starImage from "../assets/star.webp";
import { useState } from "react";

const ARTIFACT_TYPE = [
    {
        rank: "legendary",
        color: "#c3ab76"
    },
    {
        rank: "exemplar",
        color: "#6f0000"
    }
];

const ArtifactInfo = () => {
    const { artifact } = useArtifactStore();
    const [artifactRank, setArtifactRank] = useState("legendary");
    const [isMaxLevel, setIsMaxLevel] = useState(false);

    if (!artifact)
        return;

    const handleOnClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const target = e.target as HTMLElement;

        const selectedRank = target.closest("li")?.id;
        if (selectedRank === undefined)
            return;
        setArtifactRank(selectedRank);
    }

    return (
        <Box>
            {artifact.is_exemplar &&
                <UnorderedList
                    display="flex"
                    fontWeight="bold"
                    listStyleType="none"
                    margin={0}
                    onClick={(e) => handleOnClick(e)}
                >
                    {ARTIFACT_TYPE.map((type, idx) => (
                        <ListItem
                            key={idx}
                            id={type.rank}
                            backgroundColor={artifactRank === type.rank ? type.color : "unset"}
                            padding={1}
                            textAlign="center"
                            width="100%"
                            color={artifactRank === type.rank ? "white" : "inherit"}
                        >
                            {type.rank}
                        </ListItem>

                    ))}
                    {/* <Text
                        backgroundColor={artifactRank === "legendary" ? "#c3ab76" : "unset"}
                        id="legendary"
                        padding={1}
                        textAlign="center"
                        width="100%"
                    >
                        Legendary
                    </Text>
                    <Text
                        backgroundColor={artifactRank === "exemplar" ? "#6f0000" : "unset"}
                        id="exemplar"
                        padding={1}
                        textAlign="center"
                        width="100%"
                    >
                        Exemplar
                    </Text> */}
                </UnorderedList>
            }
            <VStack>
                <VStack>
                    <Box width="50vw">
                        <Image
                            src={artifact.image}
                            alt={`${artifact.name} image`}
                            width="100%"
                        />
                    </Box>
                    <UnorderedList margin={0}
                        display="flex"
                        justifyContent="center"
                        width="100%"
                        gap={4}
                        listStyleType="none" >
                        {Array(isMaxLevel ? 6 - (artifact.rarity - 1) : 1).fill(null).map((_, idx) => (
                            <ListItem key={idx}>
                                <Box width="20px">
                                    <Image src={starImage} alt="star image" width="100%" />
                                </Box>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </VStack>
                <Box>
                    <Heading as="h1" size="h1">{artifact.name}</Heading>
                </Box>
                <Box width="100%">
                    <Text>Stats</Text>
                    <UnorderedList listStyleType="none" margin={0} width="100%">
                        {artifact.stats.map((stat, idx) => {
                            if (artifactRank !== "exemplar" && idx > 3)
                                return
                            return (
                                <ListItem key={idx} display="flex" flexDir="row" justifyContent="space-between">
                                    <Text>{stat.name}</Text>
                                    <Text>{!isMaxLevel ? stat.values[0] : stat.values[1]}%</Text>
                                </ListItem>
                            )
                        })}
                    </UnorderedList>
                </Box>
                <Checkbox
                    colorScheme="green"
                    isChecked={isMaxLevel}
                    onChange={(e) => setIsMaxLevel(e.target.checked)}
                >
                    <Text as="span" fontWeight="bold">Preview Max Level</Text>
                </Checkbox>
            </VStack>
        </Box>
    )
}

export default ArtifactInfo;