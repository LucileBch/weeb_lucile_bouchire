import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ArticleDto } from "../../core/dtos/articles/ArticleDto";
import { ArticleCard } from "./ArticleCard";

const mockArticle: ArticleDto = {
  id: 1,
  title: "Découvrir React",
  content: "Un premier article sur React.",
  image: "https://res.cloudinary.com/demo/image/upload/react.webp",
  created_at: "2026-10-01T10:00:00Z",
  updated_at: "2026-10-01T10:00:00Z",
  author: { id: 1, first_name: "Alice", last_name: "Martin" },
};

// ArticleCard uses useNavigate: it must be rendered inside a router
function renderCard(article: ArticleDto) {
  render(
    <MemoryRouter initialEntries={["/blog"]}>
      <Routes>
        <Route path="/blog" element={<ArticleCard article={article} />} />
        <Route path="/articles/:id" element={<p>Page de l'article</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ArticleCard", () => {
  it("devrait afficher le titre, le contenu et l'auteur de l'article", () => {
    renderCard(mockArticle);

    expect(
      screen.getByRole("heading", { name: "Découvrir React" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Un premier article sur React."),
    ).toBeInTheDocument();
    expect(screen.getByText("Alice Martin")).toBeInTheDocument();
  });

  it("devrait afficher l'image de l'article", () => {
    renderCard(mockArticle);

    expect(screen.getByRole("img", { name: "Découvrir React" })).toHaveAttribute(
      "src",
      mockArticle.image,
    );
  });

  it("devrait afficher l'image de remplacement si l'article n'a pas d'image", () => {
    renderCard({ ...mockArticle, image: null });

    expect(screen.getByRole("img", { name: "Découvrir React" })).toHaveAttribute(
      "src",
      expect.stringContaining("no-image-placeholder"),
    );
  });

  it("devrait ouvrir la page de l'article au clic", async () => {
    const user = userEvent.setup();
    renderCard(mockArticle);

    await user.click(screen.getByRole("article"));

    expect(await screen.findByText("Page de l'article")).toBeInTheDocument();
  });
});
