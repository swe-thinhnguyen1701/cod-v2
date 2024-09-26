import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import HeroesPage from "./pages/HeroesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import HeroDetailPage from "./pages/HeroDetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/heroes",
        element: <HeroesPage />,
      },
      {
        // path: "/heroes/:heroId",
        path: "/heroes/:heroName",
        element: <HeroDetailPage />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
