// ---------- ERROR CONTEXT ---------- //
import React, { useContext, type Dispatch, type SetStateAction } from "react";

export interface ErrorSnackbarStore {
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
  setIsErrorSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

export const ErrorSnackbarContext = React.createContext<
  ErrorSnackbarStore | undefined
>(undefined);

export const useErrorSnackbarContext = () => {
  const context = useContext(ErrorSnackbarContext);

  if (!context) {
    throw new Error(
      "useErrorSnackbarContext must be used in a errorContextProvider",
    );
  }

  return context;
};
