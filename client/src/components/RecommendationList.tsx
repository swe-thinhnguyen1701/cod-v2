import { Box, Image, ListItem, Tooltip, UnorderedList } from "@chakra-ui/react";
import SectionHeading from "./SectionHeading";
import useHeroStore from "../state-management/heroStore";
import Spinner from "./Spinner";
import type HeroEntity from "../entities/HeroEntity";

interface Props {
    type: "partner" | "pet" | "artifact"
}

interface Configs {
    imgUrl: string;
    title: string;
    getData: (hero: HeroEntity) => string[] | undefined;
}

const CONFIGS: Record<Props["type"], Configs> = {
    partner: {
        imgUrl: "https://d3bhl6gkk81cq1.cloudfront.net/hero-avatar/",
        title: "Partners",
        getData: (hero) => hero?.partners || undefined
    },
    pet: {
        imgUrl: "https://d3bhl6gkk81cq1.cloudfront.net/pets/",
        title: "Pets",
        getData: (hero) => hero?.pets || undefined
    },
    artifact: {
        imgUrl: "https://d3bhl6gkk81cq1.cloudfront.net/artifacts/",
        title: "Artifacts",
        getData: (hero) => hero?.artifacts || undefined
    }
};

const RecommendationList = ({ type }: Props) => {
    const { hero } = useHeroStore();
    const { imgUrl, title, getData } = CONFIGS[type];
    const data = getData(hero!);

    console.log(data)

    if (!data) return <Spinner />;

    return (
        <Box>
            <SectionHeading title={title} smallSize={true} />
            <UnorderedList
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={4}
                listStyleType="none"
                margin={0}>
                {data.map((item, idx) => (
                    <ListItem
                        key={idx}
                        className="recommended-item">
                        <Tooltip label={item} hasArrow closeOnClick={false}>
                            <Box width={{ base: "50px" }} >
                                <Image
                                    src={`${imgUrl}${item}.webp`}
                                    alt={`${item} image`}
                                    width="100%"
                                />
                            </Box>
                        </Tooltip>
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    )
}

export default RecommendationList;