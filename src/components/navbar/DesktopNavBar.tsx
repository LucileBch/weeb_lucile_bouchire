import type React from "react";
import { NavigationButton } from "../buttons/NavigationButton";
import { NavLink } from "../links/NavLink";
import { pagesUrl } from "../../app/appConstants";

export function DesktopNavBar(): React.JSX.Element {
  return (
    <div className="ml-4 hidden w-full items-center justify-between lg:flex">
      <nav className="flex items-center gap-6">
        <NavLink label="À propos" path={pagesUrl.ABOUT_PAGE} />
        <NavLink label="Contact" path={pagesUrl.CONTACT_PAGE} />
      </nav>

      <div className="flex items-center gap-3">
        <NavigationButton label="Connexion" path={pagesUrl.LOGIN_PAGE} />
        <NavigationButton label="Inscription" path={pagesUrl.SIGN_IN_PAGE} />
      </div>
    </div>
  );
}
