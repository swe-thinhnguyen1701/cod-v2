import { Card, CardBody, CardFooter, Heading, Image, ListItem, UnorderedList } from "@chakra-ui/react";
import type HeroBriefEntity from "../entities/HeroEntity";
import RoleBadge from "./RoleBadge";

interface Props {
    data: HeroBriefEntity
}

const HERO_IMG_URL = "https://d3bhl6gkk81cq1.cloudfront.net/hero-full/"

const ItemCard = ({ data }: Props) => {
    return (
        <Card width="300px" height="370px" overflow="hidden" className="item-card" cursor="default">
            <CardBody
                display="flex"
                flexDir="column"
                justifyContent="space-between"
                alignItems="center"
                pb={2}
                className={`item-card-body__${data.rarity === 1 ? "legend" : data.rarity === 2 ? "epic" : "common"}`}>
                <Image className="item-image" src={`${HERO_IMG_URL}${data.name}.webp`} alt={`${data.name} image`} />
                <UnorderedList display="flex" listStyleType="none" padding={0} margin={0} gap={4}>
                    {data.roles.map((role, idx) => (
                        <ListItem key={idx}>
                            <RoleBadge role={role} type={idx} isShorten/>
                        </ListItem>
                    ))}
                </UnorderedList>
            </CardBody>
            <CardFooter display={"flex"} justifyContent={"center"} bg="gray.900" color="white" fontWeight="bold" padding={0} className="item-card-footer">
                <Heading as="h3" size="h3" transition={"font-size 0.3s ease-in-out"}>
                    {data.name.toUpperCase()}
                </Heading>
            </CardFooter>
        </Card>
    )
}

export default ItemCard;