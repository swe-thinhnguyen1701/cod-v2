import { Link } from "react-router-dom"
import { ListItem, Text, UnorderedList } from "@chakra-ui/react"
import MENU from "../config/nav-links"
import ColorModeSwitch from "./ColorModeSwitch"

const MenuLarge = () => {
    return (
        <UnorderedList display="flex" alignItems="center" gap={4} listStyleType="none" margin={0} padding={0}>
            {MENU.map((item, idx) => (
                <ListItem
                    key={idx}
                    className="menu-item"
                    fontWeight="bold"
                    fontSize="18px"
                    rounded={4}
                >
                    <Link to={item.path}>
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            padding={4}
                        >
                            {item.name}
                        </Text>
                    </Link>
                </ListItem>
            ))}
            <ListItem pl={4} width="50px">
                <ColorModeSwitch />
            </ListItem>
        </UnorderedList>
    )
}

export default MenuLarge;