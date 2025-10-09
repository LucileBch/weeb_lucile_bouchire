import { useCallback } from "react";
import { pagesUrl } from "../../app/appConstants";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import { TextInput } from "../../components/inputs/TextInput";
import { NavLink } from "../../components/links/NavLink";
import { PasswordRules } from "../../components/PasswordRules";
import type { UserCreationDto } from "../../core/dtos/UserCreationDto";
import { useForm, type FormValues } from "../../core/hooks/useForm";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../core/utils/validationRules";

export function SignUpPage(): React.JSX.Element {
  const initialFormValues: FormValues<UserCreationDto> = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  // TODO: backend control for rules
  const validate = (formData: FormValues<UserCreationDto>) => {
    const errors: Record<keyof UserCreationDto, string | undefined> =
      {} as Record<keyof UserCreationDto, string | undefined>;

    errors.firstName = validateName(formData.firstName, "Le prénom");
    errors.lastName = validateName(formData.lastName, "Le nom");
    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<UserCreationDto>) => {
      alert(`compte créé pour ${formData.firstName} ${formData.lastName}`);

      // TODO: navigate to authenticated home page
    },
    [],
  );

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <section className="flex flex-col items-center gap-10 py-10 text-center">
      <h1>S'inscrire</h1>

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
          <PasswordInput
            id="password"
            placeholder="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <SubmitButton label="Créer mon compte" isSubmitting={isSubmitting} />
        </div>

        <PasswordRules />
      </form>

      <div className="flex items-center gap-1">
        <p>Vous avez déjà un compte ?</p>
        <NavLink label="Connectez-vous !" path={pagesUrl.LOGIN_PAGE} />
      </div>
    </section>
  );
}
