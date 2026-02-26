// ---------- CONFIRMATION MODAL COMPONENT ---------- //
import { AlertTriangle } from "lucide-react";
import type React from "react";
import { ActionButton } from "../buttons/ActionButton";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  isActionInProgress: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isActionInProgress = false,
}: Readonly<IProps>): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="bg-midnight/80 absolute inset-0 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/50">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <AlertTriangle size={32} strokeWidth={2} />
          </div>

          {title && <h3 className="mb-2 font-bold text-white">{title}</h3>}
          <p className="text-grey-light text-sm leading-relaxed">{message}</p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="w-full sm:w-auto">
              <ActionButton label="Annuler" onClick={onClose} />
            </div>
            <div className="w-full sm:w-auto">
              <ActionButton
                label="Confirmer"
                isActionInProgress={isActionInProgress}
                onClick={onConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
