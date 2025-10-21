import { useQuery } from "@apollo/client";
import { GET_ALL_HEROES, GET_ALL_PETS, GET_ALL_ARTIFACTS } from "../../../graphql/queries";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import type { Control, FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, flexbox, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, HStack, Image, Input, InputGroup, InputRightElement, ListItem, Radio, RadioGroup, Text, Textarea, UnorderedList, useToast, VStack } from "@chakra-ui/react"
import { IoTrashBin } from "react-icons/io5";
import SectionHeading from "../../SectionHeading";
import FormNote from "./FormNote";
import Spinner from "../../Spinner";
import SearchBar from "./SearchBar";

const RARITY_LIST = ["legendary", "epic", "rare"];
const FACTION_LIST = ["League of Order", "Wilderburg", "Springwardens"];
const ROLE_LIST = [
    {
        title: "unit type",
        categories: ["Infantry", "Cavalry", "Archers", "Magic", "Overall", "N/A"],
    },
    {
        title: "senario",
        categories: ["PvP", "Peacekeeping", "Rally", "Garrison", "Gathering", "Engineering", "N/A"],
    },
    {
        title: "combat style",
        categories: ["Precision", "Skills", "Tank", "Mobility", "Control", "Support", "N/A"],
    }
];

export type FormData = {
    artifacts: { value: string }[];
    faction: string;
    heroDescription: string;
    heroName: string;
    isFlying: boolean;
    partners: { value: string }[]
    pets: { value: string }[]
    rarity: string;
    roles: string[];
    skills: {
        isRage: boolean;
        name: string;
        description: string;
        previews: { value: string }[];
    }[];
    title: string;
};

type SkillFieldsProps = {
    skillIdx: number;
    control: Control<FormData>;
    register: UseFormRegister<FormData>;
    errors: FieldErrorsImpl<FormData>
};

const SkillFields = ({ skillIdx, control, register, errors }: SkillFieldsProps) => {
    const {
        fields: skillPreviews,
        append: appendSkillPreview,
        remove: removeSkillPreview
    } = useFieldArray({
        control,
        name: `skills.${skillIdx}.previews`
    });

    return (
        <VStack gap={4}>
            <Flex flexDirection={{ base: "column", md: "row" }} width="100%" gap={4}>
                <FormControl isInvalid={!!errors.skills?.[skillIdx]?.name}>
                    <FormLabel mr={0}>
                        Skill Name
                    </FormLabel>
                    <Input
                        {...register(`skills.${skillIdx}.name` as const, { required: "Skill name is required" })}
                    />
                    <FormErrorMessage>{errors.skills?.[skillIdx]?.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Is Rage Skill?
                    </FormLabel>
                    <Controller
                        control={control}
                        name={`skills.${skillIdx}.isRage`}
                        render={({ field }) => (
                            <RadioGroup
                                onChange={(val) => field.onChange(val === "true")}
                                value={field.value ? "true" : "false"}>
                                <HStack>
                                    <Radio value="true">Yes</Radio>
                                    <Radio value="false">No</Radio>
                                </HStack>
                            </RadioGroup>
                        )}
                    />
                </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.skills?.[skillIdx]?.description}>
                <FormLabel>
                    Skill Description
                </FormLabel>
                <Textarea
                    {...register(`skills.${skillIdx}.description` as const, { required: "Skill description is required" })}
                    placeholder="Enter skill description"
                    resize="none"
                />
                <FormErrorMessage>{errors.skills?.[skillIdx]?.description?.message}</FormErrorMessage>
            </FormControl>
            <VStack width="100%">
                {skillPreviews.map((field, idx) => (
                    <FormControl key={field.id} isInvalid={!!errors.skills?.[skillIdx]?.previews}>
                        <InputGroup >
                            <Input
                                {...register(`skills.${skillIdx}.previews.${idx}.value` as const)}
                                placeholder="Enter skill preview"
                            />
                            <InputRightElement>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => removeSkillPreview(idx)}
                                >
                                    <IoTrashBin />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.skills?.[skillIdx]?.previews?.[idx]?.value?.message}</FormErrorMessage>
                    </FormControl>
                ))}
                <Button
                    colorScheme="green"
                    onClick={() => appendSkillPreview({ value: "" })}
                    disabled={skillPreviews.length > 2}
                >
                    + Add Skill Preview
                </Button>
            </VStack>
        </VStack>
    )
}

const HeroForm = () => {
    const { data: heroData, loading: loadingHeroData, error: errorHeroData } = useQuery(GET_ALL_HEROES);
    const { data: petData, loading: loadingPetData, error: errorPetData } = useQuery(GET_ALL_PETS);
    const {data: artifactData, loading: loadingArtifactData, error: errorArtifactData} = useQuery(GET_ALL_ARTIFACTS);

    const toast = useToast();
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            artifacts: [],
            faction: FACTION_LIST[0],
            heroDescription: "",
            heroName: "",
            isFlying: false,
            partners: [],
            pets: [],
            rarity: "legendary",
            roles: ROLE_LIST.map((role) => role.categories[0]),
            skills: [{
                isRage: false,
                name: "",
                description: "",
                previews: []
            }],
            title: ""
        }
    });

    const { fields: skills, append: appendSkill, remove: removeSkill } = useFieldArray({
        control,
        name: "skills"
    });

    const { fields: partners, append: appendPartner, remove: removePartner } = useFieldArray({
        control,
        name: "partners"
    });

    const { fields: pets, append: appendPet, remove: removePet } = useFieldArray({
        control,
        name: "pets"
    });

    const {fields: artifacts, append: appendArtifact, remove: removeArtifact} = useFieldArray({
        control,
        name: "artifacts"
    })

    if (loadingHeroData || loadingPetData || loadingArtifactData)
        return <Spinner />

    if (errorHeroData || errorPetData || errorArtifactData)
        return <Heading as="h1">Something went wrong</Heading>

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);

        toast({
            title: "Hero saved!",
            description: `${data.heroName || "Your hero"} has been successfully added.`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        });

        reset();
    }

    return (
        <VStack as="form" gap={8} onSubmit={handleSubmit(onSubmit)}>
            {/* Hero Information Section */}
            <VStack px={4} gap={4}>
                <SectionHeading title="Hero Information" />
                <Grid
                    templateAreas={{ base: `"heroName" "isFlying" "rarity"`, md: `"heroName isFlying" "rarity rarity"` }}
                    width="100%"
                    rowGap={4}
                    columnGap={8}
                >
                    {/* Hero name */}
                    <GridItem area="heroName">
                        <FormControl isInvalid={!!errors.heroName}>
                            <FormLabel>
                                Hero Name
                            </FormLabel>
                            <Input
                                {...register("heroName", { required: "Hero name is required" })} placeholder="Enter hero name"
                                maxLength={32} />
                            <FormErrorMessage>{errors.heroName?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    {/* Is Flying Hero */}
                    <GridItem area="isFlying">
                        <FormControl>
                            <FormLabel>
                                Is Flying Hero?
                            </FormLabel>
                            <Controller
                                control={control}
                                name="isFlying"
                                render={({ field }) => (
                                    <RadioGroup value={field.value ? "true" : "false"}>
                                        <HStack>
                                            <Radio value="true">Yes</Radio>
                                            <Radio value="false">No</Radio>
                                        </HStack>
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </GridItem>
                    {/* Hero rarity */}
                    <GridItem area="rarity">
                        <FormControl>
                            <FormLabel>
                                Rarity
                            </FormLabel>
                            <Controller
                                control={control}
                                name="rarity"
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        <Flex flexWrap="wrap" gap={4}>
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
                </Grid>

                {/* Hero faction */}
                <FormControl>
                    <FormLabel>
                        Faction
                    </FormLabel>
                    <Controller
                        control={control}
                        name="faction"
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                <Flex flexWrap="wrap" gap={4}>
                                    {FACTION_LIST.map((faction) => (
                                        <Radio key={faction} value={faction}>
                                            {faction}
                                        </Radio>
                                    ))}
                                </Flex>
                            </RadioGroup>
                        )}
                    />
                </FormControl>

                {/* Hero role */}
                <FormControl>
                    <FormLabel>
                        Role
                    </FormLabel>
                    <VStack>
                        {ROLE_LIST.map((role, roleIdx) => (
                            <FormControl key={roleIdx}>
                                <FormLabel textTransform="capitalize">
                                    {role.title}
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name={`roles.${roleIdx}`}
                                    render={({ field }) => (
                                        <RadioGroup {...field}>
                                            <Flex flexWrap="wrap" gap={4}>
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

                <Grid
                    templateAreas={{ base: `"title" "description"`, md: `"title description"` }}
                    templateColumns={{ base: "1fr", md: "200px 1fr" }}
                    columnGap={8}
                    rowGap={4}
                    width="100%"
                >
                    {/* Hero title */}
                    <GridItem area="title">
                        <FormControl isInvalid={!!errors.title}>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <Input {...register("title", { required: "Title is required" })} placeholder="Enter title" maxLength={32} />
                            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    {/* Hero description */}
                    <GridItem area="description">
                        <FormControl isInvalid={!!errors.heroDescription}>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <Input {...register("heroDescription", { required: "Hero description is required" })} placeholder="Enter hero description" maxLength={128} />
                            <FormErrorMessage>{errors.heroDescription?.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </Grid>
            </VStack>
            <Divider />
            {/* Hero Skill Section */}
            <VStack px={4} gap={4} width="100%">
                <SectionHeading title="Hero Skill" />
                <Box alignSelf="flex-start">
                    <FormNote />
                </Box>
                <VStack gap={4} width="100%">
                    {skills.map((skill, skillIdx) => (
                        <Card key={skill.id} padding={4} width="100%" mb={4}>
                            <CardHeader padding={0} mb={2}>
                                <HStack justifyContent="space-between">
                                    <Text as="span" fontWeight="bold">SKILL {skillIdx + 1}</Text>
                                    <Button
                                        variant="ghost"
                                        // colorScheme="red"
                                        onClick={() => removeSkill(skillIdx)} disabled={skills.length < 2}
                                        padding={2}
                                    >
                                        <Text as="span">
                                            <IoTrashBin />
                                        </Text>
                                    </Button>
                                </HStack>
                            </CardHeader>
                            <CardBody padding={0}>
                                <SkillFields skillIdx={skillIdx} control={control} register={register} errors={errors} />
                            </CardBody>
                        </Card>
                    ))}
                    <Button
                        colorScheme="green"
                        onClick={() => appendSkill({
                            isRage: false,
                            name: "",
                            description: "",
                            previews: []
                        })}
                        disabled={skills.length > 4}
                    >
                        + Add Hero Skill
                    </Button>
                </VStack>
            </VStack>
            <Divider />
            <Grid
                templateAreas={{
                    base: `"partners" "artifacts" "pets"`,
                    md: `"partners pets" "artifacts none"`
                }}
                width="100%"
                columnGap={8}
                rowGap={4}
            >
                {/* Recommended Heroes Section */}
                <GridItem area="partners" boxShadow="0 0 10px lightgray" padding={4} rounded={8}>
                    <VStack width="100%" gap={4} maxWidth="350px">
                        <SectionHeading title="Partners" />
                        <SearchBar data={heroData.getAllHeroes} placeholder="Enter hero name" list={partners} appendItem={appendPartner} />
                        <UnorderedList
                            margin={0}
                            listStyleType="none"
                            display="flex"
                            gap={6}
                            flexWrap="wrap"
                            justifyContent="flex-start"
                            width={{ base: "100%", md: "300px" }}
                        >
                            {partners.map((partner, partnerIdx) => (
                                <ListItem
                                    cursor="pointer"
                                    _hover={{ transform: "scale(1.2)" }}
                                    transition="transform 0.3s ease-in-out"
                                    key={partner.id}
                                    onClick={() => removePartner(partnerIdx)}>
                                    <Box width="50px">
                                        <Image src={`https://d3bhl6gkk81cq1.cloudfront.net/hero-avatar/${partner.value}.webp`} alt={`${partner.value} image`} />
                                    </Box>
                                    <Text fontWeight="bold">{partner.value}</Text>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </VStack>
                </GridItem>

                <GridItem area="artifacts">
                    <GridItem area="pets" boxShadow="0 0 10px lightgray" padding={4} rounded={8}>
                        <VStack width="100%" gap={4} maxWidth="350px">
                            <SectionHeading title="Artifacts" />
                            <SearchBar data={artifactData.getAllArtifacts} placeholder="Enter artifact name" list={pets} appendItem={appendArtifact} />
                            <UnorderedList margin={0} listStyleType="none" display="flex" gap={6} flexWrap="wrap" justifyContent="flex-start" width="100%">
                                {artifacts.map((artifact, artifactIdx) => (
                                    <ListItem
                                        cursor="pointer"
                                        _hover={{ transform: "scale(1.2)" }}
                                        transition="transform 0.3s ease-in-out"
                                        key={artifact.id}
                                        onClick={() => removeArtifact(artifactIdx)}
                                        width="100px"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                    >
                                        <Box width="50px">
                                            <Image src={`https://d3bhl6gkk81cq1.cloudfront.net/artifacts/${artifact.value}.webp`} alt={`${artifact.value} image`} />
                                        </Box>
                                        <Text fontWeight="bold" textAlign="center">{artifact.value}</Text>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </VStack>
                    </GridItem>
                </GridItem>

                {/* Recommended Pets Section */}
                <GridItem area="pets" boxShadow="0 0 10px lightgray" padding={4} rounded={8}>
                    <VStack width="100%" gap={4} maxWidth="350px">
                        <SectionHeading title="Pets" />
                        <SearchBar data={petData.getAllPets} placeholder="Enter pet name" list={pets} appendItem={appendPet} />
                        <UnorderedList margin={0} listStyleType="none" display="flex" gap={6} flexWrap="wrap" justifyContent="flex-start" width="100%">
                            {pets.map((pet, petIdx) => (
                                <ListItem
                                    cursor="pointer"
                                    _hover={{ transform: "scale(1.2)" }}
                                    transition="transform 0.3s ease-in-out"
                                    key={pet.id}
                                    onClick={() => removePet(petIdx)}
                                    width="100px"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <Box width="50px">
                                        <Image src={`https://d3bhl6gkk81cq1.cloudfront.net/pets/${pet.value}.webp`} alt={`${pet.value} image`} />
                                    </Box>
                                    <Text fontWeight="bold" textAlign="center">{pet.value}</Text>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </VStack>
                </GridItem>
            </Grid>


            <Divider />
            {/* Svaing Button */}
            <Button type="submit" colorScheme="teal" variant="outline" alignSelf="flex-start" ml={4}>
                Save Hero
            </Button>
        </VStack>
    );
}

export default HeroForm;