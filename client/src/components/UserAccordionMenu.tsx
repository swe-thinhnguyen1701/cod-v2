import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, HStack, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import { useAuthStore } from "../state-management/authStore";
import { Link } from "react-router-dom";

const UserAccordionMenu = () => {
    const { user, logout } = useAuthStore();

    if (!user) return null;

    return (
        <Accordion allowToggle >
            <AccordionItem border="none">
                <AccordionButton padding={0} display="flex" justifyContent="space-between">
                    <HStack>
                        <Avatar size="sm" name={user.name} src={user.image ?? ""} />
                        <Text as="span">{user.name}</Text>
                    </HStack>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                        <UnorderedList>
                            <ListItem>
                                <Link to="/profile">
                                    Profile
                                </Link>
                            </ListItem>
                            {user.isAdmin &&
                                <ListItem>
                                    <Link to="/admin">
                                        Admin Management
                                    </Link>
                                </ListItem>
                            }
                            <ListItem onClick={logout}>
                                <Text>Logout</Text>
                            </ListItem>
                        </UnorderedList>
                    </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default UserAccordionMenu;