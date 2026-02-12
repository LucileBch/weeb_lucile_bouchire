import { useCallback } from "react";
import { api } from "../api/axiosInstance";
import type { ArticleDto } from "../dtos/ArticleDto";

// ---------- ARTICLE HOOK ---------- //
interface ArticleHook {
  getAllArticles: (url: string) => Promise<ArticleDto[]>;
}

export function useArticle(): ArticleHook {
  const getAllArticles = useCallback(
    async (url: string): Promise<ArticleDto[]> => {
      const response = await api.get<ArticleDto[]>(url);
      return response.data;
    },
    [],
  );

  return { getAllArticles };
}
