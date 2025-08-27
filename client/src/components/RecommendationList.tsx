import { Image, ListItem, UnorderedList } from "@chakra-ui/react";

interface Props {
    data: string[],
    type: "hero" | "pet" | "artifact"
}

const IMG_URLS = [
    "https://d3bhl6gkk81cq1.cloudfront.net/hero-avatar/",
    "https://d3bhl6gkk81cq1.cloudfront.net/pets/",
    "https://d3bhl6gkk81cq1.cloudfront.net/artifacts/"
]

const RecommendationList = ({ data, type }: Props) => {
    const imgUrl = type === "hero" ? IMG_URLS[0] : type === "pet" ? IMG_URLS[1] : IMG_URLS[2];
    return (
        <UnorderedList
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            gap={4}
            listStyleType="none"
            margin={0}>
                {data.map((item, idx) => (
                    <ListItem key={idx}>
                        <Image src={`${imgUrl}${item}.webp`} alt={`${item} image`}/>
                    </ListItem>
                ))}
        </UnorderedList>
    )
}

export default RecommendationList;