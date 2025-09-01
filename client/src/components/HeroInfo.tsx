import { Box, Flex, Heading, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";
import { GiLibertyWing } from "react-icons/gi";
import useHeroStore from "../state-management/heroStore";
import RoleBadgeList from "./RoleBadgeList";
import FactionDescription from "./FactionDescription";
import heroBackground from "../assets/hero-background.png"
import leagueOfOrderFaction from "../assets/faction-images/League-of-Order.png";
import springwardensFaction from "../assets/faction-images/Springwardens.png";
import wilderburgFaction from "../assets/faction-images/Wilderburg.png";
import ItemRarity from "./ItemRarity";

const HERO_IMG_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-full/";

const HeroInfo = () => {
    const { hero } = useHeroStore();

    if (!hero)
        return <Heading>Something went wrong</Heading>;

    return (
        <Box
            color="white"
            maxWidth="1440px"
            padding={4}
            position="relative"
            width="100vw"
        >
            <Box width="100%" position="absolute" inset={0} overflow="hidden" zIndex={-1}>
                <Box width="100%" height="100%" position="absolute" inset={0} zIndex={-2}>
                    <Image
                        src={heroBackground}
                        alt="Hero background image"
                        width="100%"
                        height={{ base: "100vh", md: "600px", lg: "620px" }}
                    />
                </Box>
                <Box
                    background="linear-gradient(270deg, rgba(0, 0, 0, 0) 24.44%, rgba(0, 0, 0, 0.6) 56.63%);"
                    position="absolute"
                    inset={0}
                    zIndex={-1}
                />
            </Box>
            <Flex color="white"
                flexDir={{ base: "column-reverse", md: "row" }}
                justifyContent={{ md: "space-between" }}
                gap={8}
            >
                <VStack maxWidth="550px" alignItems="start" gap={5} alignSelf={{ md: "center" }} pl={{ base: 0, lg: 8, xl: 10 }}>
                    <HStack gap={4} alignItems="center">
                        <Box>
                            <Tooltip label={<FactionDescription faction={hero.faction} />} closeOnClick={false}>
                                <Box>
                                    <Image
                                        src={hero.faction.name === "Wilderburg" ? wilderburgFaction : hero.faction.name === "Springwardens" ? springwardensFaction : leagueOfOrderFaction}
                                        alt={`${hero.faction.name} faction image`}
                                        width="100%"
                                    />
                                </Box>
                            </Tooltip>
                        </Box>
                        <VStack lineHeight={1} gap={4} alignItems="start">
                            <Text fontSize={{ base: "1.2rem" }} color="#c8a565" textTransform="uppercase" fontWeight="bold">
                                {hero.title}
                            </Text>
                            <HStack gap={4} color="white" alignItems="start">
                                <Heading
                                    as="h1"
                                    size="h1"
                                    textTransform="uppercase"
                                >
                                    {hero.name}
                                </Heading>
                                {hero.is_flying &&
                                    <Tooltip
                                        label="This is Flying Hero. Flying Heroes can form Flying Legions. A Flying Legion can only contain Flying units, Flying Heroes, and FLying Pets."
                                        size="md"
                                        closeOnClick={false}
                                    >
                                        <Text as="span" pt={2}>
                                            <GiLibertyWing />
                                        </Text>
                                    </Tooltip>}
                            </HStack>
                        </VStack>
                    </HStack>
                    <ItemRarity rarityId={hero.rarity} />
                    <Box ml={3}>
                        <RoleBadgeList roles={hero.roles} gap={6} />
                    </Box>
                    <Text color="white">
                        {hero.description}
                    </Text>
                </VStack>
                <Box
                    alignSelf={{ base: "center" }}
                    width={{ base: "300px", sm: "70%", md: "95.57vw", lg: "45vw" }}
                    maxWidth="600px"
                    transition={"width 0.3s ease-in-out"}
                >
                    <Image src={`${HERO_IMG_URL}${hero.name}.webp`} alt={`${hero.name} image`} />
                </Box>
            </Flex>
        </Box>
    )
}

export default HeroInfo;