import { createBrowserRouter } from "react-router-dom";

// routes //
import { LandingPage } from "./pages/public/LandingPage";
import ProfilePage from "./pages/private/ProfilePage";
import { AboutUsPage } from "./pages/public/AboutUsPage";
import { CalculatePage } from "./pages/private/CalculatePage";

// layout //
import { PublicLayout } from "./components/layout/PublicLayout";
import { PrivateLayout } from "./components/layout/PrivateLayout";

// Error //
import PageNotFound from "./pages/errors/PageNotFound";
import ErrorElementPage from "./pages/errors/ErrorElementPage";
import SignInPage from "./pages/public/_auth/SignInPage";
import SignUpPage from "./pages/public/_auth/SignUpPage";
import HomePage from "./pages/private/HomePage";

const router = createBrowserRouter([
  // public routes //
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorElementPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
    ],
  },

  // private routes //
  {
    path: "/",
    element: <PrivateLayout />,
    errorElement: <ErrorElementPage />,
    children: [
      { path: "/profile", element: <ProfilePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/cal", element: <CalculatePage /> },
    ],
  },

  // Catch-all 404 Route //
  { path: "*", element: <PageNotFound /> },
]);

export default router;
