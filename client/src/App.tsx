import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client"
import { Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {

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
