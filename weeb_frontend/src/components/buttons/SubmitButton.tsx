// ---------- SUBMIT BUTTON COMPONENT ---------- //
import { motion } from "framer-motion";
import type React from "react";
import { CircularProgress } from "../CircularProgress";

interface IProps {
  label: string;
  isSubmitting: boolean;
}

export function SubmitButton({
  label,
  isSubmitting,
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
      className={`text-responsive inline-flex items-center justify-center rounded-lg px-4 py-2 transition-all duration-300 lg:px-6 lg:py-3 ${
        isSubmitting
          ? "cursor-default bg-[var(--color-purple-bg)]"
          : "cursor-pointer bg-[var(--color-purple-bg)]"
      }`}
      disabled={isSubmitting}
    >
      {isSubmitting ? <CircularProgress color="white" /> : label}
    </motion.button>
  );
}
