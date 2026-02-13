import type React from "react";
import { pagesUrl } from "../../app/appConstants";
import { useAuthContext } from "../../core/contexts/auth/AuthContext";
import { NavigationButton } from "../buttons/NavigationButton";
import { NavLink } from "../links/NavLink";

export function DesktopNavBar(): React.JSX.Element {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="ml-4 hidden w-full items-center justify-between lg:flex">
      <nav className="flex items-center gap-6">
        <NavLink label="À propos" path={pagesUrl.ABOUT_PAGE} />
        <NavLink label="Contact" path={pagesUrl.CONTACT_PAGE} />
        <NavLink label="Blog" path={pagesUrl.BLOG_PAGE} />
      </nav>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          // TODO: temporary => should be ACTION BUTTON. Will be implemented with LOGOUT endpoint
          <NavigationButton label="Déconnexion" path={pagesUrl.LOGIN_PAGE} />
        ) : (
          <>
            <NavigationButton label="Connexion" path={pagesUrl.LOGIN_PAGE} />
            <NavigationButton
              label="Inscription"
              path={pagesUrl.SIGN_UP_PAGE}
            />
          </>
        )}
      </div>
    </div>
  );
}
