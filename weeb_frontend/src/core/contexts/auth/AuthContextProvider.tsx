// ---------- AUTH CONTEXT PROVIDER ---------- //
import React, { useCallback, useMemo } from "react";
import { endpoints } from "../../api/endpoints";
import type { UserCreationDto } from "../../dtos/user/UserCreationDto";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext, type AuthStore } from "./AuthContext";

export function AuthContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  // login
  // logout
  // state de connected user (user, setUser && isAuthenticated, setIsAuthenticated)
  // le mettre dans LS ou cookies ?

  const { postUser } = useAuth();

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

  const authStore: AuthStore = useMemo(() => ({ createUser }), [createUser]);

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
}
