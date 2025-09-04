import { Text, VStack } from "@chakra-ui/react"
import type FactionEntity from "../entities/FactionEntity"
import TextEffect from "./TextEffect"

interface Props {
    faction: FactionEntity
    showDescription?: boolean
}

const FACTION_COLORS = ["#C53030", "#38A169", "#4299e1"]

const FactionDescription = ({ faction, showDescription }: Props) => {
    return (
        <VStack alignItems="start">
            <Text
                fontWeight="bold"
                fontSize={{ base: "1.2rem" }}
                color={faction.name === "Wilderburg"
                    ? FACTION_COLORS[0]
                    : faction.name === "Springwardens"
                        ? FACTION_COLORS[1]
                        : FACTION_COLORS[2]}>
                {faction.name}
            </Text>
            {showDescription && <TextEffect text={faction.description} />}
            {/* <VStack alignItems="start">
                {faction.buff.map((buff, idx) => (
                    <TextEffect key={idx} text={buff} />
                ))}
            </VStack> */}
        </VStack>
    )
}

export default FactionDescription;