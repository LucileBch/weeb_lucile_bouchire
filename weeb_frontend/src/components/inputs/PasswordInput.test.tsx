import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordInput } from "./PasswordInput";

function renderInput(error?: string) {
  render(
    <PasswordInput
      id="password"
      name="password"
      placeholder="Mot de passe"
      value="Weeb-Test-2026!"
      error={error}
      onChange={() => {}}
    />,
  );
}

describe("PasswordInput", () => {
  it("devrait masquer le mot de passe par défaut", () => {
    renderInput();

    expect(screen.getByPlaceholderText("Mot de passe")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("devrait afficher puis masquer le mot de passe au clic sur l'icône", async () => {
    const user = userEvent.setup();
    renderInput();
    const input = screen.getByPlaceholderText("Mot de passe");
    const toggleButton = screen.getByRole("button");

    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("devrait afficher le message d'erreur reçu en prop", () => {
    renderInput("Le mot de passe est requis");

    expect(screen.getByText("Le mot de passe est requis")).toBeInTheDocument();
  });
});
