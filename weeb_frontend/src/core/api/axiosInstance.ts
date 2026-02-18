// ---------- AXIOS INSTANCE ---------- //
import axios from "axios";
import { getCookie } from "../utils/helpers";
import { endpoints } from "./endpoints";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request Interceptor
 * Inject access tokens for request.
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access_token");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

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
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.code === "ECONNABORTED") {
      console.error("La requête a mis trop de temps à répondre.");
      return Promise.reject(
        new Error("Le serveur met trop de temps à répondre."),
      );
    }

    const isAuthRoute =
      originalRequest.url?.includes(endpoints.refreshToken) ||
      originalRequest.url?.includes(endpoints.login);

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

        const newAccessToken = getCookie("access_token");
        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Session expirée, déconnexion en cours...");
        window.dispatchEvent(new Event("force-logout"));
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401 && isAuthRoute) {
      window.dispatchEvent(new Event("force-logout"));
    }

    return Promise.reject(error);
  },
);
