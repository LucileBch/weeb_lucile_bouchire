// ---------- DESKTOP NAVBAR COMPONENT ---------- //
import type React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../app/appConstants";
import { useAuthContext } from "../../core/contexts/auth/AuthContext";
import { ActionButton } from "../buttons/ActionButton";
import { NavigationButton } from "../buttons/NavigationButton";
import { NavLink } from "../links/NavLink";

export function DesktopNavBar(): React.JSX.Element {
  const navigate = useNavigate();

  const { isAuthenticated, logoutUser, isLoggingOut } = useAuthContext();

  const handleLogout = useCallback(async () => {
    await logoutUser();
    navigate(pagesUrl.HOME_PAGE);
  }, [logoutUser, navigate]);

  return (
    <div className="ml-4 hidden w-full items-center justify-between lg:flex">
      <nav className="flex items-center gap-6">
        <NavLink label="À propos" path={pagesUrl.ABOUT_PAGE} />
        <NavLink label="Contact" path={pagesUrl.CONTACT_PAGE} />
        <NavLink label="Blog" path={pagesUrl.BLOG_PAGE} />
      </nav>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <NavLink label="Profil" path={pagesUrl.PROFILE_PAGE} />
            <ActionButton
              label="Déconnexion"
              onClick={handleLogout}
              isActionInProgress={isLoggingOut}
            />
          </>
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
