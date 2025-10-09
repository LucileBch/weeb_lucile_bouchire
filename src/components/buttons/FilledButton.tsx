import { motion } from "framer-motion";
import type React from "react";

interface IProps {
  label: string;
  onClick(): void;
}

export function FilledButton({
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
      className="text-responsive inline-block cursor-pointer rounded-lg bg-[var(--color-purple-bg)] px-2 py-1 transition-all duration-300 lg:px-3 lg:py-3"
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
}
