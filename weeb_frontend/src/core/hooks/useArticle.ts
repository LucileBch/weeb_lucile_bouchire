// ---------- ARTICLE HOOK ---------- //
import { useCallback } from "react";
import { api } from "../api/axiosInstance";
import type { ArticleDto } from "../dtos/articles/ArticleDto";

interface ArticleHook {
  getAllArticles: (url: string) => Promise<ArticleDto[]>;
  getArticleById: (url: string, id: string) => Promise<ArticleDto>;
  postArticle: (url: string, payload: FormData) => Promise<ArticleDto>;
  patchArticleById: (
    url: string,
    payload: FormData,
    id: string,
  ) => Promise<ArticleDto>;
  deleteArticleById: (url: string, id: string) => Promise<void>;
}

export function useArticle(): ArticleHook {
  const getAllArticles = useCallback(
    async (url: string): Promise<ArticleDto[]> => {
      const response = await api.get<ArticleDto[]>(url);
      return response.data;
    },
    [],
  );

  const getArticleById = useCallback(
    async (url: string, id: string): Promise<ArticleDto> => {
      const response = await api.get<ArticleDto>(`${url}${id}/`);
      return response.data;
    },
    [],
  );

  const postArticle = useCallback(
    async (url: string, payload: FormData): Promise<ArticleDto> => {
      const response = await api.post<ArticleDto>(url, payload);
      return response.data;
    },
    [],
  );

  const patchArticleById = useCallback(
    async (url: string, payload: FormData, id: string): Promise<ArticleDto> => {
      const response = await api.patch<ArticleDto>(`${url}${id}/`, payload);
      return response.data;
    },
    [],
  );

  const deleteArticleById = useCallback(
    async (url: string, id: string): Promise<void> => {
      await api.delete(`${url}${id}/`);
    },
    [],
  );

  return {
    getAllArticles,
    getArticleById,
    postArticle,
    patchArticleById,
    deleteArticleById,
  };
}
