import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { SigninPage } from "../../pages/(authentication)/SigninPage";
import { LoginPage } from "../../pages/(authentication)/LoginPage";
import { ContactPage } from "../../pages/ContactPage";
import { HomePage } from "../../pages/HomePage";
import { ErrorPage } from "../../pages/ErrorPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "signin", element: <SigninPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);
