import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Radio,
    RadioGroup,
    Textarea,
    useToast,
    VStack
} from "@chakra-ui/react";
import SectionHeading from "../../SectionHeading";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import FormNote from "./FormNote";

const RARITY_LIST = ["legendary", "epic", "rare", "common"];
const ROLES = [
    {
        title: "unit type",
        categories: ["Infantry", "Cavalry", "Archers", "Magic", "Overall", "N/A"],
        rank: 0
    },
    {
        title: "senario",
        categories: ["PvP", "Peacekeeping", "Rally", "Garrison", "Gathering", "Engineering", "N/A"],
        rank: 1
    },
    {
        title: "combat style",
        categories: ["Precision", "Skills", "Tank", "Mobility", "Control", "Support", "N/A"],
        rank: 2
    }
];

type FormData = {
    artifactName: string;
    rarity: string;
    isExemplar: boolean;
    roles: string[];
    stats: {
        name: string;
        values: { value: number }[];
    }[];
    skill: {
        name: string;
        cooldown: string;
        rageCost: string;
        description: string;
        skillPreviews: { value: string }[];
        additionalEffect: string;
        exemplarEffect: string;
    }
}

const ArtifactForm = () => {
    const toast = useToast();
    const [showExemplarTextArea, setShowExemplarTextArea] = useState(false);
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            artifactName: "",
            rarity: "legendary",
            isExemplar: false,
            roles: ROLES.map((role) => role.categories[0]),
            stats: [{ name: "", values: [{ value: 0 }, { value: 0 }] }],
            skill: {
                name: "",
                cooldown: "",
                rageCost: "",
                description: "",
                skillPreviews: [],
                additionalEffect: "",
                exemplarEffect: "",
            },
        },
    });

    const { fields: skillPreviews, append: appendSkillPreview, remove: removeSkillPreview } = useFieldArray({
        control,
        name: "skill.skillPreviews",
    });

    const { fields: stats, append: appendStat, remove: removeStat } = useFieldArray({
        control,
        name: "stats"
    })

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);

        toast({
            title: "Artifact saved!",
            description: `${data.artifactName || "Your artifact"} has been successfully added.`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        });

        reset();
        setShowExemplarTextArea(false);
    };

    return (
        <VStack as="form" gap={8} onSubmit={handleSubmit(onSubmit)}>
            {/* Artifact Information Section */}
            <VStack px={4} gap={4}>
                <SectionHeading title="Artifact Information" />
                <Grid
                    templateAreas={{ base: `"artifactName" "rarity" "isExemplar"`, md: `"artifactName artifactName" "rarity isExemplar"`, lg: `"artifactName isExemplar" "rarity rarity"` }}
                    templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                    columnGap={8}
                    rowGap={4}
                    width="100%"
                >
                    <GridItem area="artifactName">
                        <FormControl isInvalid={!!errors.artifactName}>
                            <FormLabel fontWeight="bold" htmlFor="artifact-name">
                                Artifact Name
                            </FormLabel>
                            <Input
                                {...register("artifactName", { required: "Artifact name is required" })}
                                placeholder="Artifact name"
                                maxLength={32}
                                id="artifact-name"
                            />
                            <FormErrorMessage>{errors.artifactName?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem area="rarity">
                        <FormControl>
                            <FormLabel fontWeight="bold">
                                Rarity
                            </FormLabel>
                            <Controller
                                control={control}
                                name="rarity"
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        <Flex gap={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
                                            {RARITY_LIST.map((rarity) => (
                                                <Radio key={rarity} value={rarity}>
                                                    {rarity}
                                                </Radio>
                                            ))}
                                        </Flex>
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem area="isExemplar">
                        <FormControl>
                            <FormLabel fontWeight="bold">
                                Is exemplar?
                            </FormLabel>
                            <Controller
                                control={control}
                                name="isExemplar"
                                render={({ field }) => (
                                    <RadioGroup
                                        onChange={(val) => { field.onChange(val === "true"); setShowExemplarTextArea(val === "true") }}
                                        value={field.value ? "true" : "false"}
                                    >
                                        <HStack gap={4}>
                                            <Radio value="true">Yes</Radio>
                                            <Radio value="false">No</Radio>
                                        </HStack>
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </GridItem>
                </Grid>
                <FormControl>
                    <FormLabel fontWeight="bold">
                        Role
                    </FormLabel>
                    <VStack gap={6}>
                        {ROLES.map((role, roleIdx) => (
                            <FormControl key={roleIdx}>
                                <FormLabel textTransform="capitalize">
                                    {role.title}
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name={`roles.${roleIdx}`}
                                    render={({ field }) => (
                                        <RadioGroup {...field}>
                                            <Flex gap={4} flexWrap="wrap">
                                                {role.categories.map((category) => (
                                                    <Radio key={category} value={category}>
                                                        {category}
                                                    </Radio>
                                                ))}
                                            </Flex>
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        ))}
                    </VStack>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="bold">
                        Artifact Stats
                    </FormLabel>
                    <VStack gap={4} mb={4}>
                        {stats.map((stat, idx) => (
                            <Flex flexWrap="wrap" key={stat.id} gap={4} width="100%" alignItems="flex-end">
                                <FormControl maxWidth={{ base: "100%", md: "200px" }}>
                                    <FormLabel>
                                        Stat Name
                                    </FormLabel>
                                    <Input {...register(`stats.${idx}.name` as const)} />
                                </FormControl>
                                <FormControl maxWidth={"90px"}>
                                    <FormLabel>
                                        Min Value
                                    </FormLabel>
                                    <Input
                                        {...register(`stats.${idx}.values.0.value` as const)}
                                        maxWidth="63px"
                                        maxLength={3}
                                    />
                                </FormControl>
                                <FormControl maxWidth={"90px"}>
                                    <FormLabel>
                                        Max Value
                                    </FormLabel>
                                    <Input
                                        {...register(`stats.${idx}.values.1.value` as const)}
                                        maxWidth="63px"
                                        maxLength={3}
                                    />
                                </FormControl>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    isDisabled={stats.length === 1}
                                    onClick={() => removeStat(idx)}
                                >
                                    <IoTrashBin />
                                </Button>
                            </Flex>
                        ))}
                    </VStack>
                    <Button colorScheme="green" onClick={() => appendStat({ name: "", values: [{ value: 0 }, { value: 0 }] })}>
                        + Add New Stat
                    </Button>
                </FormControl>
            </VStack>


            {/* Artifact Skill Information Section */}
            <VStack width="100%" px={4} gap={4}>
                <SectionHeading title="Artifact Skill" />
                <Box alignSelf="start" mb={4}>
                    <FormNote />
                </Box>
                <Flex flexDirection={{ base: "column", md: "row" }} width="100%" gap={4}>
                    <FormControl isInvalid={!!errors.skill?.name}>
                        <FormLabel fontWeight="bold">
                            Skill Name
                        </FormLabel>
                        <Input {...register("skill.name", { required: "Skill name is required" })} placeholder="Skill name" maxLength={32} />
                        <FormErrorMessage>{errors.skill?.name?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.skill?.cooldown}>
                        <FormLabel fontWeight="bold">
                            Cooldown
                        </FormLabel>
                        <Input {...register("skill.cooldown", { required: "Skill cooldown is required" })} placeholder="Skill cooldown" maxLength={5} />
                        <FormErrorMessage>{errors.skill?.cooldown?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight="bold">
                            Rage Cost
                        </FormLabel>
                        <Input {...register("skill.rageCost")} placeholder="Rage cost" maxLength={4} />
                    </FormControl>
                </Flex>
                <FormControl>
                    <FormLabel fontWeight="bold">
                        Description
                    </FormLabel>
                    <Textarea {...register("skill.description")} resize="none" placeholder="Enter skill description" />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="bold">
                        Skill Preview
                    </FormLabel>
                    <VStack>
                        {skillPreviews.map((field, idx) => (
                            <InputGroup key={field.id}>
                                <Input
                                    {...register(`skill.skillPreviews.${idx}.value` as const)}
                                />
                                <InputRightElement>
                                    <Button colorScheme="red" size="sm" onClick={() => removeSkillPreview(idx)}>
                                        X
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        ))}
                        <Button colorScheme="green" onClick={() => appendSkillPreview({ value: "" })}>
                            + Add Skill Preview
                        </Button>
                    </VStack>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="bold">
                        Additional Effect
                    </FormLabel>
                    <Textarea {...register("skill.additionalEffect")} resize="none" placeholder="Enter additional effect or leave a blank" />
                </FormControl>
                {showExemplarTextArea &&
                    <FormControl isInvalid={!!errors.skill?.exemplarEffect}>
                        <FormLabel fontWeight="bold">
                            Exemplar Effect
                        </FormLabel>
                        <Textarea {...register("skill.exemplarEffect", { required: "Exemplar effect is required" })} resize="none" placeholder="Enter exemplar effect" />
                        <FormErrorMessage>{errors.skill?.exemplarEffect?.message}</FormErrorMessage>
                    </FormControl>
                }

            </VStack>

            {/* Saving Button */}
            <Button type="submit" colorScheme="teal" variant="outline">
                Save
            </Button>
        </VStack>
    );
}

export default ArtifactForm;