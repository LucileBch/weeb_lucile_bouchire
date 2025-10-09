import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../../pages/(authentication)/LoginPage";
import { SignUpPage } from "../../pages/(authentication)/SignUpPage";
import { AboutPage } from "../../pages/AboutPage";
import { ContactPage } from "../../pages/ContactPage";
import { HomePage } from "../../pages/HomePage";
import { pagesUrl } from "../appConstants";
import { ErrorLayout } from "../layouts/ErrorLayout";
import { MainLayout } from "../layouts/MainLayout";

export const AppRouter = createBrowserRouter([
  {
    path: pagesUrl.HOME_PAGE,
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: pagesUrl.ABOUT_PAGE, element: <AboutPage /> },
      { path: pagesUrl.CONTACT_PAGE, element: <ContactPage /> },
      { path: pagesUrl.SIGN_UP_PAGE, element: <SignUpPage /> },
      { path: pagesUrl.LOGIN_PAGE, element: <LoginPage /> },
    ],
  },
]);
