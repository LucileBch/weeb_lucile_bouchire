import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ConfirmationModal } from "./ConfirmationModal";

function renderModal(isOpen = true) {
  const onClose = vi.fn();
  const onConfirm = vi.fn();

  render(
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Supprimer l'article"
      message="Cette action est irréversible."
      isActionInProgress={false}
    />,
  );

  return { onClose, onConfirm };
}

describe("ConfirmationModal", () => {
  it("ne devrait rien afficher quand elle est fermée", () => {
    renderModal(false);

    expect(
      screen.queryByText("Cette action est irréversible."),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("devrait afficher le titre et le message quand elle est ouverte", () => {
    renderModal();

    expect(
      screen.getByRole("heading", { name: "Supprimer l'article" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Cette action est irréversible."),
    ).toBeInTheDocument();
  });

  it("devrait appeler onConfirm uniquement au clic sur Confirmer", async () => {
    const user = userEvent.setup();
    const { onClose, onConfirm } = renderModal();

    await user.click(screen.getByRole("button", { name: "Confirmer" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("devrait appeler onClose sans confirmer au clic sur Annuler", async () => {
    const user = userEvent.setup();
    const { onClose, onConfirm } = renderModal();

    await user.click(screen.getByRole("button", { name: "Annuler" }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
