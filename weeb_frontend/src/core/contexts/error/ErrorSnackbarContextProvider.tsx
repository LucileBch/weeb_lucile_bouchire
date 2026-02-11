// ---------- ERROR CONTEXT PROVIDER ---------- //
import React, { useCallback, useMemo, useState } from "react";
import { ErrorSnackBar } from "../../../components/snackbars/ErrorSnackBar";
import {
  ErrorSnackbarContext,
  type ErrorSnackbarStore,
} from "./ErrorSnackbarContext";

export function ErrorSnackbarContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] =
    useState<boolean>(false);

  const handleCloseErrorSnackbar = useCallback(() => {
    setIsErrorSnackbarOpen(false);
    setErrorMessage(undefined);
  }, []);

  const errorSnackbarStore: ErrorSnackbarStore = useMemo(
    () => ({
      setErrorMessage,
      setIsErrorSnackbarOpen,
    }),
    [setErrorMessage, setIsErrorSnackbarOpen],
  );

  return (
    <ErrorSnackbarContext.Provider value={errorSnackbarStore}>
      {children}
      <ErrorSnackBar
        isOpen={isErrorSnackbarOpen}
        message={errorMessage}
        onClose={handleCloseErrorSnackbar}
      />
    </ErrorSnackbarContext.Provider>
  );
}
