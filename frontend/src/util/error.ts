import { ValidationError } from 'yup';

export const displayErrors = (
  err: Error | ValidationError,
  formRef: any,
): void => {
  const validationErrors: Record<string, unknown> = {};

  if (err instanceof ValidationError) {
    err.inner.forEach((error: ValidationError) => {
      validationErrors[error.path] = error.message;
    });

    formRef.current.setErrors(validationErrors);
  }
};
