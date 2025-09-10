import { Box, Checkbox, Heading, Image, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import CountUp from "react-countup";
import useArtifactStore from "../state-management/artifactStore";
import starImage from "../assets/star.webp";
import { useState } from "react";
import BlurImage from "./BlurImage";
import RoleBadgeList from "./RoleBadgeList";
import ArtifactRankSelection from "./ArtifactRankSelection";

const ArtifactInfo = () => {
    const { artifact, selectedArtifactRank } = useArtifactStore();
    const [isMaxLevel, setIsMaxLevel] = useState(false);


    if (!artifact)
        return;

    return (
        <Box>
            {artifact.is_exemplar &&
                <ArtifactRankSelection />
            }
            <VStack mt={artifact.rarity === 1 ? 4 : 0}>
                <VStack gap={0}>
                    <Box width={{ base: "200px" }} className="artifact-image" pt={8}>
                        <BlurImage src={artifact.image} alt={`${artifact.name} image`} />
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
                <VStack mb={4}>
                    <Heading as="h1" size="h1" textAlign="center">{artifact.name}</Heading>
                    <RoleBadgeList roles={artifact.roles} gap={4} />
                </VStack>
                <Box width="100%" px={{ base: 2, sm: 0 }} transition="padding 0.3s ease-in-out" maxWidth="390px">
                    <Text fontWeight="bold" fontSize={{ base: "1.2rem" }}>Stats</Text>
                    <Text>
                        <Text as="span">Level: </Text>
                        <Text as="span" fontWeight="bold">
                            {/* {isMaxLevel ? `${60 - 10 * (artifact.rarity - 1)}` : 1}/{60 - 10 * (artifact.rarity - 1)} */}
                            <CountUp start={1} end={isMaxLevel ? 60 - 10 * (artifact.rarity - 1) : 1} />/{60 - 10 * (artifact.rarity - 1)}
                        </Text>
                    </Text>
                    <UnorderedList listStyleType="none" margin={0} width="100%" minHeight={artifact.is_exemplar ? "150px" : "unset"}>
                        {artifact.stats.map((stat, idx) => {
                            if (selectedArtifactRank === "Legendary" && idx > 3)
                                return
                            return (
                                <ListItem key={idx} display="flex" flexDir="row" justifyContent="space-between">
                                    <Text>{stat.name}</Text>
                                    <Text textColor="teal" fontWeight="bold">
                                        <CountUp start={0} end ={isMaxLevel ? stat.values[1] : stat.values[0]} decimals={Number.isInteger(stat.values[0]) ? 0 : 1}/>%
                                    </Text>
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