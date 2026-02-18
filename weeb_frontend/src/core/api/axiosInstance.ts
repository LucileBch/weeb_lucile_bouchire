// ---------- AXIOS INSTANCE ---------- //
import axios from "axios";
import { getCookie } from "../utils/helpers";
import { endpoints } from "./endpoints";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(endpoints.refreshToken, {}, { withCredentials: true });

        const newAccessToken = getCookie("access_token");
        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expiré, redirection login...");
        window.dispatchEvent(new Event("force-logout"));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
