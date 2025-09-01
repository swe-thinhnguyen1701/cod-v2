import { Heading } from "@chakra-ui/react";

interface Props {
    title: string,
    smallSize?: boolean
}

const SectionHeading = ({ title, smallSize }: Props) => {
    return (
        <Heading as="h2" size={smallSize ? "h3" : "h2"} textTransform="uppercase" mb={4} pl={2} color="#c3ab76">
            {title}
        </Heading>
    );
}

export default SectionHeading;