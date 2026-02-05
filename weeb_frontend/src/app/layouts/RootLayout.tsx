import { Outlet } from "react-router-dom";
import { ErrorSnackbarContextProvider } from "../../core/contexts/ErrorSnackbarContext";
import { SuccessSnackbarContextProvider } from "../../core/contexts/SuccessSnackbarContext";

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
