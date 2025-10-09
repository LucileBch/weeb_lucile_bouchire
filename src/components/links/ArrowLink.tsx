import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";

interface IProps {
  label: string;
  path: string;
}

export function ArrowLink({
  label,
  path,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <motion.div whileHover="hover">
      <Link
        to={path}
        className="group flex items-center gap-2 transition-colors duration-300 hover:text-[var(--color-purple-text)]"
      >
        <span className="text-responsive transition-colors duration-300">
          {label}
        </span>

        <motion.div
          variants={{ hover: { x: 6 } }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        >
          <ArrowRight className="h-4 w-4 transition-colors duration-300 md:h-5 md:w-5" />
        </motion.div>
      </Link>
    </motion.div>
  );
}
