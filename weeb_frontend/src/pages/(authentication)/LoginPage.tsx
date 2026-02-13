// ---------- LOGIN PAGE ---------- //
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../app/appConstants";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import { TextInput } from "../../components/inputs/TextInput";
import { ArrowLink } from "../../components/links/ArrowLink";
import { NavLink } from "../../components/links/NavLink";
import { useAuthContext } from "../../core/contexts/auth/AuthContext";
import { useSuccessSnarckbarContext } from "../../core/contexts/success/SuccessSnackbarContext";
import type { UserLoginDto } from "../../core/dtos/user/UserLoginDto";
import { useForm, type FormValues } from "../../core/hooks/useForm";
import { handleNavigation } from "../../core/utils/helpers";
import {
  validateEmail,
  validatePassword,
} from "../../core/utils/validationRules";

export function LoginPage(): React.JSX.Element {
  const navigate = useNavigate();

  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();
  const { loginUser } = useAuthContext();

  const initialFormValues: FormValues<UserLoginDto> = {
    email: "",
    password: "",
  };

  const validate = (formData: FormValues<UserLoginDto>) => {
    const errors: Record<keyof UserLoginDto, string | undefined> = {} as Record<
      keyof UserLoginDto,
      string | undefined
    >;

    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<UserLoginDto>) => {
      const user = await loginUser(formData);

      setSuccessMessage(`Bon retour parmis nous ${user.first_name}.`);
      setIsSuccessSnackbarOpen(true);

      handleNavigation(navigate, pagesUrl.BLOG_PAGE);
    },
    [loginUser, navigate, setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
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

      <div>
        <ArrowLink
          label="Mot de passe oublié ?"
          path={pagesUrl.FORGOT_PASSWORD_PAGE}
        />
      </div>

      <div className="flex items-center gap-1">
        <p className="text-[var(--color-grey)]">
          Vous n'avez pas de compte ? Vous pouvez en{" "}
        </p>
        <NavLink label="créer un." path={pagesUrl.SIGN_UP_PAGE} />
      </div>
    </section>
  );
}
