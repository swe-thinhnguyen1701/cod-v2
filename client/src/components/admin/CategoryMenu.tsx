import { IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import useCategoryStore from "../../state-management/categoryStore";
import MENU_FEATURES from "../../config/menu-features";
import { useEffect, useState } from "react";

const CategoryMenu = () => {
    const { selectedCategory, setSelectedCategory } = useCategoryStore();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedCategory(selectedCategory);
    }, [selectedCategory, setSelectedCategory]);

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<RiMenuUnfold2Fill />}
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
            />
            <MenuList>
                {MENU_FEATURES.map((feature, featureIdx) => (
                    <MenuOptionGroup
                        defaultValue={selectedCategory}
                        title={feature.title}
                        type="radio"
                        key={featureIdx}
                    >
                        {feature.categories.map((category, categoryIdx) => (
                            <MenuItemOption
                                key={categoryIdx}
                                value={category}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </MenuItemOption>

                        ))}
                    </MenuOptionGroup>
                ))}
            </MenuList>
        </Menu>
    )
}

export default CategoryMenu;