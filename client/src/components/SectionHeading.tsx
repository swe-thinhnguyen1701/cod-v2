import { Heading } from "@chakra-ui/react";

interface Props {
    title: string
}

const SectionHeading = ({ title }: Props) => {
    return (
        <Heading as="h2" size="h2" textTransform="uppercase" mb={4} pl={2} color="#c3ab76">
            {title}
        </Heading>
    );
}

export default SectionHeading;