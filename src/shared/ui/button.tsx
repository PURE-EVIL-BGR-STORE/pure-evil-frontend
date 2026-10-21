import * as React from "react";
import { cn } from "@/lib/utils";

// Reusable Buttons
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[3px]",
          // Variants
          variant === "primary" &&
            "bg-[#111111] text-white hover:bg-[#222222] active:scale-[0.99]",
          variant === "secondary" &&
            "bg-[#F2ECE3] text-[#111111] hover:bg-[#e8dfd3] active:scale-[0.99]",
          variant === "accent" &&
            "bg-[#C19A6B] text-white hover:bg-[#B0895C] active:scale-[0.99]",
          variant === "outline" &&
            "bg-transparent text-[#111111] border border-black/25 hover:bg-black/5",
          variant === "ghost" &&
            "bg-transparent text-[#111111] hover:bg-black/5",
          // Sizes
          size === "sm" && "text-[11px] px-4 py-2 gap-1.5",
          size === "md" && "text-xs px-6 py-3 gap-2",
          size === "lg" && "text-sm px-8 py-3.5 gap-2.5",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
