import { Link } from "react-router-dom"
import { ListItem, Text, UnorderedList } from "@chakra-ui/react"
import MENU from "../config/nav-links"

const MenuLarge = () => {
    return (
        <UnorderedList display="flex" gap={4} listStyleType="none" margin={0} padding={0}>
            {MENU.map((item, idx) => (
                <ListItem key={idx}>
                    <Link to={item.path}>
                        <Text fontWeight="bold" textTransform="uppercase">{item.name}</Text>
                    </Link>
                </ListItem>
            ))}
        </UnorderedList>
    )
}

export default MenuLarge;