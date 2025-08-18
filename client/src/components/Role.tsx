import { Box, HStack } from "@chakra-ui/react";

interface Props {
    roles: number[];
}

const Role = ({roles}: Props) => {
    return (
        <HStack>
            {roles.map((role) => (
                <Box key={role} bg="blue.500" color="white" p={2} borderRadius="md">
                    Role {role}
                </Box>
            ))}
        </HStack>
    )
}

export default Role;