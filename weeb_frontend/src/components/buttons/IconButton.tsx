// ---------- ICON BUTTON COMPONENT ---------- //
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import type React from "react";

interface IProps {
  icon: LucideIcon;
  onClick(): void;
  title?: string;
  size?: number;
}

export function IconButton({
  icon: Icon,
  onClick,
  title,
  size = 18,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <motion.button
      type="button"
      whileHover={{
        color: "var(--color-purple-text)",
      }}
      onClick={onClick}
      title={title}
      className={`flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors`}
    >
      <Icon size={size} />
    </motion.button>
  );
}
