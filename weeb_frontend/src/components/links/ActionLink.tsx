import type React from "react";

interface IProps {
  label: string;
  isActionInProgress: boolean;
  onClick(): void;
}

export function ActionLink({
  label,
  isActionInProgress = false,
  onClick,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isActionInProgress}
      className="link border-none bg-transparent p-0"
    >
      {label}
    </button>
  );
}
