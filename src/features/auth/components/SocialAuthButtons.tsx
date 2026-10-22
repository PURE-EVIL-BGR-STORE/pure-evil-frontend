"use client";

import React from "react";
import { useToast } from "@/shared/ui";
import { useLocale } from "next-intl";

interface SocialAuthButtonsProps {
  label?: string;
}

export function SocialAuthButtons({ label = "Google" }: SocialAuthButtonsProps) {
  const { toast } = useToast();
  const locale = useLocale();

  const handleGoogleClick = () => {
    toast.info(
      "Google OAuth",
      locale === "vi"
        ? "Tính năng đăng nhập Google đang được kết nối với Keycloak Identity Provider."
        : "Google login is being connected to Keycloak Identity Provider."
    );
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="w-full h-11 border border-black/15 hover:border-black/30 rounded-[3px] flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#111111] transition-colors cursor-pointer bg-white"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
        />
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
        />
        <path
          fill="#FBBC05"
          d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3 0-.9.2-1.7.4-2.4L1.6 7.1C.6 9.1 0 11 0 12.4s.6 3.3 1.6 5.3l3.7-3z"
        />
        <path
          fill="#34A853"
          d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 6.4 10.4 6.4z"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}
