// ---------- BLOG PAGE ---------- //
import { useArticleContext } from "../core/contexts/articles/ArticleContext";
// create circular progress
// create Article Card
// create Empty space

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
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-auto w-full max-w-md rounded-lg object-cover"
                />
              )}
              <p>
                {article.author.first_name} {article.author.last_name}
              </p>
            </div>
          );
        })
      ) : (
        <p> Aucun article à afficher</p>
      )}
    </div>
  );
}
