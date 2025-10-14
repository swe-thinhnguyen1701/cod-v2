import { Box, ScaleFade, Flex, useBreakpointValue, VStack, Card } from "@chakra-ui/react";
import CategoryMenu from "./admin/CategoryMenu";
import CategorySidebar from "./admin/CategorySidebar";
import useCategoryStore from "../state-management/categoryStore";
import ArtifactForm from "./admin/forms/ArtifactForm";
import HeroForm from "./admin/forms/HeroForm";
import PetForm from "./admin/forms/PetForm";

const AdminDashboard = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const { selectedCategory } = useCategoryStore();

    return (
        <Flex position="relative" gap={8}>
            {isMobile
                ? <Box
                    position="fixed"
                    right={0}
                    top={{ base: "28.25vw", sm: "120px", md: "130px" }}
                    zIndex={2}>
                    <CategoryMenu />
                </Box>
                : <Card padding={4} width="200px" height="200px">
                    <CategorySidebar />
                </Card>
            }
            <VStack paddingLeft={{base: 0, lg: 10}}>
                <ScaleFade in={!!selectedCategory}
                    key={selectedCategory}
                    initialScale={0.9}
                    unmountOnExit
                >
                    {selectedCategory === "artifact" && <ArtifactForm />}
                    {selectedCategory === "hero" && <HeroForm />}
                    {selectedCategory === "pet" && <PetForm />}
                </ScaleFade>
                {/* <ScaleFade in={selectedCategory === "hero"} >
                    <HeroForm />
                </ScaleFade> */}
            </VStack>
        </Flex>
    )
}

export default AdminDashboard;