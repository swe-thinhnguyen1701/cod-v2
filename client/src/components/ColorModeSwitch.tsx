import { FormControl, Switch, Tooltip, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <Tooltip label="Dark Mode" closeOnClick={false}>
            <FormControl display="flex" gap={2}>
                <Switch colorScheme="teal" isInvalid isChecked={colorMode === "dark"} onChange={toggleColorMode} />
            </FormControl>
        </Tooltip>
    )

}
export default ColorModeSwitch;