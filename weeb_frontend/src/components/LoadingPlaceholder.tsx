// ---------- LOADING PLACEHOLDER COMPONENT ---------- //
import type React from "react";
import Loading from "../assets/images/loading.webp";

export function LoadingPlaceholder(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-20 text-center">
      <img
        src={Loading}
        alt="pas d'article"
        className="w-full max-w-xs rounded-2xl md:max-w-md"
      />
    </div>
  );
}
