import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/Header";
import { ErrorPage } from "../../pages/ErrorPage";

export function ErrorLayout(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
        <ErrorPage />
      </main>
      <Footer />
    </>
  );
}
