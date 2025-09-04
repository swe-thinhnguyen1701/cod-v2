import { Box, Image, ListItem, Tooltip, UnorderedList } from "@chakra-ui/react";
import SectionHeading from "./SectionHeading";
import useHeroStore from "../state-management/heroStore";
import Spinner from "./Spinner";
import type HeroEntity from "../entities/HeroEntity";
import shrug from "../assets/emoji/shrug.png"
import { Link } from "react-router-dom";

interface Props {
    type: "partner" | "pet" | "artifact"
}

interface Configs {
    imgUrl: string;
    title: string;
    link: string;
    getData: (hero: HeroEntity) => string[] | undefined;
}

const CONFIGS: Record<Props["type"], Configs> = {
    partner: {
        imgUrl: "https://d3bhl6gkk81cq1.cloudfront.net/hero-avatar/",
        title: "Partners",
        link: "/heroes/",
        getData: (hero) => hero?.partners || undefined
    },
    pet: {
        imgUrl: "https://d3bhl6gkk81cq1.cloudfront.net/pets/",
        title: "Pets",
        link: "/pets/",
        getData: (hero) => hero?.pets || undefined
    },
    artifact: {
        imgUrl: "https://d3bhl6gkk81cq1.cloudfront.net/artifacts/",
        title: "Artifacts",
        link: "/artifacts/",
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
            {data.length > 0
                ? <UnorderedList
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
                            <Link to={`${CONFIGS[type].link}${item}`}>
                                <Tooltip label={item} hasArrow closeOnClick={false}>
                                    <Box width={{ base: "50px" }} >
                                        <Image
                                            src={`${imgUrl}${item}.webp`}
                                            alt={`${item} image`}
                                            width="100%"
                                        />
                                    </Box>
                                </Tooltip>
                            </Link>
                        </ListItem>
                    ))}
                </UnorderedList>
                : <Tooltip label="Sorry, no recommendations!" hasArrow>
                    <Box width={"70px"}>
                        <Image src={shrug} alt="Shrug emoji" />
                    </Box>
                </Tooltip>
            }
        </Box>
    )
}

export default RecommendationList;