import React, {
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ErrorSnackBar } from "../../components/snackbars/ErrorSnackBar";

export const ErrorSnackbarContext = React.createContext<ErrorSnackbarStore>(
  {} as ErrorSnackbarStore,
);

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

export interface ErrorSnackbarStore {
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
  setIsErrorSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}
