// ---------- ROOT LAYOUT ---------- //
import { Outlet } from "react-router-dom";
import { ArticleContextProvider } from "../../core/contexts/articles/ArticleContextProvider";
import { AuthContextProvider } from "../../core/contexts/auth/AuthContextProvider";
import { ErrorSnackbarContextProvider } from "../../core/contexts/error/ErrorSnackbarContextProvider";
import { ReviewContextProvider } from "../../core/contexts/review/ReviewContextProvider";
import { SuccessSnackbarContextProvider } from "../../core/contexts/success/SuccessSnackbarContextProvider";

export function RootLayout(): React.JSX.Element {
  return (
    <>
      <AuthContextProvider>
        <SuccessSnackbarContextProvider>
          <ErrorSnackbarContextProvider>
            <ReviewContextProvider>
              <ArticleContextProvider>
                <Outlet />
              </ArticleContextProvider>
            </ReviewContextProvider>
          </ErrorSnackbarContextProvider>
        </SuccessSnackbarContextProvider>
      </AuthContextProvider>
    </>
  );
}
