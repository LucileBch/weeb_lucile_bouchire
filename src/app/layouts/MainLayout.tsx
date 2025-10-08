import { Link, Outlet } from "react-router-dom";

export function MainLayout(): React.JSX.Element {
  return (
    <>
      {/* temporary links, header and footer to come */}
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/signin">Nous rejoindre</Link>
        <Link to="/login">Se Connecter</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
