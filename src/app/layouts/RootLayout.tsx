import { Outlet } from "react-router-dom";
import { ErrorSnackbarContextProvider } from "../../core/contexts/ErrorSnackbarContext";
import { SuccessSnackbarContextProvider } from "../../core/contexts/SuccessSnackBarContext";

export function RootLayout(): React.JSX.Element {
  return (
    <>
      <SuccessSnackbarContextProvider>
        <ErrorSnackbarContextProvider>
          <Outlet />
        </ErrorSnackbarContextProvider>
      </SuccessSnackbarContextProvider>
    </>
  );
}
