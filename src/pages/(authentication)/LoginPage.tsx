import { useCallback, useContext } from "react";
import { pagesUrl } from "../../app/appConstants";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import { TextInput } from "../../components/inputs/TextInput";
import { NavLink } from "../../components/links/NavLink";
import { SuccessSnackbarContext } from "../../core/contexts/SuccessSnackbarContext";
import type { UserCreationDto } from "../../core/dtos/UserCreationDto";
import type { UserLoginDto } from "../../core/dtos/UserLoginDto";
import { useForm, type FormValues } from "../../core/hooks/useForm";
import {
  validateEmail,
  validatePassword,
} from "../../core/utils/validationRules";

export function LoginPage(): React.JSX.Element {
  const { setSuccessMessage, setIsSuccessSnackbarOpen } = useContext(
    SuccessSnackbarContext,
  );

  const initialFormValues: FormValues<UserLoginDto> = {
    email: "",
    password: "",
  };

  // TODO: backend control for rules
  const validate = (formData: FormValues<UserCreationDto>) => {
    const errors: Record<keyof UserCreationDto, string | undefined> =
      {} as Record<keyof UserCreationDto, string | undefined>;

    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<UserCreationDto>) => {
      setSuccessMessage(`Bon retour parmis nous ${formData.email}.`);
      setIsSuccessSnackbarOpen(true);
      // TODO: navigate to authenticated home page
    },
    [setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <>
      <section className="flex flex-col items-center gap-10 py-10 text-center">
        <h1>Se connecter</h1>

        <form
          className="xs:max-w-xs flex w-full flex-col gap-6 rounded-xl border-3 border-[var(--color-purple-text)] bg-[var(--color-purple-bg)]/10 px-10 py-10 md:max-w-2xl"
          onSubmit={handleSubmit}
        >
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
            <SubmitButton label="Se connecter" isSubmitting={isSubmitting} />
          </div>
        </form>

        <div className="flex items-center gap-1">
          <p className="text-[var(--color-grey)]">
            Vous n'avez pas de compte ? Vous pouvez en{" "}
          </p>
          <NavLink label="créer un." path={pagesUrl.SIGN_UP_PAGE} />
        </div>
      </section>
    </>
  );
}
