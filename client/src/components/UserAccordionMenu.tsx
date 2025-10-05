import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, HStack, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import { useAuthStore } from "../state-management/authStore";
import { Link } from "react-router-dom";

const UserAccordionMenu = () => {
    const { user, logout } = useAuthStore();

    if (!user) return null;

    return (
        <Accordion allowToggle >
            <AccordionItem border="none">
                <AccordionButton display="flex" justifyContent="space-between">
                    <HStack>
                        <Avatar size="sm" name={user.name} src={user.image ?? ""} />
                        <Text as="span" fontWeight="bold" textTransform="capitalize">{user.name}</Text>
                    </HStack>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <UnorderedList listStyleType="none" margin={0} fontWeight="bold" pl={4}>
                        <ListItem
                            className="menu-item"
                            fontWeight="bold"
                            fontSize="14px"
                        >
                            <Link to="/profile">
                                <Text
                                    width="100%"
                                    textTransform="uppercase"
                                    fontWeight="bold"
                                    padding={4}
                                >
                                    Profile
                                </Text>
                            </Link>
                        </ListItem>
                        {user.isAdmin &&
                            <ListItem
                                className="menu-item"
                                fontWeight="bold"
                                fontSize="14px"
                            >
                                <Link to="/admin">
                                    <Text
                                        width="100%"
                                        textTransform="uppercase"
                                        fontWeight="bold"
                                        padding={4}
                                    >
                                        Admin Management
                                    </Text>
                                </Link>
                            </ListItem>
                        }
                        <ListItem
                            className="menu-item"
                            fontWeight="bold"
                            fontSize="14px"
                            onClick={logout}
                            cursor="pointer"
                        >
                            <Text
                                width="100%"
                                textTransform="uppercase"
                                fontWeight="bold"
                                padding={4}
                            >
                                Logout
                            </Text>
                        </ListItem>
                    </UnorderedList>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default UserAccordionMenu;