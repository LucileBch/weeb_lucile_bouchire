import type React from "react";

interface IProps {
  href: string;
  children: React.ReactNode;
}

export function FooterSocialLink({
  href,
  children,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-5 w-5 cursor-pointer transition hover:opacity-70"
    >
      {children}
    </a>
  );
}
