import type React from "react";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  items: string[];
}

export function FooterList({
  title,
  items,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <div>
      <h4>{title}</h4>
      <ul className="flex flex-col gap-1 py-3 text-[var(--color-midnight)]">
        {items.map((item) => (
          <Link
            to="#"
            key={item}
            className="text-responsive transition-opacity hover:underline hover:opacity-80"
          >
            {item}
          </Link>
        ))}
      </ul>
    </div>
  );
}
