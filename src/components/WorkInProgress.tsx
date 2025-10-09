import type React from "react";
import WIP from "../assets/images/work-in-progress.png";
import { Link } from "react-router-dom";
import { pagesUrl } from "../app/appConstants";
import { motion } from "framer-motion";

export function WorkInProgress(): React.JSX.Element {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{
          duration: 1.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="overflow-hidden rounded-2xl [transform-style:preserve-3d]"
      >
        <img
          src={WIP}
          alt="travail en cours..."
          className="w-full max-w-xs rounded-2xl md:max-w-md"
        />
      </motion.div>
      <p>La page que vous cherchez sera bientôt disponible...</p>
      <Link
        to={pagesUrl.HOME_PAGE}
        className="link text-responsive text-[var(--color-purple-text)]"
      >
        Retourner à la page d'accueil
      </Link>
    </>
  );
}
