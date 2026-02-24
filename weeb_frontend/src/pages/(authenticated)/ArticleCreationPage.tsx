// ---------- ARTICLE CREATION PAGE ---------- //
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../app/appConstants";
import { ArticleForm } from "../../components/articles/ArticleForm";
import { useArticleContext } from "../../core/contexts/articles/ArticleContext";
import { useSuccessSnarckbarContext } from "../../core/contexts/success/SuccessSnackbarContext";
import type { ArticleCreateOrUpdateDto } from "../../core/dtos/articles/ArticleCreationDto";
import { type FormValues } from "../../core/hooks/useForm";
import {
  handleNavigationWithTimeout,
  resolveUrl,
} from "../../core/utils/helpers";

export function ArticleCreationPage(): React.JSX.Element {
  const navigate = useNavigate();

  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();
  const { createNewArticle } = useArticleContext();

  const onSubmit = useCallback(
    async (formData: FormValues<ArticleCreateOrUpdateDto>) => {
      const newArticle = await createNewArticle(formData);

      setSuccessMessage(`L'article ${formData.title} a été créé.`);
      setIsSuccessSnackbarOpen(true);

      const targetUrl = resolveUrl(pagesUrl.ARTICLE_PAGE, {
        id: newArticle.id,
      });
      handleNavigationWithTimeout(navigate, targetUrl, 0);
    },
    [createNewArticle, navigate, setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  return (
    <ArticleForm
      title="Rédiger un article"
      submitLabel="Publier l'article"
      onSubmit={onSubmit}
    />
  );
}
