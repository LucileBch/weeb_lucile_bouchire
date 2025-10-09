import { useCallback, useMemo, useState } from "react";

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
  const [formData, setFormData] = useState<FormValues<T>>(initialFormValues);
  const [formErrors, setFormErrors] = useState<
    Record<keyof T, string | undefined>
  >({} as Record<keyof T, string | undefined>);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const validationErrors = validate(formData);
    setFormErrors(validationErrors);
    return !Object.values(validationErrors).some(
      (error) => error !== undefined && error !== "",
    );
  }, [formData, validate]);

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
        resetForm();
      } catch (error) {
        console.error("Erreur lors de la soumission :", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit, resetForm, validateForm],
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
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  validateForm(): boolean;
  resetForm(): void;
  handleSubmit(e: React.FormEvent): void;
}
