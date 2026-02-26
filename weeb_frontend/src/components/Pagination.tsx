// ---------- PAGINATION COMPONENT ---------- //
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

interface IProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <div className="mt-10 flex items-center justify-center gap-6 border-t border-[var(--color-purple-text)]/10 pt-8">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1 text-sm font-medium transition-all hover:text-[var(--color-purple-text)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={16} /> Précédent
      </button>

      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-purple-text)] text-white shadow-sm">
          {currentPage}
        </span>
        <span className="text-gray-400">sur</span>
        <span>{totalPages}</span>
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 text-sm font-medium transition-all hover:text-[var(--color-purple-text)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        Suivant <ChevronRight size={16} />
      </button>
    </div>
  );
}
