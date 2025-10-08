import { Link } from "react-router-dom";
import { pagesUrl } from "../app/appConstants";
import { motion } from "framer-motion";

import NotFound from "../assets/images/page-not-found.png";

export function ErrorPage(): React.JSX.Element {
  return (
    <div className="container flex flex-col items-center gap-4 py-10 text-center md:gap-8">
      <h1 className="text-[var(--color-purple-text)]">404</h1>

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
          src={NotFound}
          alt="page non trouvée"
          className="w-full max-w-xs rounded-2xl md:max-w-md"
        />
      </motion.div>

      <p>La page que vous chercher semble introuvable...</p>
      <Link
        to={pagesUrl.HOME_PAGE}
        className="link text-responsive text-[var(--color-purple-text)]"
      >
        Retourner à la page d'accueil
      </Link>
    </div>
  );
}
