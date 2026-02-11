// ---------- AUTH CONTEXT ---------- //
import React, { useContext } from "react";
import type { UserCreationDto } from "../../dtos/user/UserCreationDto";

export interface AuthStore {
  createUser(userCreationDto: UserCreationDto): Promise<void>;
}

export const AuthContext = React.createContext<AuthStore | undefined>(
  undefined,
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used in a authContextProvider");
  }

  return context;
};
