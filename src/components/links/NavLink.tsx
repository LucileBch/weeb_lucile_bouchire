import type React from "react";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  label: string;
  path: string;
  onClick?(): void;
}

export function NavLink({
  label,
  path,
  onClick,
}: Readonly<IProps>): React.JSX.Element {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`link ${isActive ? "active" : ""}`}
    >
      {label}
    </Link>
  );
}
