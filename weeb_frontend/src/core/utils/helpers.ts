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

export const resolveUrl = (
  url: string,
  params: Record<string, string | number>,
): string => {
  let resolvedUrl = url;

  Object.entries(params).forEach(([key, value]) => {
    resolvedUrl = resolvedUrl.replace(`:${key}`, value.toString());
  });

  return resolvedUrl;
};
