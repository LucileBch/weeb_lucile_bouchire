import * as Sentry from "@sentry/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./app/router/AppRouter";
import { AuthContextProvider } from "./core/contexts/auth/AuthContextProvider";
import { ErrorSnackbarContextProvider } from "./core/contexts/error/ErrorSnackbarContextProvider";
import { SuccessSnackbarContextProvider } from "./core/contexts/success/SuccessSnackbarContextProvider";
import "./index.css";

// Error tracking in production only (DSN set in Vercel)
if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    // Performance monitoring of page loads and navigations
    integrations: [Sentry.browserTracingIntegration()],
    // 20% of transactions are traced (errors are always captured)
    tracesSampleRate: 0.2,
    // GDPR: no IP address or personal data sent to Sentry
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
    },
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SuccessSnackbarContextProvider>
      <ErrorSnackbarContextProvider>
        <AuthContextProvider>
          <RouterProvider router={AppRouter} />
        </AuthContextProvider>
      </ErrorSnackbarContextProvider>
    </SuccessSnackbarContextProvider>
  </StrictMode>,
);
