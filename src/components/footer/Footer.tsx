import { FooterList } from "./FooterList";
import Facebook from "../../assets/icons/icon-facebook.png";
import Twitter from "../../assets/icons/icon-twitter.png";
import Linkedin from "../../assets/icons/icon-linkedin.png";
import Instagram from "../../assets/icons/icon-instagram.png";
import Youtube from "../../assets/icons/icon-youtube.png";
import { FooterSocialLink } from "./FooterSocialLink";
import { Link } from "react-router-dom";

const socialLinks = [
  { href: "https://facebook.com", src: Facebook, alt: "Facebook" },
  { href: "https://twitter.com", src: Twitter, alt: "Twitter" },
  { href: "https://linkedin.com", src: Linkedin, alt: "Linkedin" },
  { href: "https://instagram.com", src: Instagram, alt: "Instagram" },
  { href: "https://youtube.com", src: Youtube, alt: "Youtube" },
];

export function Footer(): React.JSX.Element {
  return (
    <footer className="bg-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          <Link
            to="/"
            className="text-[16px] font-bold text-[var(--color-midnight)] transition-opacity hover:opacity-80 sm:text-[22px] md:text-[32px]"
          >
            Weeb
          </Link>
          <FooterList
            title="Product"
            items={["Pricing", "Overview", "Browse", "Accessibility", "Five"]}
          />
          <FooterList
            title="Solutions"
            items={["Brainstorming", "Ideation", "Wireframing", "Research"]}
          />
          <FooterList
            title="Resources"
            items={["Help Center", "Blog", "Tutorials"]}
          />
          <FooterList
            title="Company"
            items={["About", "Press", "Events", "Careers"]}
          />
        </div>

        <div className="mt-12 border-t border-[var(--color-grey-light)] pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <p className="text-responsive text-center text-[var(--color-midnight)] md:text-left">
              © 2025 Weeb, Inc. All rights reserved.
            </p>

            <div className="flex gap-4 text-[var(--color-midnight)]">
              {socialLinks.map((socialLink) => (
                <FooterSocialLink key={socialLink.alt} href={socialLink.href}>
                  <img src={socialLink.src} alt={socialLink.alt} />
                </FooterSocialLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
