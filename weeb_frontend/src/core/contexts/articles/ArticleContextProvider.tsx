// ---------- ARTICLE CONTEXT PROVIDER ---------- //
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
  const { getAllArticles, getArticleById } = useArticle();

  const { setErrorMessage, setIsErrorSnackbarOpen } = useErrorSnackbarContext();

  // article list
  const [articleList, setArticleList] = useState<ArticleDto[]>([]);
  const [isArticleListLoading, setIsArticleListLoading] =
    useState<boolean>(true);

  // article by Id
  const [selectedArticle, setSelectedArticle] = useState<
    ArticleDto | undefined
  >(undefined);
  const [isSelectedArticleLoading, setIsSelectedArticleLoading] =
    useState<boolean>(false);

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

  const fetchArticleById = useCallback(
    async (articleId: string): Promise<void> => {
      try {
        setIsSelectedArticleLoading(true);
        const response = await getArticleById(endpoints.getArticles, articleId);
        setSelectedArticle(response);
      } catch (error) {
        const errorMessage = formatServerError(error);
        setErrorMessage(errorMessage);
        setIsErrorSnackbarOpen(true);
      } finally {
        setIsSelectedArticleLoading(false);
      }
    },
    [getArticleById, setErrorMessage, setIsErrorSnackbarOpen],
  );

  const articleStore = useMemo(
    () => ({
      articleList,
      isArticleListLoading,
      selectedArticle,
      isSelectedArticleLoading,
      fetchArticleById,
    }),
    [
      articleList,
      isArticleListLoading,
      selectedArticle,
      isSelectedArticleLoading,
      fetchArticleById,
    ],
  );

  return (
    <ArticleContext.Provider value={articleStore}>
      {children}
    </ArticleContext.Provider>
  );
}
