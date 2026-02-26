// ---------- ROOT LAYOUT ---------- //
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../../components/ScrollToTop";
import { ArticleContextProvider } from "../../core/contexts/articles/ArticleContextProvider";
import { ReviewContextProvider } from "../../core/contexts/review/ReviewContextProvider";
import { UserContextProvider } from "../../core/contexts/users/UserContextProvider";

export function RootLayout(): React.JSX.Element {
  return (
    <>
      <ScrollToTop />

      <UserContextProvider>
        <ReviewContextProvider>
          <ArticleContextProvider>
            <Outlet />
          </ArticleContextProvider>
        </ReviewContextProvider>
      </UserContextProvider>
    </>
  );
}
