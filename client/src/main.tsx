import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from "./theme.ts";
import App from "./App.tsx";
import "./index.css";

import HomePage from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HeroPage from "./pages/HeroPage.tsx";
import HeroDetailPage from "./pages/HeroDetailPage.tsx";
import PetDetailPage from "./pages/PetDetailPage.tsx";
import ArtifactDetailPage from "./pages/ArtifactDetailPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/heroes",
        element: <HeroPage />
      },
      {
        path: "/heroes/:heroName",
        element: <HeroDetailPage />
      },
      {
        path: "/artifacts/:artifactName",
        element: <ArtifactDetailPage />
      },
      {
        path: "pets/:petName",
        element: <PetDetailPage />
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
)
