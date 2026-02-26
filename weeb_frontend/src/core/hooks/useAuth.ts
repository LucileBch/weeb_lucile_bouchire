// ---------- AUTH HOOK ---------- //
import { useCallback } from "react";
import { api } from "../api/axiosInstance";
import type { UserCreationDto } from "../dtos/user/UserCreationDto";
import type { UserDto } from "../dtos/user/UserDto";
import type { UserLoginDto } from "../dtos/user/UserLoginDto";
import type { UserUpdateDto } from "../dtos/user/UserUpdateDto";

interface LoginResponse {
  user_data: UserDto;
}

interface AuthHook {
  postUser: (url: string, payload: UserCreationDto) => Promise<void>;
  login: (url: string, payload: UserLoginDto) => Promise<LoginResponse>;
  logout: (url: string) => Promise<void>;
  patchUserData: (
    url: string,
    payload: UserUpdateDto,
  ) => Promise<LoginResponse>;
}

export function useAuth(): AuthHook {
  const postUser = useCallback(
    async (url: string, payload: UserCreationDto): Promise<void> => {
      await api.post(url, payload);
    },
    [],
  );

  const login = useCallback(
    async (url: string, payload: UserLoginDto): Promise<LoginResponse> => {
      const response = await api.post(url, payload);
      return response.data;
    },
    [],
  );

  const logout = useCallback(async (url: string): Promise<void> => {
    await api.post(url);
  }, []);

  const patchUserData = useCallback(
    async (url: string, payload: UserUpdateDto): Promise<LoginResponse> => {
      const response = await api.patch(url, payload);
      return response.data;
    },
    [],
  );

  return {
    postUser,
    login,
    logout,
    patchUserData,
  };
}
