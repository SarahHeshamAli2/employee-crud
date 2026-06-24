import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import type { InputProps } from "./input";
import Input from "./input";

export interface ControlledInputProps<
  TFieldValues extends FieldValues,
> extends Omit<
  InputProps,
  | "name"
  | "onChange"
  | "onBlur"
  | "value"
  | "defaultValue"
  | "state"
  | "errorText"
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  /** Show a green border once the field is touched/dirty and has no error. Default: true */
  showSuccessState?: boolean;
}

function ControlledInput<TFieldValues extends FieldValues>({
  name,
  control,
  showSuccessState = true,
  ...inputProps
}: ControlledInputProps<TFieldValues>) {
  const {
    field,
    fieldState: { error, isTouched, isDirty },
  } = useController({ name, control });
  const state =
    error != null
      ? "error"
      : showSuccessState && (isTouched || isDirty)
        ? "success"
        : "default";

  return (
    <Input
      {...inputProps}
      {...field}
      value={field.value ?? ""}
      onChange={(e) => {
        field.onChange(e.target.value);
      }}
      state={state}
      errorText={error?.message}
    />
  );
}

export default ControlledInput;
