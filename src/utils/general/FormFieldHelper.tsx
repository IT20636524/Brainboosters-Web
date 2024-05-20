import { FieldErrors, FieldValues } from "react-hook-form";

export const generateFieldColor = (
  errors: FieldErrors<FieldValues>,
  fieldName: string,
) => (errors[fieldName] ? "failure" : "primary");

export const generateFieldHelperText = (
  errors: FieldErrors<FieldValues>,
  fieldName: string,
) => <>{errors[fieldName] ? errors[fieldName]?.message : ""}</>;

export const generatePlaceholder = (
  errors: FieldErrors<FieldValues>,
  fieldName: string,
  placeholder: string,
) => (errors[fieldName] ? "" : placeholder);
