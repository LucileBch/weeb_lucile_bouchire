// ---------- ROOT LAYOUT ---------- //
import { Outlet } from "react-router-dom";
import { ArticleContextProvider } from "../../core/contexts/articles/ArticleContextProvider";
import { ReviewContextProvider } from "../../core/contexts/review/ReviewContextProvider";

export function RootLayout(): React.JSX.Element {
  return (
    <>
      <ReviewContextProvider>
        <ArticleContextProvider>
          <Outlet />
        </ArticleContextProvider>
      </ReviewContextProvider>
    </>
  );
}
