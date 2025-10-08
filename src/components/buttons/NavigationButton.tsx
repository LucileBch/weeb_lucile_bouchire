import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { CircularProgress } from "../CircularProgress";

interface IProps {
  label: string;
  path?: string;
  isLoading?: boolean;
  onClick?(): void;
}

export function NavigationButton({
  label,
  path,
  isLoading,
  onClick,
}: Readonly<IProps>): React.JSX.Element {
  const location = useLocation();
  const isActive = location.pathname === path;

  const button = (
    <button
      onClick={onClick}
      className={`basic-button ${isActive ? "active" : ""}`}
    >
      {isLoading ? (
        <CircularProgress color={isActive ? "white" : "purple"} />
      ) : (
        label
      )}
    </button>
  );

  return <div>{path ? <Link to={path}>{button}</Link> : button}</div>;
}
