import { motion } from "framer-motion";
import { useCallback } from "react";
import { homeSliderImages } from "../assets/datas/imagesData";
import LogoArtAvenue from "../assets/icons/logo-art-avenue.svg";
import LogoShells from "../assets/icons/logo-shells.svg";
import LogoSmartFinder from "../assets/icons/logo-smart-finder.svg";
import LogoWaves from "../assets/icons/logo-waves.svg";
import LogoZoomerr from "../assets/icons/logo-zoomerr.svg";
import Help from "../assets/images/help.png";
import { FilledButton } from "../components/buttons/FilledButton";
import { OutlinedButton } from "../components/buttons/OutlinedButton";
import { ArrowLink } from "../components/links/ArrowLink";
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

      {/* section 3 */}
      <section className="flex flex-col items-center py-10 md:flex-row md:gap-6">
        <div className="flex flex-col items-center gap-6 py-10 text-center md:items-start md:text-start">
          <h3>Des ressources pour tous les niveaux</h3>
          <h2>
            <span className="text-[var(--color-purple-text)]">Apprenez</span> et{" "}
            <span className="text-[var(--color-purple-text)]">progressez</span>
          </h2>
          <p>
            Que vous débutiez en développement web ou que vous soyez un expert
            cherchant à approfondir vos connaissances, nous vous proposons des
            tutoriels, guides et bonnes pratiques pour apprendre efficacement.
          </p>
          <ArrowLink label="Explorez les ressources" path="#" />
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <img src={Help} alt="image" className="block w-full rounded-2xl" />

          <motion.div
            initial={{ scaleX: 1, opacity: 1 }}
            whileInView={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.35 }}
            style={{ transformOrigin: "center" }}
            className="absolute inset-0 bg-[var(--color-midnight)]"
          />
        </div>
      </section>
    </>
  );
}
