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
import { formatServerError } from "../../utils/errorHandler";
import { useErrorSnackbarContext } from "../error/ErrorSnackbarContext";
import { ArticleContext } from "./ArticleContext";

export function ArticleContextProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const { getAllArticles } = useArticle();

  const { setErrorMessage, setIsErrorSnackbarOpen } = useErrorSnackbarContext();

  const [articleList, setArticleList] = useState<ArticleDto[]>([]);
  const [isArticleListLoading, setIsArticleListLoading] =
    useState<boolean>(true);

  const fetchArticleList = useCallback(async (): Promise<void> => {
    try {
      const response = await getAllArticles(endpoints.getArticles);
      setArticleList(response);
    } catch (error) {
      const errorMessage = formatServerError(error);
      setErrorMessage(errorMessage);
      setIsErrorSnackbarOpen(true);
    } finally {
      setIsArticleListLoading(false);
    }
  }, [getAllArticles, setErrorMessage, setIsErrorSnackbarOpen]);

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
