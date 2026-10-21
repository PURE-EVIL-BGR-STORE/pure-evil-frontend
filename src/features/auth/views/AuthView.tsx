"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ROUTES } from "@/shared/constants";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

interface AuthViewProps {
  initialMode?: "login" | "register";
}

export function AuthView({ initialMode = "login" }: AuthViewProps) {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    window.history.replaceState(null, "", `/${locale}/${newMode}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-[#111111]">
      {/* ================= COLUMN 1 (LEFT): EDITORIAL PHOTOGRAPHY ================= */}
      <div className="hidden lg:relative lg:block lg:w-1/2 min-h-screen overflow-hidden bg-black select-none">
        <Image
          src="/images/auth-img.png"
          alt="PURE EVIL Streetwear Editorial"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
      </div>

      {/* ================= COLUMN 2 (RIGHT): AUTH FORM ================= */}
      {/* Direct on background, NO extra wrapping card layer */}
      <div className="flex-1 flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-16 xl:px-24 py-10 min-h-screen bg-white relative">
        {/* Nút về trang chủ: dạng pill sang trọng tại góc trên bên trái layout phải */}
        <Link
          href={ROUTES.HOME}
          className="absolute top-6 left-6 sm:top-8 sm:left-8 lg:top-8 lg:left-12 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all backdrop-blur-md bg-white/90 hover:bg-white text-[#111111] shadow-sm border border-black/10 hover:border-black/30 hover:shadow cursor-pointer select-none"
          aria-label={t("backToStore")}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("backToStore")}</span>
        </Link>

        {/* Center Form Container */}
        <div className="w-full max-w-[420px] mx-auto my-auto pt-10 lg:pt-0">
          {/* Brand Logo Emblem Only - Centered & Sized */}
          <div className="flex justify-center mb-6">
            <Link
              href={ROUTES.HOME}
              className="inline-block select-none cursor-pointer hover:opacity-90 transition-opacity"
              aria-label="Pure Evil Store"
            >
              <Image
                src="/images/pure-evil-emblem.png"
                alt="Pure Evil Emblem"
                width={72}
                height={72}
                priority
                className="w-auto h-16 sm:h-20 object-contain drop-shadow-sm"
              />
            </Link>
          </div>

          {mode === "login" ? (
            <LoginForm onSwitchToRegister={() => switchMode("register")} />
          ) : (
            <RegisterForm
              onSwitchToLogin={() => switchMode("login")}
              onRegisterSuccess={() => switchMode("login")}
            />
          )}
        </div>

        {/* Bottom subtle copyright on mobile */}
        <div className="lg:hidden text-center text-[11px] text-[#8E8E8E] pt-6">
          © {new Date().getFullYear()} PURE EVIL STORE.
        </div>
      </div>
    </div>
  );
}
