import type React from "react";
import { useCallback, useContext, useState } from "react";
import { pagesUrl } from "../../app/appConstants";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import { TextInput } from "../../components/inputs/TextInput";
import { NavLink } from "../../components/links/NavLink";
import { SuccessSnackbarContext } from "../../core/contexts/SuccessSnackbarContext";
import type { UserCodeRequestDto } from "../../core/dtos/UserCodeRequestDto";
import type { UserResetPasswordDto } from "../../core/dtos/UserResetPassword";
import { useForm, type FormValues } from "../../core/hooks/useForm";
import {
  validateCode,
  validateEmail,
  validatePassword,
} from "../../core/utils/validationRules";

export function ForgotPasswordPage(): React.JSX.Element {
  const { setSuccessMessage, setIsSuccessSnackbarOpen } = useContext(
    SuccessSnackbarContext,
  );

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  // useForm confirm email before enable reset password
  const initialFormValuesEmail: FormValues<UserCodeRequestDto> = {
    email: "",
  };

  // TODO: backend control for rules
  const validateEmailForm = (formData: FormValues<UserCodeRequestDto>) => {
    const errors: Record<keyof UserCodeRequestDto, string | undefined> =
      {} as Record<keyof UserCodeRequestDto, string | undefined>;

    errors.email = validateEmail(formData.email);

    return errors;
  };

  const onSubmitEmail = useCallback(
    async (formData: FormValues<UserCodeRequestDto>) => {
      setSuccessMessage(
        `Un code a été envoyé à l'email suivant: ${formData.email}.`,
      );
      setIsSuccessSnackbarOpen(true);
      setIsEmailSent(true);
      // TODO: navigate to authenticated home page
    },
    [setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({
      initialFormValues: initialFormValuesEmail,
      validate: validateEmailForm,
      onSubmit: onSubmitEmail,
    });

  // useForm reset password
  const initialFormValuesReset: FormValues<UserResetPasswordDto> = {
    email: "",
    activationCode: "",
    password: "",
  };

  const validateResetForm = (formData: FormValues<UserResetPasswordDto>) => {
    const errors: Record<keyof UserResetPasswordDto, string | undefined> =
      {} as Record<keyof UserResetPasswordDto, string | undefined>;

    errors.email = validateEmail(formData.email);
    errors.activationCode = validateCode(formData.activationCode);
    errors.password = validatePassword(formData.password);

    return errors;
  };

  const onSubmitReset = useCallback(
    async (formData: FormValues<UserResetPasswordDto>) => {
      setSuccessMessage(
        `Le nouveau mot de passe est correctement considéré. (${formData.email}).`,
      );
      setIsSuccessSnackbarOpen(true);
      setIsEmailSent(true);
      // TODO: navigate to signin page
    },
    [setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  const {
    formData: formDataReset,
    formErrors: formErrorsReset,
    isSubmitting: isSubmittingReset,
    handleChange: handleChangeReset,
    handleSubmit: handleSubmitReset,
  } = useForm({
    initialFormValues: initialFormValuesReset,
    validate: validateResetForm,
    onSubmit: onSubmitReset,
  });

  return (
    <>
      <section className="flex flex-col items-center gap-10 py-10 text-center">
        <h1>Mot de passe oublié ?</h1>

        {!isEmailSent ? (
          <p>
            Saisissez et valdiez l'adresse e-mail de votre compte Weeb. Vous
            allez recevoir un code par e-mail.
          </p>
        ) : (
          <p>
            Renseignez le code de sécurité et créez votre nouveau mot de passe.
          </p>
        )}

        {!isEmailSent ? (
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
            </div>

            <div className="mt-4 flex justify-center">
              <SubmitButton label="Valider" isSubmitting={isSubmitting} />
            </div>
          </form>
        ) : (
          <form
            className="xs:max-w-xs flex w-full flex-col gap-6 rounded-xl border-3 border-[var(--color-purple-text)] bg-[var(--color-purple-bg)]/10 px-10 py-10 md:max-w-2xl"
            onSubmit={handleSubmitReset}
          >
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <TextInput
                id="email"
                placeholder="Email"
                name="email"
                value={formDataReset.email}
                onChange={handleChangeReset}
                type="email"
                error={formErrorsReset.email}
              />
              <TextInput
                id="activationCode"
                placeholder="Code"
                name="activationCode"
                value={formDataReset.activationCode}
                onChange={handleChangeReset}
                error={formErrorsReset.activationCode}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <PasswordInput
                id="password"
                placeholder="Nouveau mot de passe"
                name="password"
                value={formDataReset.password}
                onChange={handleChangeReset}
                error={formErrorsReset.password}
              />
            </div>

            <div className="mt-4 flex justify-center">
              <SubmitButton label="Valider" isSubmitting={isSubmittingReset} />
            </div>
          </form>
        )}

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
