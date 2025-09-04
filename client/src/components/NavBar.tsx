import { Box, HStack, Image, Text, VStack, useColorMode } from "@chakra-ui/react"
import codLogo from "../assets/CoD-logo.png"
import MenuSmall from "./MenuSmall";
import MenuLarge from "./MenuLarge";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { colorMode } = useColorMode();

    return (
        <Box
            // backgroundColor="rgba(250, 250, 252, 0.8)"
            backgroundColor={colorMode === "dark" ? "rgba(68, 76, 77, 0.471)" : "rgba(250, 250, 252, 0.8)"}
            className="nav-bar"
            display="flex"
            justifyContent="center"
            padding={{ base: 4 }}
            position="fixed"
            width="100vw"
            zIndex={999}
            borderBottom="solid 1px"
            borderColor={colorMode === "dark" ? "gray.700" : "lightgray"}
        >
            {/* Navigation items will go here */}
            <HStack
                justifyContent="space-between"
                width="100vw" maxWidth="1440px">
                <Link to="/" className="home-link">
                    <VStack gap={0}>
                        <Box width="8.375vw" maxWidth="50px">
                            <Image src={codLogo} alt="Call of dragon fanpage logo image" width="100%" className="home-link-image"/>
                        </Box>
                        <Text
                            fontWeight="bold"
                            className="home-link-title"
                            color="#c28f2c"
                            fontSize={{ base: "0.7rem", md: "0.9rem" }}
                        >
                            CoD Wiki
                        </Text>
                    </VStack>
                </Link>
                <Box display={{ base: "block", lg: "none" }}>
                    <MenuSmall />
                </Box>
                <Box display={{ base: "none", lg: "block" }}>
                    <MenuLarge />
                </Box>
            </HStack>
        </Box>
    )
}

export default NavBar;