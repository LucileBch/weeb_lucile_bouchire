// ---------- CONTACT PAGE ---------- //
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/buttons/SubmitButton";
import { TextAreaInput } from "../components/inputs/TextAreaInput";
import { TextInput } from "../components/inputs/TextInput";
import { useReviewContext } from "../core/contexts/reviews/ReviewContext";
import { useSuccessSnarckbarContext } from "../core/contexts/success/SuccessSnackbarContext";
import type { ReviewDto } from "../core/dtos/ReviewDto";
import { useForm, type FormValues } from "../core/hooks/useForm";
import { handleNavigation } from "../core/utils/helpers";
import {
  validateEmail,
  validateName,
  validateNotEmpty,
} from "../core/utils/validationRules";

export function ContactPage(): React.JSX.Element {
  const navigate = useNavigate();

  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();
  const { createNewReview } = useReviewContext();

  const initialFormValues: FormValues<ReviewDto> = {
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validate = (formData: FormValues<ReviewDto>) => {
    const errors: Record<keyof ReviewDto, string | undefined> = {} as Record<
      keyof ReviewDto,
      string | undefined
    >;

    errors.first_name = validateName(formData.first_name);
    errors.last_name = validateName(formData.last_name);
    errors.email = validateEmail(formData.email);
    errors.subject = validateNotEmpty(formData.subject);
    errors.message = validateNotEmpty(formData.message);

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<ReviewDto>) => {
      await createNewReview(formData);

      setSuccessMessage(
        `${formData.first_name} ${formData.last_name} merci pour votre avis. Nous reviendrons vers vous rapidement.`,
      );
      setIsSuccessSnackbarOpen(true);
      handleNavigation(navigate, "/");
    },
    [createNewReview, navigate, setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <section className="flex flex-col items-center gap-10 py-10 text-center">
      <h1 className="whitespace-nowrap">Votre avis compte !</h1>

      <p className="max-w-3xl">
        Votre retour est essentiel pour nous améliorer ! Partagez votre
        expérience, dites-nous ce que vous aimez et ce que nous pourrions
        améliorer. Vos suggestions nous aident à faire de ce blog une ressource
        toujours plus utile et enrichissante.
      </p>

      <form
        className="xs:max-w-xs flex w-full flex-col gap-6 rounded-xl border-3 border-[var(--color-purple-text)] bg-[var(--color-purple-bg)]/10 px-10 py-10 md:max-w-2xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <TextInput
            id="firstName"
            placeholder="Prénom"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            error={formErrors.first_name}
          />
          <TextInput
            id="lastName"
            placeholder="Nom"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            error={formErrors.last_name}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <TextInput
            id="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            error={formErrors.email}
          />
          <TextInput
            id="subject"
            placeholder="Sujet"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            error={formErrors.subject}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <TextAreaInput
            id="message"
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={formErrors.message}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <SubmitButton label="Contact" isSubmitting={isSubmitting} />
        </div>
      </form>
    </section>
  );
}
