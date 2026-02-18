// ---------- AUTH CONTEXT PROVIDER ---------- //
import React, { useCallback, useMemo, useState } from "react";
import { endpoints } from "../../api/endpoints";
import type { UserCreationDto } from "../../dtos/user/UserCreationDto";
import type { UserDto } from "../../dtos/user/UserDto";
import type { UserLoginDto } from "../../dtos/user/UserLoginDto";
import { useAuth } from "../../hooks/useAuth";
import { formatServerError } from "../../utils/errorHandler";
import {
  addInLocalStorage,
  getUserFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/helpers";
import { useErrorSnackbarContext } from "../error/ErrorSnackbarContext";
import { useSuccessSnarckbarContext } from "../success/SuccessSnackbarContext";
import { AuthContext, type AuthStore } from "./AuthContext";

export function AuthContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { postUser, login, logout } = useAuth();

  const { setErrorMessage, setIsErrorSnackbarOpen } = useErrorSnackbarContext();
  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();

  const [actualUser, setActualUser] = useState<UserDto | undefined>(() =>
    getUserFromLocalStorage("user"),
  );

  const isAuthenticated = useMemo(() => actualUser !== undefined, [actualUser]);

  const createUser = useCallback(
    async (userCreationDto: UserCreationDto): Promise<void> => {
      const payload = {
        first_name: userCreationDto.first_name,
        last_name: userCreationDto.last_name,
        email: userCreationDto.email,
        password: userCreationDto.password,
      };

      return await postUser(endpoints.signup, payload);
    },
    [postUser],
  );

  const loginUser = useCallback(
    async (userLoginDto: UserLoginDto): Promise<UserDto> => {
      const payload = {
        email: userLoginDto.email,
        password: userLoginDto.password,
      };

      const response = await login(endpoints.login, payload);
      const user = response.user_data;
      setActualUser(user);
      addInLocalStorage("user", user);

      return user;
    },
    [login],
  );

  const logoutUser = useCallback(async () => {
    try {
      await logout(endpoints.logout);

      setSuccessMessage(`Déconnexion réussie.`);
      setIsSuccessSnackbarOpen(true);
    } catch (error) {
      const serverMessage = formatServerError(error);
      setErrorMessage(serverMessage);
      setIsErrorSnackbarOpen(true);
    } finally {
      setActualUser(undefined);
      removeFromLocalStorage("user");
    }
  }, [
    logout,
    setErrorMessage,
    setIsErrorSnackbarOpen,
    setIsSuccessSnackbarOpen,
    setSuccessMessage,
  ]);

  const authStore: AuthStore = useMemo(
    () => ({ createUser, loginUser, logoutUser, actualUser, isAuthenticated }),
    [createUser, loginUser, logoutUser, actualUser, isAuthenticated],
  );

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
}
