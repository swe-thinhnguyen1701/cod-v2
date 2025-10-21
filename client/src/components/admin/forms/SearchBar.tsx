import { Box, HStack, Input, InputGroup, InputRightAddon, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { HeroBriefEntity } from "../../../entities/HeroEntity";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useSearch from "../../../hooks/useSearch";
import type { FieldArrayWithId, UseFieldArrayAppend } from "react-hook-form";
import type { FormData } from "./HeroForm";

interface Props {
    data: HeroBriefEntity[];
    placeholder: string;
    list: FieldArrayWithId<FormData, "artifacts" | "partners" | "pets", "id">[];
    appendItem: UseFieldArrayAppend<FormData, "artifacts" | "partners" | "pets">;
}

const SearchBar = ({ data, placeholder, list, appendItem }: Props) => {
    const { query, setQuery, results } = useSearch(data);

    const onClickHandler = (value: string) => {
        const isExist = list.find(item => item.value === value);

        if (!isExist) {
            appendItem({ value: value })
        }
        setQuery("");
    }

    return (
        <Box position="relative">
            <InputGroup width="100%">
                <Input id="search-bar" value={query} placeholder={placeholder} onChange={(e) => setQuery(e.target.value)} />
                <InputRightAddon>
                    <FaMagnifyingGlass />
                </InputRightAddon>
            </InputGroup>
            {results.length !== 0 &&
                <UnorderedList
                    margin={0}
                    listStyleType="none"
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    maxHeight="130px"
                    overflowY="auto"
                    position="absolute"
                    zIndex={2}
                    backgroundColor="whiteAlpha.900"
                    width="100%"
                    rounded={5}
                    top="45px"
                    boxShadow={"0 0 10px lightgray"}
                >
                    {results.map((item, idx) => (
                        <ListItem
                            key={idx}
                            padding={2}
                            _hover={{ backgroundColor: "#c3ab76", fontWeight: "bold" }}
                            transitionProperty="background-color, font-weight"
                            transitionDuration="0.3s"
                            transitionTimingFunction="ease-in-out"
                            cursor="pointer"
                            onClick={() => onClickHandler(item.name)}
                        >
                            <HStack gap={4}>
                                <Text as="span">{item.name}</Text>
                            </HStack>
                        </ListItem>
                    ))}
                </UnorderedList>
            }
        </Box>
    )
}

export default SearchBar;