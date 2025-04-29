"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/styling";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: "text-xs py-1 px-2",
  sm: "text-sm py-1.5 px-3",
  md: "text-base py-2 px-4",
  lg: "text-lg py-2.5 px-5",
  xl: "text-xl py-3 px-6",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-gray-900 text-white border-gray-900 hover:bg-gray-800 active:bg-gray-700",
  secondary: "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 active:bg-gray-300",
  outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  ghost: "bg-transparent border-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  link: "bg-transparent border-transparent text-blue-600 hover:text-blue-700 hover:underline p-0",
};

const Button = ({
  children,
  className,
  size = "md",
  variant = "outline",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={cn(
        // Base styles
        "flex items-center justify-center rounded-lg transition-all duration-300 font-medium",
        // Variant styles
        variantClasses[variant],
        // Size styles
        sizeClasses[size],
        // Width
        fullWidth ? "w-full" : "",
        // Disabled styles
        (disabled || isLoading) && "opacity-70 cursor-not-allowed",
        // Custom className
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
