import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./app/router/AppRouter";
import { AuthContextProvider } from "./core/contexts/auth/AuthContextProvider";
import { ErrorSnackbarContextProvider } from "./core/contexts/error/ErrorSnackbarContextProvider";
import { SuccessSnackbarContextProvider } from "./core/contexts/success/SuccessSnackbarContextProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SuccessSnackbarContextProvider>
      <ErrorSnackbarContextProvider>
        <AuthContextProvider>
          <RouterProvider router={AppRouter} />{" "}
        </AuthContextProvider>
      </ErrorSnackbarContextProvider>
    </SuccessSnackbarContextProvider>
  </StrictMode>,
);
