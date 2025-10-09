import { useCallback } from "react";
import { homeSliderImages } from "../assets/datas/imagesData";
import { FilledButton } from "../components/buttons/FilledButton";
import { OutlinedButton } from "../components/buttons/OutlinedButton";
import { Slider } from "../components/Slider";

export function HomePage(): React.JSX.Element {
  const handleDiscover = useCallback(() => {
    alert("Découvrez les articles.");
  }, []);

  const handleSubscription = useCallback(() => {
    alert("Abonnement en cours.");
  }, []);

  return (
    <>
      {/* section 1 */}
      <section className="flex flex-col items-center gap-6 py-10 text-center">
        <h1 className="text-center">
          Explorez le{" "}
          <span className="font-light text-[var(--color-purple-text)]">
            Web
          </span>{" "}
          sous toutes ses{" "}
          <span className="underline decoration-[var(--color-purple-text)] underline-offset-8">
            facettes
          </span>
        </h1>
        <p className="max-w-3xl">
          Le monde du web évolue constamment, et nous sommes là pour vous guider
          à travers ses tendances, technologies et meilleures pratiques. Que
          vous soyez développeur, designer ou passionné du digital, notre blog
          vous offre du contenu de qualité pour rester à la pointe.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <FilledButton
            label="Découvrir les articles"
            onClick={handleDiscover}
          />
          <OutlinedButton
            label="S'abonner à la newletter"
            onClick={handleSubscription}
          />
        </div>

        <Slider images={homeSliderImages} />
      </section>
    </>
  );
}
