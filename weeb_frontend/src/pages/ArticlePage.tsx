// ---------- ARTICLE PAGE ---------- //
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleTemplate } from "../components/articles/ArticleTemplate";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { useArticleContext } from "../core/contexts/articles/ArticleContext";

export function ArticlePage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { fetchArticleById, selectedArticle, isSelectedArticleLoading } =
    useArticleContext();

  useEffect(() => {
    if (id) {
      fetchArticleById(id);
    }
  }, [id, fetchArticleById]);

  return (
    <div className="flex flex-col items-center gap-4 py-5 text-center md:gap-8">
      {isSelectedArticleLoading ? (
        <LoadingPlaceholder />
      ) : selectedArticle ? (
        <ArticleTemplate article={selectedArticle} />
      ) : (
        <div className="container py-20 text-center">
          <h2>Article introuvable</h2>
          <button
            onClick={() => navigate("/blog")}
            className="basic-button mt-6"
          >
            Retour au blog
          </button>
        </div>
      )}
    </div>
  );
}
