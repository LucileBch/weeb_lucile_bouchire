// ---------- REVIEW CONTEXT PROVIDER ---------- //
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { endpoints } from "../../api/endpoints";

import type { ArticleDto } from "../../dtos/ArticleDto";
import { useArticle } from "../../hooks/useArticle";
import { ArticleContext } from "./ArticleContext";

export function ArticleContextProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const { getAllArticles } = useArticle();

  const [articleList, setArticleList] = useState<ArticleDto[]>([]);
  const [isArticleListLoading, setIsArticleListLoading] =
    useState<boolean>(true);

  const fetchArticleList = useCallback(async (): Promise<void> => {
    try {
      //   setIsArticleListLoading(true); // Début du chargement
      const response = await getAllArticles(endpoints.getArticles);
      setArticleList(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles", error);
    } finally {
      setIsArticleListLoading(false);
    }
  }, [getAllArticles]);

  useEffect(() => {
    fetchArticleList();
  }, [fetchArticleList]);

  const articleStore = useMemo(
    () => ({ articleList, isArticleListLoading }),
    [articleList, isArticleListLoading],
  );

  return (
    <ArticleContext.Provider value={articleStore}>
      {children}
    </ArticleContext.Provider>
  );
}
