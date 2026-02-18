// ---------- ARTICLE CONTEXT ---------- //
import React, { useContext } from "react";
import type { ArticleCreationDto } from "../../dtos/articles/ArticleCreationDto";
import type { ArticleDto } from "../../dtos/articles/ArticleDto";

export interface ArticleStore {
  articleList: ArticleDto[];
  isArticleListLoading: boolean;
  selectedArticle: ArticleDto | undefined;
  isSelectedArticleLoading: boolean;

  fetchArticleById(articleId: string): Promise<void>;
  createNewArticle(articleCreationDto: ArticleCreationDto): Promise<ArticleDto>;
}

export const ArticleContext = React.createContext<ArticleStore | undefined>(
  undefined,
);

export const useArticleContext = () => {
  const context = useContext(ArticleContext);

  if (!context) {
    throw new Error(
      "useArticleContext must be used in a ArticleContextProvider",
    );
  }

  return context;
};
