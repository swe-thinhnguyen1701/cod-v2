import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import { Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { useAuthStore } from "./state-management/authStore";
import { useEffect } from "react";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => { checkAuth() }, [checkAuth]);

  return (
    <ApolloProvider client={client}>
      <VStack>
        <NavBar />
        <Box minHeight="100vh" pt="150px" width="100%">
          <Box maxWidth="1500px" mx="auto">
            <Outlet />
          </Box>
        </Box>
        <Footer />
      </VStack>
    </ApolloProvider>
  )
}

export default App
