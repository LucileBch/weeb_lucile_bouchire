// ---------- OUTLINED BUTTON COMPONENT ---------- //
import { motion } from "framer-motion";
import type React from "react";

interface IProps {
  label: string;
  onClick(): void;
  type?: "button" | "submit" | "reset";
}

export function OutlinedButton({
  label,
  onClick,
  type = "button",
}: Readonly<IProps>): React.JSX.Element {
  return (
    <motion.button
      whileHover={{
        opacity: 0.85,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      type={type}
      className="text-responsive inline-block cursor-pointer rounded-lg border-2 border-[var(--color-white)] px-2 py-1 transition-all duration-300 ease-in-out lg:px-3 lg:py-3"
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
}
