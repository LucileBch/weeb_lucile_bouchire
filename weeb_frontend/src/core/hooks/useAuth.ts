// ---------- AUTH HOOK ---------- //
import { useCallback } from "react";
import { api } from "../api/axiosInstance";
import type { UserCreationDto } from "../dtos/user/UserCreationDto";

interface AuthHook {
  postUser: (url: string, payload: UserCreationDto) => Promise<void>;
}

export function useAuth(): AuthHook {
  const postUser = useCallback(
    async (url: string, payload: UserCreationDto): Promise<void> => {
      await api.post(url, payload);
    },
    [],
  );

  return {
    postUser,
  };
}
