import { Box, HStack, Text } from "@chakra-ui/react"
import MenuSmall from "./MenuSmall";
import MenuLarge from "./MenuLarge";

const NavBar = () => {
    return (
        <Box>
            {/* Navigation items will go here */}
            <HStack justifyContent="space-between" width="100vw" maxWidth="1440px">
                <Text>Logo</Text>
                <Box display={{base: "block", lg: "none"}}>
                    <MenuSmall />
                </Box>
                <Box display={{base: "none", lg: "block"}}>
                    <MenuLarge />
                </Box>
            </HStack>
        </Box>
    )
}

export default NavBar;