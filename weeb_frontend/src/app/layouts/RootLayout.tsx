// ---------- ROOT LAYOUT ---------- //
import { Outlet } from "react-router-dom";
import { ErrorSnackbarContextProvider } from "../../core/contexts/error/ErrorSnackbarContextProvider";
import { ReviewContextProvider } from "../../core/contexts/reviews/ReviewContextProvider";
import { SuccessSnackbarContextProvider } from "../../core/contexts/success/SuccessSnackbarContextProvider";

export function RootLayout(): React.JSX.Element {
  return (
    <>
      <SuccessSnackbarContextProvider>
        <ErrorSnackbarContextProvider>
          <ReviewContextProvider>
            <Outlet />
          </ReviewContextProvider>
        </ErrorSnackbarContextProvider>
      </SuccessSnackbarContextProvider>
    </>
  );
}
