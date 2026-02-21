// ---------- ARTICLE CONTEXT PROVIDER ---------- //
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { endpoints } from "../../api/endpoints";

import type { ArticleCreationDto } from "../../dtos/articles/ArticleCreationDto";
import type { ArticleDto } from "../../dtos/articles/ArticleDto";
import { useArticle } from "../../hooks/useArticle";
import { formatServerError } from "../../utils/errorHandler";
import { useErrorSnackbarContext } from "../error/ErrorSnackbarContext";
import { useSuccessSnarckbarContext } from "../success/SuccessSnackbarContext";
import { ArticleContext } from "./ArticleContext";

export function ArticleContextProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const { getAllArticles, getArticleById, postArticle, deleteArticleById } =
    useArticle();

  const { setErrorMessage, setIsErrorSnackbarOpen } = useErrorSnackbarContext();
  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();

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
      const response = await getAllArticles(endpoints.articles);
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
        const response = await getArticleById(endpoints.articles, articleId);
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

  const createNewArticle = useCallback(
    async (articleCreationDto: ArticleCreationDto): Promise<ArticleDto> => {
      const formData = new FormData();
      formData.append("title", articleCreationDto.title);
      formData.append("content", articleCreationDto.content);

      if (articleCreationDto.image) {
        formData.append("image", articleCreationDto.image);
      }

      const newArticle = await postArticle(endpoints.articles, formData);
      setArticleList((prevList) => [newArticle, ...prevList]);
      return newArticle;
    },
    [postArticle],
  );

  const removeArticleById = useCallback(
    async (articleId: number): Promise<boolean> => {
      try {
        await deleteArticleById(endpoints.articles, articleId.toString());
        setArticleList((prev) => prev.filter((art) => art.id !== articleId));

        setSuccessMessage("L'article a bien été supprimé.");
        setIsSuccessSnackbarOpen(true);

        return true;
      } catch (error) {
        const errorMessage = formatServerError(error);
        setErrorMessage(errorMessage);
        setIsErrorSnackbarOpen(true);

        return false;
      }
    },
    [
      deleteArticleById,
      setErrorMessage,
      setIsErrorSnackbarOpen,
      setIsSuccessSnackbarOpen,
      setSuccessMessage,
    ],
  );

  const articleStore = useMemo(
    () => ({
      articleList,
      isArticleListLoading,
      selectedArticle,
      isSelectedArticleLoading,
      fetchArticleById,
      createNewArticle,
      removeArticleById,
    }),
    [
      articleList,
      isArticleListLoading,
      selectedArticle,
      isSelectedArticleLoading,
      fetchArticleById,
      createNewArticle,
      removeArticleById,
    ],
  );

  return (
    <ArticleContext.Provider value={articleStore}>
      {children}
    </ArticleContext.Provider>
  );
}
