import { Box, Grid, GridItem, Heading, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Tooltip, VStack } from "@chakra-ui/react";
import usePetStore from "../state-management/petStore";
import BlurImage from "./BlurImage";
import RoleBadgeList from "./RoleBadgeList";
import { useEffect, useState } from "react";
import { GiLibertyWing } from "react-icons/gi";

const PetInfo = () => {
    const { pet } = usePetStore();
    const [sliderValue, setSliderValue] = useState([0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        if (pet) {
            setSliderValue(pet.attributes.map(att => att.value));
        }
    }, [pet]);

    if (!pet)
        return null;

    const onChangeHandler = (idx: number, value: number) => {
        setSliderValue(prev => {
            const newSliderValue = [...prev];
            newSliderValue[idx] = value;
            return newSliderValue;
        })
    }

    // width: 347 points = 200px
    // => 200 points = (200 * 200 / 347)px
    const DEFAULT_ATTRIBUTE_BAR_WIDTH = [100, 200];
    const MAX_ATTRIBUTE_VAL = 347

    console.log(pet);

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
            <VStack gap={2} alignItems="start">
                <Text alignSelf="center" fontWeight="bold" fontSize={{ base: "1.3rem" }}>
                    Attribute
                </Text>
                <Grid
                    as="ul"
                    templateColumns="repeat(2, 1fr)"
                    gridGap={{ base: 2, md: 6 }}
                    listStyleType="none"
                    pl={{md: 7}}
                >
                    {pet.attributes.map((att, idx) => (
                        <GridItem as="li" key={idx} minWidth={{ base: "150px", md:"250px" }}>
                            <VStack alignItems="start" gap={0}>
                                <Text fontWeight="bold">{att.name}</Text>
                                <HStack width="100%" gap={{ base: 2, md: 4 }}>
                                    <Box width={{
                                        base: `${Math.round(DEFAULT_ATTRIBUTE_BAR_WIDTH[0] * att.value / MAX_ATTRIBUTE_VAL)}px`,
                                        md: `${Math.round(DEFAULT_ATTRIBUTE_BAR_WIDTH[1] * att.value / MAX_ATTRIBUTE_VAL)}px`
                                    }}
                                        transition="width 0.3s ease-in-out"
                                    >
                                        <Slider
                                            aria-label="pet attribute slider"
                                            defaultValue={att.value}
                                            min={0}
                                            max={att.value}
                                            onChange={(val) => onChangeHandler(idx, val)}
                                        >
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Box>
                                    <Text fontWeight="bold">{sliderValue[idx]}</Text>
                                </HStack>
                            </VStack>
                        </GridItem>
                    ))}
                </Grid>
            </VStack>
        </VStack>
    )
}

export default PetInfo;