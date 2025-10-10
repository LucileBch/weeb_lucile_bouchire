import type React from "react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { pagesUrl } from "../app/appConstants";
import { BurgerButton } from "./buttons/BurgerButton";
import { DesktopNavBar } from "./navbar/DesktopNavBar";
import { MobileNavBar } from "./navbar/MobileNavBar";

export function Header(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleDisplayMobileMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="container flex w-full items-center justify-between rounded-[16px] bg-current/9 p-3 backdrop-blur-xl md:rounded-[20px] md:p-4">
        <Link
          to={pagesUrl.HOME_PAGE}
          className="text-[16px] font-bold transition-opacity hover:opacity-80 sm:text-[22px] md:text-[32px]"
        >
          Weeb
        </Link>

        {/* Desktop menu*/}
        <DesktopNavBar />

        {/* Tablet/Mobile menu */}
        <BurgerButton
          isMenuOpen={isMenuOpen}
          handleDisplayMobileMenu={handleDisplayMobileMenu}
        />
      </div>

      <MobileNavBar isMenuOpen={isMenuOpen} onClose={handleCloseMobileMenu} />
    </header>
  );
}
