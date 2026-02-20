// ---------- SIGN UP PAGE ---------- //
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../app/appConstants";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import { TextInput } from "../../components/inputs/TextInput";
import { NavLink } from "../../components/links/NavLink";
import { PasswordRules } from "../../components/PasswordRules";
import { useAuthContext } from "../../core/contexts/auth/AuthContext";
import { useSuccessSnarckbarContext } from "../../core/contexts/success/SuccessSnackbarContext";
import type { UserCreationDto } from "../../core/dtos/user/UserCreationDto";
import { useForm, type FormValues } from "../../core/hooks/useForm";
import { handleNavigationWithTimeout } from "../../core/utils/helpers";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../core/utils/validationRules";

export function SignUpPage(): React.JSX.Element {
  const navigate = useNavigate();

  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();
  const { createUser } = useAuthContext();

  const initialFormValues: FormValues<UserCreationDto> = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const validate = (formData: FormValues<UserCreationDto>) => {
    const errors: Record<keyof UserCreationDto, string | undefined> =
      {} as Record<keyof UserCreationDto, string | undefined>;

    errors.first_name = validateName(formData.first_name, "Le prénom");
    errors.last_name = validateName(formData.last_name, "Le nom");
    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<UserCreationDto>) => {
      await createUser(formData);

      setSuccessMessage(
        `Compte créé pour ${formData.first_name} ${formData.last_name}.En attente d'activation par l'administrateur`,
      );
      setIsSuccessSnackbarOpen(true);
      handleNavigationWithTimeout(navigate, pagesUrl.HOME_PAGE, 0);
    },
    [createUser, navigate, setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <>
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
            <SubmitButton
              label="Créer mon compte"
              isSubmitting={isSubmitting}
            />
          </div>

          <PasswordRules />
        </form>

        <div className="flex items-center gap-1">
          <p className="text-[var(--color-grey)]">Vous avez déjà un compte ?</p>
          <NavLink label="Connectez-vous !" path={pagesUrl.LOGIN_PAGE} />
        </div>
      </section>
    </>
  );
}
