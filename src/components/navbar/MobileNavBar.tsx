import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { pagesUrl } from "../../app/appConstants";
import { NavLink } from "../links/NavLink";

interface IProps {
  isMenuOpen: boolean;
  onClose(): void;
}

export function MobileNavBar({
  isMenuOpen,
  onClose,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="overflow-hidden lg:hidden"
        >
          <div className="mt-2 flex flex-col items-center gap-4 rounded-[16px] border-2 border-[var(--color-midnight)] bg-[rgba(15,23,42,0.75)] p-4">
            <NavLink
              label="À propos"
              path={pagesUrl.ABOUT_PAGE}
              onClick={onClose}
            />
            <NavLink
              label="Contact"
              path={pagesUrl.CONTACT_PAGE}
              onClick={onClose}
            />
            <NavLink
              label="Connexion"
              path={pagesUrl.LOGIN_PAGE}
              onClick={onClose}
            />
            <NavLink
              label="Inscription"
              path={pagesUrl.SIGN_UP_PAGE}
              onClick={onClose}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
