import { useCallback } from "react";
import { homeSliderImages } from "../assets/datas/imagesData";
import LogoArtAvenue from "../assets/icons/logo-art-avenue.svg";
import LogoShells from "../assets/icons/logo-shells.svg";
import LogoSmartFinder from "../assets/icons/logo-smart-finder.svg";
import LogoWaves from "../assets/icons/logo-waves.svg";
import LogoZoomerr from "../assets/icons/logo-zoomerr.svg";
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

      {/* section 2 */}
      <section className="flex flex-col items-center gap-6 py-10 text-center">
        <h2>Ils nous font confiance</h2>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:flex-wrap md:gap-10">
          <img
            src={LogoSmartFinder}
            alt="Smart finder logo"
            className="h-4 w-auto object-contain md:h-6 lg:h-8"
          />
          <img
            src={LogoZoomerr}
            alt="Zoomerr logo"
            className="h-4 w-auto object-contain md:h-6 lg:h-8"
          />
          <img
            src={LogoShells}
            alt="Shells logo"
            className="h-4 w-auto object-contain md:h-6 lg:h-8"
          />
          <img
            src={LogoWaves}
            alt="Waves logo"
            className="h-4 w-auto object-contain md:h-6 lg:h-8"
          />
          <img
            src={LogoArtAvenue}
            alt="Art avenue logo"
            className="h-4 w-auto object-contain md:h-6 lg:h-8"
          />
        </div>
      </section>
    </>
  );
}
