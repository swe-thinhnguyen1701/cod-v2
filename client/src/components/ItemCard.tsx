import { Card, CardBody, CardFooter, Heading } from "@chakra-ui/react";
import type HeroBriefEntity from "../entities/HeroEntity";
import type ArtifactEntity from "../entities/ArtifactEntity";
import RoleBadgeList from "./RoleBadgeList";
// import { useState } from "react";
import BlurImage from "./BlurImage";

interface Props {
    data: HeroBriefEntity | ArtifactEntity
}

// const HERO_IMG_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-full/"

const ItemCard = ({ data }: Props) => {
    // const [loaded, setLoaded] = useState(false);

    return (
        <Card width="300px" height="370px" overflow="hidden" className="item-card">
            <CardBody
                display="flex"
                flexDir="column"
                justifyContent="space-between"
                alignItems="center"
                pb={2}
                className={`item-card-body__${data.rarity === 1 ? "legend" : data.rarity === 2 ? "epic" : "common"}`}>
                {/* <Image
                    alt={`${data.name} image`}
                    className="item-image"
                    loading="lazy"
                    src={`${HERO_IMG_URL}${data.name}.webp`}
                    transition="filter 1s ease-out"
                    filter={loaded ? "blur(0px)" : "blur(20px)"}
                    onLoad={() => setLoaded(true)}
                /> */}
                <BlurImage src={data.image} alt={`${data.name} image`} />
                <RoleBadgeList roles={data.roles} gap={4} isShorten />
            </CardBody>
            <CardFooter display={"flex"} justifyContent={"center"} bg="gray.900" color="white" fontWeight="bold" padding={1} className="item-card-footer">
                <Heading as="h3" size="h3" transition={"font-size 0.3s ease-in-out"}>
                    {data.name.length > 10 ? data.name.substring(0, 10).toUpperCase() + "..." : data.name.toUpperCase()}
                </Heading>
            </CardFooter>
        </Card>
    )
}

export default ItemCard;