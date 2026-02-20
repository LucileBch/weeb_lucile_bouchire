// ---------- BLOG PAGE ---------- //
import { pagesUrl } from "../app/appConstants";
import { ArticleCard } from "../components/articles/ArticleCard";
import { EmptyArticlePlaceholder } from "../components/articles/EmptyArticlePlaceholder";
import { NavigationButton } from "../components/buttons/NavigationButton";
import { CircularProgress } from "../components/CircularProgress";
import { useArticleContext } from "../core/contexts/articles/ArticleContext";
import { useAuthContext } from "../core/contexts/auth/AuthContext";

export function BlogPage(): React.JSX.Element {
  const { isArticleListLoading, articleList } = useArticleContext();
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex flex-col gap-8 py-10">
      <div className="flex items-center justify-between border-b border-[var(--color-purple-text)]/10 pb-6">
        <h1 className="text-[var(--color-purple-text)]">Articles</h1>
        {isAuthenticated && (
          <NavigationButton
            label="Ajouter un article"
            path={pagesUrl.ARTICLE_CREATION_PAGE}
          />
        )}
      </div>
      {isArticleListLoading ? (
        <CircularProgress color={"purple"} />
      ) : articleList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {articleList.map((article) => {
            return <ArticleCard key={article.id} article={article} />;
          })}
        </div>
      ) : (
        <EmptyArticlePlaceholder />
      )}
    </div>
  );
}
