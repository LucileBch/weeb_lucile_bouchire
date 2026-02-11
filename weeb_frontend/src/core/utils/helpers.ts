// ---------- HELPERS ---------- //
import type { NavigateFunction } from "react-router-dom";

export const handleNavigation = (navigate: NavigateFunction, path: string) => {
  setTimeout(() => {
    navigate(path);
  }, 2000);
};
