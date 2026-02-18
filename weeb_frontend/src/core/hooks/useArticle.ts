// ---------- ARTICLE HOOK ---------- //
import { useCallback } from "react";
import { api } from "../api/axiosInstance";
import type { ArticleCreationDto } from "../dtos/articles/ArticleCreationDto";
import type { ArticleDto } from "../dtos/articles/ArticleDto";

interface ArticleHook {
  getAllArticles: (url: string) => Promise<ArticleDto[]>;
  getArticleById: (url: string, id: string) => Promise<ArticleDto>;
  postArticle: (
    url: string,
    payload: ArticleCreationDto,
  ) => Promise<ArticleDto>;
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
    async (url: string, payload: ArticleCreationDto): Promise<ArticleDto> => {
      const response = await api.post<ArticleDto>(url, payload);
      return response.data;
    },
    [],
  );

  return { getAllArticles, getArticleById, postArticle };
}
