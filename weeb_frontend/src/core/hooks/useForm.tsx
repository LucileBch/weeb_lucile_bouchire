// ---------- FORM HOOK ---------- //
import { useCallback, useEffect, useMemo, useState } from "react";
import { useErrorSnackbarContext } from "../contexts/error/ErrorSnackbarContext";
import { formatServerError } from "../utils/errorHandler";

export type FormValues<T> = T;

interface IProps<T> {
  initialFormValues: FormValues<T>;
  validate(formData: FormValues<T>): Record<keyof T, string | undefined>;
  onSubmit(formData: FormValues<T>): Promise<void>;
}

export function useForm<T>({
  initialFormValues,
  validate,
  onSubmit,
}: Readonly<IProps<T>>): FormHook<T> {
  const { setErrorMessage, setIsErrorSnackbarOpen } = useErrorSnackbarContext();

  const [formData, setFormData] = useState<FormValues<T>>(initialFormValues);
  const [formErrors, setFormErrors] = useState<
    Record<keyof T, string | undefined>
  >({} as Record<keyof T, string | undefined>);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setFormData(initialFormValues);
  }, [initialFormValues]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    },
    [],
  );

  const validateForm = useCallback(() => {
    const validationErrors = validate(formData);
    setFormErrors(validationErrors);
    return !Object.values(validationErrors).some(
      (error) => error !== undefined && error !== "",
    );
  }, [formData, validate]);

  // not used anymore but we keep it for future use
  const resetForm = useCallback(() => {
    setFormData(initialFormValues);
    setFormErrors({} as Record<keyof T, string | undefined>);
  }, [initialFormValues]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const isValid = validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      try {
        await onSubmit(formData);
      } catch (error) {
        const serverMessage = formatServerError(error);
        setErrorMessage(serverMessage);
        setIsErrorSnackbarOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit, setErrorMessage, setIsErrorSnackbarOpen, validateForm],
  );

  return useMemo(
    () => ({
      formData,
      formErrors,
      isSubmitting,
      handleChange,
      validateForm,
      resetForm,
      handleSubmit,
    }),
    [
      formData,
      formErrors,
      isSubmitting,
      handleChange,
      validateForm,
      resetForm,
      handleSubmit,
    ],
  );
}

interface FormHook<T> {
  formData: FormValues<T>;
  formErrors: Record<keyof T, string | undefined>;
  isSubmitting: boolean;
  handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void;
  validateForm(): boolean;
  resetForm(): void;
  handleSubmit(e: React.FormEvent): void;
}
