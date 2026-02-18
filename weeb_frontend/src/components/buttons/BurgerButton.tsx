// ---------- BURGER BUTTON COMPONENT ---------- //
import { Menu, X } from "lucide-react";
import type React from "react";

interface IProps {
  isMenuOpen: boolean;
  handleDisplayMobileMenu(): void;
}

export function BurgerButton({
  isMenuOpen,
  handleDisplayMobileMenu,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-purple-bg)] text-white transition-all duration-200 hover:opacity-90 lg:hidden"
      onClick={handleDisplayMobileMenu}
    >
      {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  );
}
