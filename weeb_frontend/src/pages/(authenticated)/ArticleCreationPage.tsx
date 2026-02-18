// ---------- ARTICLE CREATION PAGE ---------- //
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../app/appConstants";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { TextAreaInput } from "../../components/inputs/TextAreaInput";
import { TextInput } from "../../components/inputs/TextInput";
import { useArticleContext } from "../../core/contexts/articles/ArticleContext";
import { useSuccessSnarckbarContext } from "../../core/contexts/success/SuccessSnackbarContext";
import type { ArticleCreationDto } from "../../core/dtos/articles/ArticleCreationDto";
import { useForm, type FormValues } from "../../core/hooks/useForm";
import { handleNavigation, resolveUrl } from "../../core/utils/helpers";
import {
  validateName,
  validateNotEmpty,
} from "../../core/utils/validationRules";

//TODO: add image input & section
export function ArticleCreationPage(): React.JSX.Element {
  const navigate = useNavigate();

  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();
  const { createNewArticle } = useArticleContext();

  const initialFormValues: FormValues<ArticleCreationDto> = {
    title: "",
    content: "",
    image: "",
  };

  const validate = (formData: FormValues<ArticleCreationDto>) => {
    const errors: Record<keyof ArticleCreationDto, string | undefined> =
      {} as Record<keyof ArticleCreationDto, string | undefined>;

    errors.title = validateNotEmpty(formData.title);
    errors.content = validateName(formData.content);

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<ArticleCreationDto>) => {
      const newArticle = await createNewArticle(formData);

      setSuccessMessage(`L'article ${formData.title} a été créé.`);
      setIsSuccessSnackbarOpen(true);

      const targetUrl = resolveUrl(pagesUrl.ARTICLE_PAGE, {
        id: newArticle.id,
      });
      handleNavigation(navigate, targetUrl);
    },
    [createNewArticle, navigate, setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <section className="flex flex-col items-center gap-10 py-10 text-center">
      <h1 className="whitespace-nowrap">Rédiger un article</h1>

      <p className="max-w-3xl">
        Partagez votre savoir avec la communauté. Un bon titre et un contenu
        détaillé font toute la différence !
      </p>

      <form
        className="xs:max-w-xs flex w-full flex-col gap-6 rounded-xl border-3 border-[var(--color-purple-text)] bg-[var(--color-purple-bg)]/10 px-10 py-10 md:max-w-3xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <TextInput
            id="title"
            placeholder="Titre de l'article"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={formErrors.title}
          />
        </div>

        <div className="flex flex-col gap-4">
          <TextAreaInput
            id="content"
            placeholder="Écrivez ici le contenu de votre article..."
            name="content"
            value={formData.content}
            onChange={handleChange}
            error={formErrors.content}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <SubmitButton label="Publier l'article" isSubmitting={isSubmitting} />
        </div>
      </form>
    </section>
  );
}
