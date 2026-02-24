// ---------- USER HOOK ---------- //
import { useCallback } from "react";
import { api } from "../api/axiosInstance";
import type { UserCodeRequestDto } from "../dtos/user/UserCodeRequestDto";
import type { UserResetPasswordDto } from "../dtos/user/UserResetPasswordDto";

interface UserHook {
  getResetCode: (url: string, payload: UserCodeRequestDto) => Promise<void>;
  postNewPassword: (
    url: string,
    payload: UserResetPasswordDto,
  ) => Promise<void>;
}

export function useUser(): UserHook {
  const getResetCode = useCallback(
    async (url: string, payload: UserCodeRequestDto): Promise<void> => {
      await api.post(url, payload);
    },
    [],
  );

  const postNewPassword = useCallback(
    async (url: string, payload: UserResetPasswordDto): Promise<void> => {
      await api.post(url, payload);
    },
    [],
  );

  return {
    getResetCode,
    postNewPassword,
  };
}
