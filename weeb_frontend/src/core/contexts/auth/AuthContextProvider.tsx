// ---------- AUTH CONTEXT PROVIDER ---------- //
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { endpoints } from "../../api/endpoints";
import type { UserCreationDto } from "../../dtos/user/UserCreationDto";
import type { UserDto } from "../../dtos/user/UserDto";
import type { UserLoginDto } from "../../dtos/user/UserLoginDto";
import type { UserUpdateDto } from "../../dtos/user/UserUpdateDto";
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
  const { postUser, login, logout, patchUserData } = useAuth();

  const { setErrorMessage, setIsErrorSnackbarOpen } = useErrorSnackbarContext();
  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();

  const [actualUser, setActualUser] = useState<UserDto | undefined>(() =>
    getUserFromLocalStorage("user"),
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    if (isLoggingOut || !actualUser) return;

    setIsLoggingOut(true);

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
      setIsLoggingOut(false);
    }
  }, [
    actualUser,
    isLoggingOut,
    logout,
    setErrorMessage,
    setIsErrorSnackbarOpen,
    setIsSuccessSnackbarOpen,
    setSuccessMessage,
  ]);

  useEffect(() => {
    const handleForceLogout = () => {
      if (actualUser) {
        logoutUser();
      }
    };
    window.addEventListener("force-logout", handleForceLogout);
    return () => window.removeEventListener("force-logout", handleForceLogout);
  }, [logoutUser, actualUser]);

  const updateUserSessionData = useCallback(
    async (userUpdateDto: UserUpdateDto) => {
      const payload: UserUpdateDto = {
        first_name: userUpdateDto.first_name,
        last_name: userUpdateDto.last_name,
        email: userUpdateDto.email,
      };

      if (
        userUpdateDto.new_password &&
        userUpdateDto.new_password.trim() !== ""
      ) {
        payload.new_password = userUpdateDto.new_password;
        payload.old_password = userUpdateDto.old_password;
      }

      const response = await patchUserData(endpoints.updateUserInfos, payload);
      const updatedFields = response.user_data;

      setActualUser((prevUser) => {
        const updatedUser = prevUser
          ? { ...prevUser, ...updatedFields }
          : updatedFields;

        addInLocalStorage("user", updatedUser);

        return updatedUser;
      });

      return updatedFields;
    },
    [patchUserData],
  );

  console.log("actuel", actualUser);

  const authStore: AuthStore = useMemo(
    () => ({
      createUser,
      loginUser,
      logoutUser,
      updateUserSessionData,
      actualUser,
      isAuthenticated,
      isLoggingOut,
    }),
    [
      createUser,
      loginUser,
      logoutUser,
      updateUserSessionData,
      actualUser,
      isAuthenticated,
      isLoggingOut,
    ],
  );

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
}
