import { useCallback, useContext } from "react";
import { SubmitButton } from "../components/buttons/SubmitButton";
import { TextAreaInput } from "../components/inputs/TextAreaInput";
import { TextInput } from "../components/inputs/TextInput";
import { SuccessSnackbarContext } from "../core/contexts/SuccessSnackbarContext";
import type { ContactDto } from "../core/dtos/ContactDto";
import { useForm, type FormValues } from "../core/hooks/useForm";
import {
  validateEmail,
  validateName,
  validateNotEmpty,
} from "../core/utils/validationRules";

export function ContactPage(): React.JSX.Element {
  const { setSuccessMessage, setIsSuccessSnackbarOpen } = useContext(
    SuccessSnackbarContext,
  );

  const initialFormValues: FormValues<ContactDto> = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  };

  // TODO: backend control for rules
  const validate = (formData: FormValues<ContactDto>) => {
    const errors: Record<keyof ContactDto, string | undefined> = {} as Record<
      keyof ContactDto,
      string | undefined
    >;

    errors.firstName = validateName(formData.firstName);
    errors.lastName = validateName(formData.lastName);
    errors.email = validateEmail(formData.email);
    errors.subject = validateNotEmpty(formData.subject);
    errors.message = validateNotEmpty(formData.message);

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<ContactDto>) => {
      setSuccessMessage(
        `${formData.firstName} ${formData.lastName} merci pour votre message. Nous reviendrons vers vous rapidement.`,
      );
      setIsSuccessSnackbarOpen(true);
      // TODO: navigate to home page
    },
    [setIsSuccessSnackbarOpen, setSuccessMessage],
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
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={formErrors.firstName}
          />
          <TextInput
            id="lastName"
            placeholder="Nom"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={formErrors.lastName}
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
