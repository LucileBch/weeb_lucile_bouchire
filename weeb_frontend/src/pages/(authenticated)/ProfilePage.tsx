// ---------- PROFILE PAGE ---------- //
import { useCallback, useMemo } from "react";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import { TextInput } from "../../components/inputs/TextInput";
import { PasswordRules } from "../../components/PasswordRules";
import { useAuthContext } from "../../core/contexts/auth/AuthContext";
import { useSuccessSnarckbarContext } from "../../core/contexts/success/SuccessSnackbarContext";
import type { UserUpdateDto } from "../../core/dtos/user/UserUpdateDto";
import { useForm, type FormValues } from "../../core/hooks/useForm";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../core/utils/validationRules";

export function ProfilePage(): React.JSX.Element {
  const { setSuccessMessage, setIsSuccessSnackbarOpen } =
    useSuccessSnarckbarContext();
  const { updateUserSessionData, actualUser } = useAuthContext();

  const initialFormValues: FormValues<UserUpdateDto> = useMemo(
    () => ({
      first_name: actualUser?.first_name ?? "",
      last_name: actualUser?.last_name ?? "",
      email: actualUser?.email ?? "",
      old_password: "",
      new_password: "",
    }),
    [actualUser],
  );

  const validate = (formData: FormValues<UserUpdateDto>) => {
    const errors: Record<keyof UserUpdateDto, string | undefined> =
      {} as Record<keyof UserUpdateDto, string | undefined>;

    errors.first_name = validateName(formData.first_name ?? "", "Le prénom");
    errors.last_name = validateName(formData.last_name ?? "", "Le nom");
    errors.email = validateEmail(formData.email ?? "");

    if (formData.new_password && formData.new_password.trim() !== "") {
      if (!formData.old_password || formData.old_password.trim() === "") {
        errors.old_password =
          "L'ancien mot de passe est requis pour le changement.";
      }

      const passwordError = validatePassword(formData.new_password);
      if (passwordError) {
        errors.new_password = passwordError;
      }
    }

    return errors;
  };

  const onSubmit = useCallback(
    async (formData: FormValues<UserUpdateDto>) => {
      await updateUserSessionData(formData);

      setSuccessMessage(`Vos informations ont été mises à jour avec succès.`);
      setIsSuccessSnackbarOpen(true);
    },
    [updateUserSessionData, setIsSuccessSnackbarOpen, setSuccessMessage],
  );

  const { formData, formErrors, isSubmitting, handleChange, handleSubmit } =
    useForm({ initialFormValues, validate, onSubmit });

  return (
    <section className="flex flex-col items-center gap-10 py-10 text-center">
      <h1>Informations personnelles</h1>

      <form
        className="flex w-full max-w-2xl flex-col gap-6 rounded-xl border-3 border-[var(--color-purple-text)] bg-[var(--color-purple-bg)]/10 px-6 py-10 md:px-12"
        onSubmit={handleSubmit}
      >
        {/* --- SECTION IDENTITÉ --- */}
        <div className="flex flex-col gap-1 text-left">
          <label
            htmlFor="first_name"
            className="ml-1 text-sm uppercase opacity-70"
          >
            Prénom
          </label>
          <TextInput
            id="first_name"
            placeholder="Prénom"
            name="first_name"
            value={formData.first_name ?? ""}
            onChange={handleChange}
            error={formErrors.first_name}
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label
            htmlFor="last_name"
            className="ml-1 text-sm uppercase opacity-70"
          >
            Nom
          </label>
          <TextInput
            id="last_name"
            placeholder="Nom"
            name="last_name"
            value={formData.last_name ?? ""}
            onChange={handleChange}
            error={formErrors.last_name}
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="email" className="ml-1 text-sm uppercase opacity-70">
            Email
          </label>
          <TextInput
            id="email"
            placeholder="votre@email.com"
            name="email"
            value={formData.email ?? ""}
            onChange={handleChange}
            type="email"
            error={formErrors.email}
          />
        </div>

        {/* --- SECTION SÉCURITÉ --- */}
        <div className="flex flex-col gap-1 text-left">
          <label
            htmlFor="old_password"
            className="ml-1 text-sm uppercase opacity-70"
          >
            Ancien mot de passe
          </label>
          <PasswordInput
            id="old_password"
            placeholder="Mot de passe actuel"
            name="old_password"
            value={formData.old_password ?? ""}
            onChange={handleChange}
            error={formErrors.old_password}
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label
            htmlFor="new_password"
            className="ml-1 text-sm uppercase opacity-70"
          >
            Nouveau mot de passe
          </label>
          <PasswordInput
            id="new_password"
            placeholder="Nouveau mot de passe"
            name="new_password"
            value={formData.new_password ?? ""}
            onChange={handleChange}
            error={formErrors.new_password}
          />
        </div>

        <PasswordRules />

        <div className="mt-4 flex justify-center">
          <SubmitButton
            label="Enregistrer les modifications"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </section>
  );
}
