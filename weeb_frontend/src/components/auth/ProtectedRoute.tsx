// ---------- PROTECTED ROUTE COMPONENT ---------- //
import type React from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { pagesUrl } from "../../app/appConstants";
import { useAuthContext } from "../../core/contexts/auth/AuthContext";
import { useErrorSnackbarContext } from "../../core/contexts/error/ErrorSnackbarContext";

export function ProtectedRoute(): React.JSX.Element {
  const location = useLocation();

  const { isAuthenticated } = useAuthContext();
  const { setErrorMessage, setIsErrorSnackbarOpen } = useErrorSnackbarContext();

  useEffect(() => {
    if (!isAuthenticated) {
      setErrorMessage("Vous devez être connecté pour accéder à cette page.");
      setIsErrorSnackbarOpen(true);
    }
  }, [isAuthenticated, setErrorMessage, setIsErrorSnackbarOpen]);

  if (!isAuthenticated) {
    return (
      <Navigate to={pagesUrl.LOGIN_PAGE} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}
