// ---------- ARTICLE EDIT PAGE ---------- //
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pagesUrl } from "../../app/appConstants";
import { ArticleForm } from "../../components/articles/ArticleForm";
import { useArticleContext } from "../../core/contexts/articles/ArticleContext";
import type { ArticleCreateOrUpdateDto } from "../../core/dtos/articles/ArticleCreationDto";
import type { FormValues } from "../../core/hooks/useForm";
import {
  handleNavigationWithTimeout,
  resolveUrl,
} from "../../core/utils/helpers";

export function ArticleEditPage(): React.JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const { articleList, updateArticleById } = useArticleContext();

  const articleToEdit = articleList.find(
    (article) => article.id === Number(id),
  );

  const onSubmit = useCallback(
    async (formData: FormValues<ArticleCreateOrUpdateDto>) => {
      const updatedArticle = await updateArticleById(formData, Number(id));

      const targetUrl = resolveUrl(pagesUrl.ARTICLE_PAGE, {
        id: updatedArticle.id,
      });
      handleNavigationWithTimeout(navigate, targetUrl, 0);
    },
    [id, navigate, updateArticleById],
  );

  return (
    <ArticleForm
      title="Modifier mon article"
      submitLabel="Confirmer les modifications"
      initialData={articleToEdit}
      onSubmit={onSubmit}
    />
  );
}
