import { validatePassword } from "./validationRules";

describe("validatePassword", () => {
  it("devrait accepter un mot de passe respectant toutes les règles", () => {
    expect(validatePassword("Weeb-Test-2026!")).toBeUndefined();
  });

  it.each([
    ["", "Le mot de passe est requis"],
    ["Ab1!", "au moins 8 caractères"],
    ["Weeb-Test-2026!-Too-Long", "ne doit pas dépasser 20 caractères"],
    ["weeb-test-2026!", "une majuscule"],
    ["WEEB-TEST-2026!", "une minuscule"],
    ["Weeb-Test-Pass!", "un chiffre"],
    ["WeebTest2026", "un caractère spécial"],
    ["Weeb Test-2026!", "d'espaces"],
  ])('devrait refuser "%s" avec le message "%s"', (password, expectedMessage) => {
    expect(validatePassword(password)).toContain(expectedMessage);
  });
});
