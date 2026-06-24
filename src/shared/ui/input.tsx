import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "../utils/cn";

export type InputState = "default" | "success" | "error";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  state?: InputState;
  fullWidth?: boolean;
  ref?: Ref<HTMLInputElement>;
}

const baseStyles =
  "rounded-md border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 " +
  "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50";

const stateStyles: Record<InputState, string> = {
  default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500/30",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500/30",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500/30",
};

function Input({
  label,
  helperText,
  errorText,
  state = "default",
  fullWidth = true,
  id,
  className,
  ref,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;
  const message = state === "error" ? errorText : helperText;

  return (
    <div className={cn(fullWidth && "w-full")}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        aria-invalid={state === "error"}
        className={cn(
          baseStyles,
          stateStyles[state],
          fullWidth && "w-full",
          className,
        )}
        {...rest}
      />
      {message && (
        <p
          className={cn(
            "mt-1 text-xs",
            state === "error" ? "text-red-600" : "text-gray-500",
          )}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Input;
