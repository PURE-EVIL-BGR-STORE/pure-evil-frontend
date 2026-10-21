import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "secondary" | "outline" | "dark" | "destructive";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-[3px] transition-colors select-none",
        // Variants
        (variant === "default" || variant === "accent") &&
          "bg-[#C19A6B]/15 text-[#C19A6B] border border-[#C19A6B]/30",
        variant === "secondary" &&
          "bg-[#F2ECE3] text-[#111111] border border-black/5",
        variant === "dark" &&
          "bg-[#111111] text-white",
        variant === "outline" &&
          "bg-transparent text-[#111111] border border-black/20",
        variant === "destructive" &&
          "bg-red-500/10 text-red-600 border border-red-500/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
