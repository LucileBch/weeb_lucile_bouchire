// ---------- AXIOS INSTANCE ---------- //
// for future add here :
// auth
// refresh token
// interceptors
import axios from "axios";

console.log("VITE_API_URL check:", import.meta.env.VITE_API_URL);

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
