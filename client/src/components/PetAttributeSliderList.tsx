
// width: 347 points = 200px

import { Box, Grid, GridItem, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from "@chakra-ui/react";
import usePetStore from "../state-management/petStore";
import { useState } from "react";
import type { PetAttribute } from "../entities/PetEntity";

// i.e. 200 points = (200 * 200 / 347)px
const DEFAULT_ATTRIBUTE_BAR_WIDTH = [100, 200, 150];
const MAX_ATTRIBUTE_VAL = 347;

interface Props {
    defaultAttributes: PetAttribute[];
}

const PetAttributeSliderList = ({ defaultAttributes }: Props) => {
    const { petAttributes, setAttributeAt } = usePetStore();
    const [sliderValue, setSliderValue] = useState<PetAttribute[]>(petAttributes);

    const onChangeHandler = (idx: number, value: number) => {
        setSliderValue(prev => {
            const newSliderValue = [...prev];
            newSliderValue[idx] = { ...newSliderValue[idx], value: value };
            return newSliderValue;
        });
        setAttributeAt(idx, value);
    }

    return (
        <Grid
            as="ul"
            templateColumns="repeat(2, 1fr)"
            gridGap={{ base: 2, md: 4 }}
            listStyleType="none"
        >
            {defaultAttributes.map((att, idx) => (
                <GridItem as="li" key={idx} minWidth={{ base: "150px", sm: "250px", lg: "200px" }}>
                    <VStack alignItems="start" gap={0}>
                        <Text fontWeight="bold">{att.name}</Text>
                        <HStack width="100%" gap={{ base: 2, md: 4 }}>
                            <Box width={{
                                base: `${Math.round(DEFAULT_ATTRIBUTE_BAR_WIDTH[0] * att.value / MAX_ATTRIBUTE_VAL)}px`,
                                sm: `${Math.round(DEFAULT_ATTRIBUTE_BAR_WIDTH[1] * att.value / MAX_ATTRIBUTE_VAL)}px`,
                                lg: `${Math.round(DEFAULT_ATTRIBUTE_BAR_WIDTH[2] * att.value / MAX_ATTRIBUTE_VAL)}px`,
                                xl: `${Math.round(DEFAULT_ATTRIBUTE_BAR_WIDTH[1] * att.value / MAX_ATTRIBUTE_VAL)}px`
                            }}
                                transition="width 0.3s ease-in-out"
                            >
                                <Slider
                                    aria-label="pet attribute slider"
                                    defaultValue={MAX_ATTRIBUTE_VAL}
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
                            <Text fontWeight="bold">{sliderValue[idx].value}</Text>
                        </HStack>
                    </VStack>
                </GridItem>
            ))}
        </Grid>
    )
}

export default PetAttributeSliderList;