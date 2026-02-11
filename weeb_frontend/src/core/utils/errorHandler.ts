// ---------- ERROR HANDLER ---------- //
import { AxiosError } from "axios";

type DjangoErrorData = Record<string, string[]> | { message?: string };

export const formatServerError = (error: unknown): string => {
  // 1. If not an axios error, JS crash
  if (!(error instanceof AxiosError)) {
    return "Une erreur inattendue est survenue.";
  }

  // 2. No server response
  if (!error.response) {
    return "Le serveur ne répond pas. Vérifiez votre connexion.";
  }

  const { status, data } = error.response;
  const errorData = data as DjangoErrorData;

  // 3. 400 Django Bad Request
  if (status === 400 && typeof errorData === "object") {
    // Django global msg
    if ("message" in errorData && typeof errorData.message === "string") {
      return errorData.message;
    }

    // Django first error from field
    const fieldErrors = Object.values(errorData).flat();
    if (fieldErrors.length > 0) {
      return fieldErrors[0] as string;
    }
  }

  // 4. Error 500 or server
  if (status >= 500) {
    return "Le serveur rencontre un problème technique. Veuillez réessayer plus tard.";
  }

  // 5. fallback
  return "Une erreur inconnue est survenue.";
};
