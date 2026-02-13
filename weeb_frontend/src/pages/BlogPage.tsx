// ---------- BLOG PAGE ---------- //
import { ArticleCard } from "../components/articles/ArticleCard";
import { EmptyArticlePlaceholder } from "../components/articles/EmptyArticlePlaceholder";
import { CircularProgress } from "../components/CircularProgress";
import { useArticleContext } from "../core/contexts/articles/ArticleContext";
import { useAuthContext } from "../core/contexts/auth/AuthContext";

export function BlogPage(): React.JSX.Element {
  const { isArticleListLoading, articleList } = useArticleContext();
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center md:gap-8">
      <h1 className="text-[var(--color-purple-text)]">Articles</h1>

      {isArticleListLoading ? (
        <CircularProgress color={"purple"} />
      ) : articleList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {articleList.map((article) => {
            return <ArticleCard key={article.id} article={article} />;
          })}

          {/* TODO: ajouter bouton ici if authenticated + renvoie page création article */}
          {isAuthenticated && <p>ajouter un article</p>}
        </div>
      ) : (
        <EmptyArticlePlaceholder />
      )}
    </div>
  );
}
