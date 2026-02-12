// ---------- CIRCULAR PROGRESS COMPONENT ---------- //
import type React from "react";

interface Iprops {
  color: string;
}

export function CircularProgress({
  color,
}: Readonly<Iprops>): React.JSX.Element {
  const borderColor =
    color === "white"
      ? "border-[var(--color-white)]"
      : "border-[var(--color-purple-bg)]";

  return (
    <div
      className={`${borderColor} h-6 w-6 animate-spin rounded-full border-2 border-t-transparent`}
      aria-label="Loading..."
    />
  );
}
