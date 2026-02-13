// ---------- ARTICLE HOOK ---------- //
import { useCallback } from "react";
import { api } from "../api/axiosInstance";
import type { ArticleDto } from "../dtos/ArticleDto";

interface ArticleHook {
  getAllArticles: (url: string) => Promise<ArticleDto[]>;
  getArticleById: (url: string, id: string) => Promise<ArticleDto>;
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

  return { getAllArticles, getArticleById };
}
