// ---------- AXIOS INSTANCE ---------- //
// for future add here :
// auth
// refresh token
// interceptors
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
