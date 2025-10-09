import { motion } from "framer-motion";
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
    <motion.button
      whileHover={{
        opacity: 0.85,
      }}
      whileTap={{
        opacity: 0.7,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      onClick={onClick}
      className={`basic-button ${isActive ? "active" : ""}`}
    >
      {isLoading ? (
        <CircularProgress color={isActive ? "white" : "purple"} />
      ) : (
        label
      )}
    </motion.button>
  );

  return <div>{path ? <Link to={path}>{button}</Link> : button}</div>;
}
