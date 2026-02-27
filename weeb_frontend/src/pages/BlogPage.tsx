// ---------- BLOG PAGE ---------- //
import { Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { pagesUrl } from "../app/appConstants";
import { ArticleCard } from "../components/articles/ArticleCard";
import { EmptyArticlePlaceholder } from "../components/articles/EmptyArticlePlaceholder";
import { IconButton } from "../components/buttons/IconButton";
import { NavigationButton } from "../components/buttons/NavigationButton";
import { TextInput } from "../components/inputs/TextInput";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { Pagination } from "../components/Pagination";
import { useArticleContext } from "../core/contexts/articles/ArticleContext";
import { useAuthContext } from "../core/contexts/auth/AuthContext";

export function BlogPage(): React.JSX.Element {
  const {
    isArticleListLoading,
    articleList,
    totalArticles,
    currentPage,
    fetchArticleList,
  } = useArticleContext();
  const { isAuthenticated } = useAuthContext();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleChangeFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);

      if (value === "") {
        fetchArticleList(1, "");
      }
    },
    [fetchArticleList],
  );

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      fetchArticleList(1, searchQuery);
    },
    [fetchArticleList, searchQuery],
  );

  const PAGE_SIZE = 12;
  const totalPages = useMemo(
    () => Math.ceil(totalArticles / PAGE_SIZE),
    [totalArticles],
  );

  const handlePreviousPage = useCallback(() => {
    fetchArticleList(currentPage - 1, searchQuery);
  }, [currentPage, fetchArticleList, searchQuery]);

  const handleNextPage = useCallback(() => {
    fetchArticleList(currentPage + 1, searchQuery);
  }, [currentPage, fetchArticleList, searchQuery]);

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

      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-sm items-center gap-2 self-end"
      >
        <TextInput
          id="searchQuery"
          name="searchQuery"
          placeholder="Rechercher par titre..."
          value={searchQuery}
          onChange={handleChangeFilter}
        />
        <IconButton
          icon={Search}
          onClick={handleSearch}
          title="Rechercher"
          size={22}
        />
      </form>

      {isArticleListLoading ? (
        <LoadingPlaceholder />
      ) : articleList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {articleList.map((article) => {
              return <ArticleCard key={article.id} article={article} />;
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </>
      ) : (
        <EmptyArticlePlaceholder />
      )}
    </div>
  );
}
