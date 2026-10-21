"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "sheet-overlay fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "top" | "bottom" | "left" | "right";
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, style, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      style={{
        width: "min(340px, 85vw)",
        maxWidth: "85vw",
        ...style,
      }}
      className={cn(
        "sheet-panel fixed z-50 bg-white p-6 shadow-2xl",
        side === "right" && "sheet-side-right inset-y-0 right-0 h-full border-l border-black/10",
        side === "left" && "sheet-side-left inset-y-0 left-0 h-full border-r border-black/10",
        side === "top" && "sheet-side-top inset-x-0 top-0 border-b border-black/10",
        side === "bottom" && "sheet-side-bottom inset-x-0 bottom-0 border-t border-black/10",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-5 top-5 rounded-[3px] p-1.5 text-[#666666] opacity-70 transition-opacity hover:opacity-100 hover:text-[#111111] focus:outline-none cursor-pointer">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-left pb-6 border-b border-black/10", className)}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-6 border-t border-black/10", className)}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-[#111111] uppercase tracking-wide", className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[#666666]", className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
