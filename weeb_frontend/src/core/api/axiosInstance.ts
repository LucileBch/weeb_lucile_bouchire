// ---------- AXIOS INSTANCE ---------- //
import axios from "axios";
import { endpoints } from "./endpoints";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Request Interceptor
 * No need to inject manually access tokens for request.
 * Send cookies only if user is authenticated
 */
api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem("user");
    const hasUser = savedUser !== null && savedUser !== "undefined";

    config.withCredentials = hasUser;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * Handle token refresh automatically when access token expires (401).
 */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 1. Définir explicitement la route de logout
    const isLogoutRoute = originalRequest.url?.includes(endpoints.logout);
    const isAuthRoute =
      originalRequest.url?.includes(endpoints.refreshToken) ||
      originalRequest.url?.includes(endpoints.login);

    // 2. SI c'est le logout qui pète en 401, on ne fait RIEN.
    // On rejette juste l'erreur pour que le .catch du AuthContext s'exécute.
    if (isLogoutRoute) {
      return Promise.reject(error);
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Le serveur met trop de temps..."));
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}${endpoints.refreshToken}`,
          {},
          { withCredentials: true },
        );
        return api(originalRequest);
      } catch (refreshError) {
        // On ne dispatch que si on a vraiment échoué à rafraîchir
        window.dispatchEvent(new Event("force-logout"));
        return Promise.reject(refreshError);
      }
    }

    // Gestion du 401 sur login/refresh
    if (error.response?.status === 401 && isAuthRoute) {
      window.dispatchEvent(new Event("force-logout"));
    }

    return Promise.reject(error);
  },
);
