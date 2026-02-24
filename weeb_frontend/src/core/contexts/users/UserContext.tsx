// ---------- USER CONTEXT ---------- //
import React, { useContext } from "react";
import type { UserCodeRequestDto } from "../../dtos/user/UserCodeRequestDto";
import type { UserResetPasswordDto } from "../../dtos/user/UserResetPasswordDto";

export interface UserStore {
  requestResetCode: (userCodeRequestDto: UserCodeRequestDto) => Promise<void>;
  resetPasswordWithCode: (
    userResetPasswordDto: UserResetPasswordDto,
  ) => Promise<void>;
}

export const UserContext = React.createContext<UserStore | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used in a UserContextProvider");
  }

  return context;
};
