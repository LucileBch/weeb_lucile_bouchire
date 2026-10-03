import { resolveUrl } from "./helpers";

describe("resolveUrl", () => {
  it("devrait remplacer un paramètre par sa valeur", () => {
    expect(resolveUrl("/articles/:id", { id: 3 })).toBe("/articles/3");
  });

  it("devrait remplacer plusieurs paramètres", () => {
    expect(
      resolveUrl("/users/:userId/articles/:id", { userId: 7, id: "abc" }),
    ).toBe("/users/7/articles/abc");
  });

  it("devrait laisser l'URL inchangée sans paramètre", () => {
    expect(resolveUrl("/blog", {})).toBe("/blog");
  });
});
