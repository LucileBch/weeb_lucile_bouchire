// ---------- BLOG PAGE ---------- //
import { useArticleContext } from "../core/contexts/articles/ArticleContext";

export function BlogPage(): React.JSX.Element {
  const { isArticleListLoading, articleList } = useArticleContext();

  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center md:gap-8">
      <h1 className="text-[var(--color-purple-text)]">Articles</h1>

      {isArticleListLoading ? (
        <p>chargement...</p>
      ) : articleList.length > 0 ? (
        articleList.map((article) => {
          return (
            <div key={article.id}>
              <p>{article.title}</p>
              <p>{article.author}</p>
            </div>
          );
        })
      ) : (
        <p> Aucun article à afficher</p>
      )}
    </div>
  );
}
