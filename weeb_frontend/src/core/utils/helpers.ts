// ---------- HELPERS ---------- //
import type { NavigateFunction } from "react-router-dom";

export const handleNavigation = (navigate: NavigateFunction, path: string) => {
  setTimeout(() => {
    navigate(path);
  }, 2000);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
