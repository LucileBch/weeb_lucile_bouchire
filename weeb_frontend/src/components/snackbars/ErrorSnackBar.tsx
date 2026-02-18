// ---------- ERROR SNACKBAR COMPONENT ---------- //
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect } from "react";

interface IProps {
  isOpen: boolean;
  message?: string;
  duration?: number;
  onClose(): void;
}

export function ErrorSnackBar({
  isOpen,
  message,
  duration = 3000,
  onClose,
}: Readonly<IProps>): React.JSX.Element {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
    return;
  }, [isOpen, onClose, duration]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-50 rounded-lg bg-[var(--color-error-light)] px-6 py-3 text-[var(--color-error)] shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
