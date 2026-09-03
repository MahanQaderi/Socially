import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage";
import NotificationPage from "../pages/NotificationPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "notifications", element: <NotificationPage /> },
      { path: "profile/:username", element: <ProfilePage /> },
      
    ],
  },

  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  { path: "*", element: <NotFoundPage /> },
]);

export default router;