import { VStack, Image, Box } from "@chakra-ui/react"
import codLogo from "../assets/CoD-logo.png"

const SIZE = "30px"

const Spinner = () => {
    return (
        <VStack minHeight="90vh" justifyContent="center">
            <Box className="spinner" width={SIZE} height={SIZE}>
                <Image src={codLogo} alt="CoD logo" />
            </Box>
        </VStack>
    )
}

export default Spinner;