// ---------- ARTICLE CONTEXT ---------- //
import React, { useContext } from "react";
import type { ArticleDto } from "../../dtos/ArticleDto";

export interface ArticleStore {
  articleList: ArticleDto[];
  isArticleListLoading: boolean;
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
