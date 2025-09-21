import { Box, Heading, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import usePetStore from "../state-management/petStore";
import BlurImage from "./BlurImage";
import RoleBadgeList from "./RoleBadgeList";
import { GiLibertyWing } from "react-icons/gi";
import PetAttributeSliderList from "./PetAttributeSliderList";

const PetInfo = () => {
    const { pet } = usePetStore();

    if (!pet)
        return null;

    return (
        <VStack width="100%" gap={7} alignItems="center">
            <Box>
                <BlurImage src={pet.image} alt={`${pet.name} image`} />
            </Box>
            <VStack>
                <HStack>
                    <Heading as="h1" size="h1" textAlign="center">{pet.name}</Heading>
                    {pet.is_flying &&
                        <Tooltip
                            label="This is Flying Pet. Flying Heroes can form Flying Legions. A Flying Legion can only contain Flying units, Flying Heroes, and FLying Pets."
                            size="md"
                            closeOnClick={false}
                        >
                            <Text as="span">
                                <GiLibertyWing />
                            </Text>
                        </Tooltip>
                    }
                </HStack>
                <RoleBadgeList roles={pet.roles} gap={4} />
            </VStack>
            <VStack gap={2} alignItems="start" overflow="hidden">
                <Text alignSelf="center" fontWeight="bold" fontSize={{ base: "1.3rem" }}>
                    Attribute
                </Text>
                <PetAttributeSliderList defaultAttributes={pet.attributes}/>
            </VStack>
        </VStack>
    )
}

export default PetInfo;