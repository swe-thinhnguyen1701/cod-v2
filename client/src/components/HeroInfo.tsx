import { Box, Flex, Heading, HStack, Image, Text, Tooltip } from "@chakra-ui/react";
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
        return <Heading>404! Hero does not exist</Heading>;

    return (
        <Flex
            bgImg={heroBackground}
            bgRepeat="no-repeat"
            bgSize="cover"
            flexDir={{ base: "column-reverse", md: "row" }}
            justifyContent={{ md: "space-between" }}
            width="100vw"
            maxWidth="1440px"
            padding={4}
            gap={8}
            color="white">
            <Box maxWidth="700px">
                <HStack gap={4} alignItems="center">
                    <Box>
                        <Tooltip label={<FactionDescription faction={hero.faction} />} closeOnClick={false}>
                            <Box width="50px">
                                <Image
                                    src={hero.faction.name === "Wilderburg" ? wilderburgFaction : hero.faction.name === "Springwardens" ? springwardensFaction : leagueOfOrderFaction}
                                    alt="Leauge of Order faction image"
                                    width="100%"
                                />
                            </Box>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Text fontSize={{ base: "1.7rem" }} color="#c8a565" textTransform="uppercase" fontWeight="bold">
                            {hero.title}
                        </Text>
                        <HStack gap={4} color="white">
                            <Heading
                                as="h1"
                                size="h1"
                                textTransform="uppercase"
                            >
                                {hero.name}
                            </Heading>
                            <Tooltip
                                label="This is Flying Hero. Flying Heroes can form Flying Legions. A Flying Legion can only contain Flying units, Flying Heroes, and FLying Pets."
                                size="md"
                                closeOnClick={false}
                            >
                                <GiLibertyWing />
                            </Tooltip>
                        </HStack>
                    </Box>
                </HStack>
                <Box ml={3}>
                    <RoleBadgeList roles={hero.roles} />
                </Box>
                <Text color="white" mt={4}>
                    {hero.description}
                </Text>
                <HStack>
                    <Text as="span">Rarity: </Text>
                    <ItemRarity rarityId={hero.rarity} />
                </HStack>
            </Box>
            <Box
                alignSelf={{ base: "center" }}
                width={{ base: "300px", sm: "70%", md: "45.57vw", lg: "40vw", xl: "420px" }}
                transition={"width 0.3s ease-in-out"}
            >
                <Image src={`${HERO_IMG_URL}${hero.name}.webp`} alt={`${hero.name} image`} />
            </Box>
        </Flex>
    )
}

export default HeroInfo;