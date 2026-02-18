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

export const getUserFromLocalStorage = <T>(key: string): T | undefined => {
  const saved = localStorage.getItem(key);
  if (!saved) return undefined;

  try {
    return JSON.parse(saved) as T;
  } catch (error) {
    console.error(`Erreur de parsing LocalStorage pour la clé ${key}:`, error);
    return undefined;
  }
};

export const addInLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};
