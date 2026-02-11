// ---------- SUCCESS CONTEXT ---------- //
import React, { useContext, type Dispatch, type SetStateAction } from "react";

export interface SuccessSnackbarStore {
  setSuccessMessage: Dispatch<SetStateAction<string | undefined>>;
  setIsSuccessSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

export const SuccessSnackbarContext = React.createContext<
  SuccessSnackbarStore | undefined
>(undefined);

export const useSuccessSnarckbarContext = () => {
  const context = useContext(SuccessSnackbarContext);

  if (!context) {
    throw new Error(
      "useSuccessSnackbarContext must be used in a successContextProvider",
    );
  }

  return context;
};
