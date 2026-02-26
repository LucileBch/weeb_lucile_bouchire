// ---------- ARTICLE CONTEXT PROVIDER ---------- //
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { endpoints } from "../../api/endpoints";

import { useNavigate, useParams } from "react-router-dom";
import { pagesUrl } from "../../../app/appConstants";
import type { ArticleCreateOrUpdateDto } from "../../dtos/articles/ArticleCreationDto";
import type { ArticleDto } from "../../dtos/articles/ArticleDto";
import { useArticle } from "../../hooks/useArticle";
import { formatServerError } from "../../utils/errorHandler";
import { resolveUrl } from "../../utils/helpers";
import { useErrorSnackbarContext } from "../error/ErrorSnackbarContext";
import { useSuccessSnarckbarContext } from "../success/SuccessSnackbarContext";
import { ArticleContext } from "./ArticleContext";

export function ArticleContextProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getAllArticles,
    getArticleById,
    postArticle,
    patchArticleById,
    deleteArticleById,
  } = useArticle();

  const { setErrorMessage, setIsErrorSnackbarOpen } = useErrorSnackbarContext();
  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();

  // article list
  const [articleList, setArticleList] = useState<ArticleDto[]>([]);
  const [isArticleListLoading, setIsArticleListLoading] =
    useState<boolean>(true);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // article by Id
  const [selectedArticle, setSelectedArticle] = useState<
    ArticleDto | undefined
  >(undefined);
  const [isSelectedArticleLoading, setIsSelectedArticleLoading] =
    useState<boolean>(false);

  const fetchArticleList = useCallback(
    async (page: number = 1): Promise<void> => {
      try {
        const response = await getAllArticles(
          `${endpoints.articles}?page=${page}`,
        );
        setArticleList(response.results);
        setTotalArticles(response.count);
        setCurrentPage(page);
      } catch (error) {
        const errorMessage = formatServerError(error);
        setErrorMessage(errorMessage);
        setIsErrorSnackbarOpen(true);
      } finally {
        setIsArticleListLoading(false);
      }
    },
    [getAllArticles, setErrorMessage, setIsErrorSnackbarOpen],
  );

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
    async (
      articleCreationDto: ArticleCreateOrUpdateDto,
    ): Promise<ArticleDto> => {
      const formData = new FormData();
      formData.append("title", articleCreationDto.title);
      formData.append("content", articleCreationDto.content);

      if (articleCreationDto.image instanceof File) {
        formData.append("image", articleCreationDto.image);
      }

      const newArticle = await postArticle(endpoints.articles, formData);
      setArticleList((prevList) => [newArticle, ...prevList]);
      return newArticle;
    },
    [postArticle],
  );

  const updateArticleById = useCallback(
    async (
      articleUpdateDto: ArticleCreateOrUpdateDto,
      articleId: number,
    ): Promise<ArticleDto> => {
      const formData = new FormData();
      formData.append("title", articleUpdateDto.title);
      formData.append("content", articleUpdateDto.content);

      if (articleUpdateDto.image) {
        formData.append("image", articleUpdateDto.image);
      }

      const updatedArticle = await patchArticleById(
        endpoints.articles,
        formData,
        articleId.toString(),
      );

      setArticleList((prevList) =>
        prevList.map((art) => (art.id === articleId ? updatedArticle : art)),
      );

      setSuccessMessage("L'article a été mis à jour avec succès.");
      setIsSuccessSnackbarOpen(true);

      return updatedArticle;
    },
    [patchArticleById, setIsSuccessSnackbarOpen, setSuccessMessage],
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

  const onCancel = useCallback(() => {
    const targetUrl = id
      ? resolveUrl(pagesUrl.ARTICLE_PAGE, { id: Number(id) })
      : pagesUrl.BLOG_PAGE;

    navigate(targetUrl);
  }, [id, navigate]);

  const articleStore = useMemo(
    () => ({
      articleList,
      isArticleListLoading,
      selectedArticle,
      isSelectedArticleLoading,
      totalArticles,
      currentPage,
      fetchArticleList,
      fetchArticleById,
      createNewArticle,
      updateArticleById,
      removeArticleById,
      onCancel,
    }),
    [
      articleList,
      isArticleListLoading,
      selectedArticle,
      isSelectedArticleLoading,
      totalArticles,
      currentPage,
      fetchArticleList,
      fetchArticleById,
      createNewArticle,
      updateArticleById,
      removeArticleById,
      onCancel,
    ],
  );

  return (
    <ArticleContext.Provider value={articleStore}>
      {children}
    </ArticleContext.Provider>
  );
}
