import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import useCategoryStore from "../../state-management/categoryStore";
import MENU_FEATURES from "../../config/menu-features";

const CategorySidebar = () => {
    const { selectedCategory, setSelectedCategory } = useCategoryStore();

    return (
        <Box>
            {MENU_FEATURES.map((feature, featureIdx) => (
                <Box key={featureIdx}>
                    <Heading as="h4" fontSize="1.2rem" mb={2}>
                        {feature.title}
                    </Heading>
                    <UnorderedList listStyleType="none" margin={0} paddingLeft={2} display="flex" flexDirection="column" gap={2}>
                        {feature.categories.map((category, categoryIdx) => (
                            <ListItem
                                key={categoryIdx}
                                onClick={() => setSelectedCategory(category)}
                                cursor="pointer"
                                value={category}
                                backgroundColor={selectedCategory === category ? "#c3ab76" : "unset"}
                                color={selectedCategory === category ? "white" : "inherit"}
                                fontWeight={selectedCategory === category ? "bold" : "normal"}
                                _hover={{ backgroundColor: "#c3ab76", color: "white", fontWeight: "bold" }}
                                transitionProperty="background-color, color, font-weight"
                                transitionDuration="0.3s"
                                transitionTimingFunction="ease-in-out"
                                padding={2}
                                rounded={4}
                            >
                                <Text textTransform="capitalize">
                                    {category}
                                </Text>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            ))}
        </Box>
    )
}

export default CategorySidebar;