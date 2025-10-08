import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/Header";

export function MainLayout(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
