// ---------- ACTION BUTTON COMPONENT ---------- //
import { motion } from "framer-motion";
import type React from "react";
import { CircularProgress } from "../CircularProgress";

interface IProps {
  label: string;
  isActionInProgress: boolean;
  onClick(): void;
}

export function ActionButton({
  label,
  isActionInProgress = false,
  onClick,
}: Readonly<IProps>): React.JSX.Element {
  return (
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
      disabled={isActionInProgress}
      type="button"
      className={`basic-button ${isActionInProgress ? "cursor-default opacity-70" : ""}`}
    >
      {isActionInProgress ? <CircularProgress color="purple" /> : label}
    </motion.button>
  );
}
