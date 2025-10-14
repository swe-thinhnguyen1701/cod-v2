import { Box, Code, ListItem, Text, UnorderedList } from "@chakra-ui/react";

const EFFECTS = [
    {
        name: "lightgrey",
        color: "gray.500"
    },
    {
        name: "green",
        color: "green.500"
    },
    {
        name: "orange",
        color: "orange.400"
    }
]

const FormNote = () => {
    return (
        <Box>
            <Text fontWeight="bold">Form Note:</Text>
            <UnorderedList margin={0} listStyleType="none">
                {EFFECTS.map((effect, idx) => (
                    <ListItem key={idx} display="flex" justifyContent="space-between" gap={4} mb={1}>
                        <Text as="span">
                            <Code>{`{${effect.name}}`}</Code>TEXT<Code>{`{/${effect.name}}`}</Code>
                        </Text>
                        <Text as="span" color={effect.color} fontWeight="bold">TEXT</Text>
                    </ListItem>
                ))}
                <ListItem display="flex" justifyContent="space-between" gap={4}>
                    <Text as="span">
                        <Code>{`{bold}`}</Code>TEXT<Code>{`{/bold}`}</Code>
                    </Text>
                    <Text as="span" fontWeight="bold">TEXT</Text>
                </ListItem>
                <ListItem display="flex" justifyContent="space-between" gap={4}>
                    <Text as="span">
                        Line 1<Code>{`{newline}`}</Code>Line 2
                    </Text>
                    <Text as="span">Line 1<br />Line 2</Text>
                </ListItem>
            </UnorderedList>
        </Box>
    )
}

export default FormNote;