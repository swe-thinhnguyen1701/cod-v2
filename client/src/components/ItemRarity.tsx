import { Text } from "@chakra-ui/react";

interface Props {
    rarityId: number
}
const RARITY_COLORS = ["rgba(245, 206, 0, 1)", "rgba(209, 0, 209, 1)", "rgba(4, 129, 228, 1)"];

const ItemRarity = ({ rarityId }: Props) => {
    return (
        <Text
            textTransform="uppercase"
            color={RARITY_COLORS[rarityId - 1]}
            fontWeight="bold">
            {rarityId === 1 ? "legendary" : rarityId === 2 ? "epic" : "common"}
        </Text>
    )
}

export default ItemRarity;