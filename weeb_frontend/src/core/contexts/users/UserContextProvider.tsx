// ---------- USER CONTEXT PROVIDER ---------- //
import { useCallback, useMemo, type PropsWithChildren } from "react";
import { endpoints } from "../../api/endpoints";

import type { UserCodeRequestDto } from "../../dtos/user/UserCodeRequestDto";
import type { UserResetPasswordDto } from "../../dtos/user/UserResetPasswordDto";
import { useUser } from "../../hooks/useUser";
import { UserContext } from "./UserContext";

export function UserContextProvider({ children }: Readonly<PropsWithChildren>) {
  const { getResetCode, postNewPassword } = useUser();

  const requestResetCode = useCallback(
    async (userCodeRequestDto: UserCodeRequestDto): Promise<void> => {
      const payload = {
        email: userCodeRequestDto.email,
      };

      return await getResetCode(endpoints.passwordResetRequest, payload);
    },
    [getResetCode],
  );

  const resetPasswordWithCode = useCallback(
    async (userResetPasswordDto: UserResetPasswordDto): Promise<void> => {
      const payload = {
        email: userResetPasswordDto.email,
        activationCode: userResetPasswordDto.activationCode,
        password: userResetPasswordDto.password,
      };

      return await postNewPassword(endpoints.passwordResetConfirm, payload);
    },
    [postNewPassword],
  );

  // TODO: when reset user profile info, do not forget to update actual user in auth context

  const userStore = useMemo(
    () => ({ requestResetCode, resetPasswordWithCode }),
    [requestResetCode, resetPasswordWithCode],
  );

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
}
