import { Box, HStack, Image, Text, Tooltip } from "@chakra-ui/react";
import type RoleEntity from "../entities/RoleEntity";

interface Props {
    role: RoleEntity;
    rank: number
    isShorten?: boolean
}

const ROLE_BORDER_COLORS = ["#961212", "#ac5e04", "#088db2"];
const ROLE_BG_COLORS = ["#200000", "#3a1c0d", "#0d2f3a"];
const BG_COLORS = ["rgb(133, 23, 23)", "rgb(172, 94, 4)", "rgb(8, 141, 178)"];
const ROLE_ICON_SIZE = "30px";
const IMG_SRC_LINK = "https://d3bhl6gkk81cq1.cloudfront.net/hero-roles/";

const RoleBadge = ({ role, rank, isShorten }: Props) => {
    return (
        <Tooltip hasArrow label={role.description}>
            <HStack
                bg={`linear-gradient(90deg, ${BG_COLORS[rank]} 0%, rgba(0,0,0,1) 90%)`}
                borderRadius="5px"
                position="relative"
                color="white"
                fontWeight="bold"
                padding={1}
                pl={{base: 6}}
                pr={3}
                cursor="default"
            >
                <Box border={`solid 2px ${ROLE_BORDER_COLORS[rank]}`}
                    bg={ROLE_BG_COLORS[rank]}
                    borderRadius="50%"
                    width={ROLE_ICON_SIZE}
                    height={ROLE_ICON_SIZE}
                    position="absolute"
                    left={-3}
                >
                    <Image src={`${IMG_SRC_LINK}${role.name}.webp`} alt={`${role.name} role image`} />
                </Box>
                <Text fontSize={{base: "0.5rem", md: "0.7rem"}} transition={"font-size 0.3s ease-in-out"}>
                    {isShorten && role.name.length > 5 ? `${role.name.substring(0,4)}...` : role.name}
                </Text>
            </HStack>
        </Tooltip>
    )
}

export default RoleBadge;