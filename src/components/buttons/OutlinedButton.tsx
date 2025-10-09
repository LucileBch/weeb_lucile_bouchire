import { motion } from "framer-motion";
import type React from "react";

interface IProps {
  label: string;
  onClick(): void;
}

export function OutlinedButton({
  label,
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
      className="text-responsive inline-block cursor-pointer rounded-lg border-2 border-[var(--color-white)] px-2 py-1 transition-all duration-300 ease-in-out lg:px-3 lg:py-3"
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
}
