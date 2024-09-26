import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { Outlet } from "react-router-dom";
import { HeroProvider } from "./context/HeroContext";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
      <NavBar />
      <HeroProvider>
        <Outlet />
      </HeroProvider>
      <Footer />
    </ApolloProvider>

  )
}

export default App
