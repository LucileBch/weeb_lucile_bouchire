// ---------- AUTH CONTEXT ---------- //
import React, { useContext } from "react";
import type { UserCreationDto } from "../../dtos/user/UserCreationDto";
import type { UserDto } from "../../dtos/user/UserDto";
import type { UserLoginDto } from "../../dtos/user/UserLoginDto";

export interface AuthStore {
  actualUser: UserDto | undefined;
  isAuthenticated: boolean;

  createUser(userCreationDto: UserCreationDto): Promise<void>;
  loginUser(userLoginDto: UserLoginDto): Promise<UserDto>;
  logoutUser(): Promise<void>;
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
