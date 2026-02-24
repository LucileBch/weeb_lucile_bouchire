// ---------- ARTICLE FORM COMPONENT ---------- //
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useArticleContext } from "../../core/contexts/articles/ArticleContext";
import type { ArticleCreateOrUpdateDto } from "../../core/dtos/articles/ArticleCreationDto";
import type { ArticleDto } from "../../core/dtos/articles/ArticleDto";
import { useForm, type FormValues } from "../../core/hooks/useForm";
import {
  validateName,
  validateNotEmpty,
} from "../../core/utils/validationRules";
import { ActionButton } from "../buttons/ActionButton";
import { IconButton } from "../buttons/IconButton";
import { OutlinedButton } from "../buttons/OutlinedButton";
import { SubmitButton } from "../buttons/SubmitButton";
import { TextAreaInput } from "../inputs/TextAreaInput";
import { TextInput } from "../inputs/TextInput";

interface IProps {
  title: string;
  submitLabel: string;
  initialData?: ArticleDto;
  onSubmit: (formData: FormValues<ArticleCreateOrUpdateDto>) => Promise<void>;
}

export function ArticleForm({
  title,
  submitLabel,
  initialData,
  onSubmit,
}: Readonly<IProps>): React.JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { onCancel } = useArticleContext();

  const initialFormValues: FormValues<ArticleCreateOrUpdateDto> = {
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
    image: null,
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.image ?? null,
  );

  const validate = (formData: FormValues<ArticleCreateOrUpdateDto>) => {
    const errors: Record<keyof ArticleCreateOrUpdateDto, string | undefined> =
      {} as Record<keyof ArticleCreateOrUpdateDto, string | undefined>;

    errors.title = validateNotEmpty(formData.title);
    errors.content = validateName(formData.content);

    return errors;
  };

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({
      initialFormValues,
      validate,
      onSubmit,
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));

      const manualEvent = {
        target: {
          name: "image",
          value: file,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleChange(manualEvent);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    const emptyEvent = {
      target: {
        name: "image",
        value: null,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleChange(emptyEvent);
  };

  return (
    <section className="flex flex-col items-center gap-10 py-10 text-center">
      <h1 className="whitespace-nowrap">{title}</h1>

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

        <div className="flex flex-col gap-4 text-left">
          <label className="text-sm tracking-wider text-[var(--color-purple-text)]">
            Image
          </label>

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col gap-6 rounded-xl border-3 border-dashed border-[var(--color-purple-text)]/30 bg-[var(--color-purple-bg)]/5 p-6 transition-all">
            {/* LIGNE D'ACTION : Bouton + Nom du fichier + Poubelle */}
            <div className="flex flex-wrap items-center gap-4">
              <OutlinedButton
                type="button"
                label={
                  formData.image ? "Changer d'image" : "Sélectionner une image"
                }
                onClick={() => fileInputRef.current?.click()}
              />

              {formData.image && (
                <div className="flex flex-1 items-center overflow-hidden px-4 py-2">
                  <span className="truncate text-sm text-gray-600 italic">
                    {/* On affiche le nom du fichier contenu dans l'objet File */}
                    {(formData.image as File).name}
                  </span>

                  <IconButton
                    icon={Trash2}
                    onClick={removeImage}
                    title="Supprimer l'image"
                  />
                </div>
              )}
            </div>

            {/* APERÇU : Visible uniquement si une image est sélectionnée */}
            {previewUrl && (
              <div className="flex justify-center border-t border-[var(--color-purple-text)]/10 pt-4">
                <div className="group relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-40 w-full max-w-xs rounded-lg border-2 border-[var(--color-purple-text)] object-cover shadow-md"
                  />
                </div>
              </div>
            )}

            {!formData.image && (
              <p className="text-center text-xs text-gray-400">
                Aucun fichier (Formats : JPG, PNG, WEBP)
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <ActionButton label="Annuler" onClick={onCancel} />
          <SubmitButton label={submitLabel} isSubmitting={isSubmitting} />
        </div>
      </form>
    </section>
  );
}
