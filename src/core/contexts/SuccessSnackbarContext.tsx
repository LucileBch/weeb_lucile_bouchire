import React, {
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { SuccessSnackBar } from "../../components/snackbars/SuccessSnackBar";

export const SuccessSnackbarContext = React.createContext<SuccessSnackbarStore>(
  {} as SuccessSnackbarStore,
);

export function SuccessSnackbarContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] =
    useState<boolean>(false);

  const handleCloseSuccessSnackbar = useCallback(() => {
    setIsSuccessSnackbarOpen(false);
    setSuccessMessage(undefined);
  }, []);

  const successSnackbarStore: SuccessSnackbarStore = useMemo(
    () => ({
      setSuccessMessage,
      setIsSuccessSnackbarOpen,
    }),
    [setSuccessMessage, setIsSuccessSnackbarOpen],
  );

  return (
    <SuccessSnackbarContext.Provider value={successSnackbarStore}>
      {children}
      <SuccessSnackBar
        isOpen={isSuccessSnackbarOpen}
        message={successMessage}
        onClose={handleCloseSuccessSnackbar}
      />
    </SuccessSnackbarContext.Provider>
  );
}

export interface SuccessSnackbarStore {
  setSuccessMessage: Dispatch<SetStateAction<string | undefined>>;
  setIsSuccessSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}
