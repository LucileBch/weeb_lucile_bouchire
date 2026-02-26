// ---------- ARTICLE CONTEXT ---------- //
import React, { useContext } from "react";
import type { ArticleCreateOrUpdateDto } from "../../dtos/articles/ArticleCreationDto";
import type { ArticleDto } from "../../dtos/articles/ArticleDto";

export interface ArticleStore {
  articleList: ArticleDto[];
  isArticleListLoading: boolean;
  selectedArticle: ArticleDto | undefined;
  isSelectedArticleLoading: boolean;
  totalArticles: number;
  currentPage: number;

  fetchArticleList(page: number): Promise<void>;
  fetchArticleById(articleId: string): Promise<void>;
  createNewArticle(
    articleCreationDto: ArticleCreateOrUpdateDto,
  ): Promise<ArticleDto>;
  updateArticleById(
    articleUpdateDto: ArticleCreateOrUpdateDto,
    articleId: number,
  ): Promise<ArticleDto>;
  removeArticleById(articleId: number): Promise<boolean>;
  onCancel(): void;
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
