import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type ButtonVariant = "primary" | "outline" | "danger";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-blue-700 bg-blue-700 text-white hover:bg-blue-800 focus-visible:outline-blue-700",
  outline:
    "border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-blue-700",
  danger:
    "border-red-600 bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export type { ButtonProps, ButtonSize, ButtonVariant };
