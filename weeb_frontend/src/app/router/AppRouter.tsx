// ---------- APP ROUTER ---------- //
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { ArticleCreationPage } from "../../pages/(authenticated)/ArticleCreationPage";
import { ArticleEditPage } from "../../pages/(authenticated)/ArticleEditPage";
import { ForgotPasswordPage } from "../../pages/(authentication)/ForgotPasswordPage";
import { LoginPage } from "../../pages/(authentication)/LoginPage";
import { SignUpPage } from "../../pages/(authentication)/SignUpPage";
import { AboutPage } from "../../pages/AboutPage";
import { ArticlePage } from "../../pages/ArticlePage";
import { BlogPage } from "../../pages/BlogPage";
import { ContactPage } from "../../pages/ContactPage";
import { HomePage } from "../../pages/HomePage";
import { pagesUrl } from "../appConstants";
import { ErrorLayout } from "../layouts/ErrorLayout";
import { MainLayout } from "../layouts/MainLayout";
import { RootLayout } from "../layouts/RootLayout";

export const AppRouter = createBrowserRouter([
  {
    path: pagesUrl.HOME_PAGE,
    element: <RootLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: pagesUrl.HOME_PAGE,
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: pagesUrl.ABOUT_PAGE, element: <AboutPage /> },
          { path: pagesUrl.CONTACT_PAGE, element: <ContactPage /> },
          { path: pagesUrl.BLOG_PAGE, element: <BlogPage /> },
          { path: pagesUrl.ARTICLE_PAGE, element: <ArticlePage /> },
          { path: pagesUrl.SIGN_UP_PAGE, element: <SignUpPage /> },
          { path: pagesUrl.LOGIN_PAGE, element: <LoginPage /> },
          {
            path: pagesUrl.FORGOT_PASSWORD_PAGE,
            element: <ForgotPasswordPage />,
          },

          // --- PROTECTED ROUTES ---
          // TODO:  profile page when connected
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: pagesUrl.ARTICLE_CREATION_PAGE,
                element: <ArticleCreationPage />,
              },
              {
                path: pagesUrl.ARTICLE_EDIT_PAGE,
                element: <ArticleEditPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
