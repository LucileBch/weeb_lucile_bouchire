import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { SigninPage } from "../../pages/(authentication)/SigninPage";
import { LoginPage } from "../../pages/(authentication)/LoginPage";
import { ContactPage } from "../../pages/ContactPage";
import { HomePage } from "../../pages/HomePage";
import { ErrorLayout } from "../layouts/ErrorLayout";
import { pagesUrl } from "../appConstants";
import { AboutPage } from "../../pages/AboutPage";

export const AppRouter = createBrowserRouter([
  {
    path: pagesUrl.HOME_PAGE,
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: pagesUrl.ABOUT_PAGE, element: <AboutPage /> },
      { path: pagesUrl.CONTACT_PAGE, element: <ContactPage /> },
      { path: pagesUrl.SIGN_IN_PAGE, element: <SigninPage /> },
      { path: pagesUrl.LOGIN_PAGE, element: <LoginPage /> },
    ],
  },
]);
