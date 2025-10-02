import { useRef } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Drawer,
    DrawerOverlay,
    DrawerBody,
    DrawerContent,
    Image,
    Flex,
    UnorderedList,
    ListItem,
    Text,
    useDisclosure,
    useMediaQuery,
    useColorMode,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import MENU from "../config/nav-links";
import codLogo from "../assets/CoD-logo.png"
import ColorModeSwitch from "./ColorModeSwitch";
import { useAuthStore } from "../state-management/authStore";

const MenuSmall = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode } = useColorMode();
    const btnRef = useRef<HTMLDivElement | null>(null);
    const { isLoggedIn } = useAuthStore();

    const [isLargeScreen] = useMediaQuery("(min-width: 62em)");

    if (isLargeScreen)
        return null;


    return (
        <Box className="menu-toggle" cursor="pointer">
            <Box
                ref={btnRef}
                onClick={onOpen}
                fontSize="30px"
                display={{ base: "block", lg: "none" }}
                padding={1}
                className={`menu-btn ${colorMode === "dark" ? "menu-btn__dark" : "menu-btn__light"}`}
                borderRadius="5px">
                <FiMenu />
            </Box>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg={colorMode === "dark" ? "#1f1f1f" : "white"}>
                    <DrawerBody padding={0}>
                        <Flex justifyContent="space-between" alignItems="center" padding={4}>
                            <Box width="50px">
                                <Image src={codLogo} alt="Call of Dragons logo" />
                            </Box>
                            <Box
                                onClick={onClose}
                                fontSize="30px"
                                display={{ base: "block", lg: "none" }}
                                padding={1}
                                className={`menu-btn ${colorMode === "dark" ? "menu-btn__dark" : "menu-btn__light"}`}
                                borderRadius="5px"
                                cursor="pointer"
                            >
                                <FiX />
                            </Box>
                        </Flex>
                        <UnorderedList listStyleType="none" margin={0} fontWeight="bold" mt={4} padding={0}>
                            {MENU.map((item, index) => (
                                <ListItem
                                    key={index}
                                    className="menu-item"
                                    fontWeight="bold"
                                    fontSize="18px"
                                >
                                    <Link to={item.path} onClick={onClose}>
                                        <Text
                                            width="100%"
                                            textTransform="uppercase"
                                            fontWeight="bold"
                                            padding={4}
                                        >
                                            {item.name}
                                        </Text>
                                    </Link>
                                </ListItem>
                            ))}
                            <ListItem className="menu-item"
                                fontWeight="bold"
                                fontSize="18px"
                                padding={4}
                            >
                                {isLoggedIn ? (
                                    <Link to="/auth" onClick={onClose}>
                                        <Text
                                            width="100%"
                                            textTransform="uppercase"
                                            fontWeight="bold"
                                        >
                                            Account
                                        </Text>
                                    </Link>
                                ) : (
                                    <Link to="/auth" onClick={onClose}>
                                        <Text width="100%" textTransform="uppercase" fontWeight="bold">
                                            login
                                        </Text>
                                    </Link>
                                )}
                            </ListItem>
                            <ListItem pl={4} mt={4} width="50px">
                                <ColorModeSwitch />
                            </ListItem>
                        </UnorderedList>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default MenuSmall;