"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ROUTES } from "@/shared/constants";
import { useTranslations } from "next-intl";

export function BrandIntimacy() {
  const t = useTranslations("Home.Philosophy");

  return (
    <section
      id="brand-story"
      className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[80px] py-16 scroll-mt-24"
    >
      <div className="flex flex-col items-center rounded-3xl border border-black/[0.08] bg-gradient-to-b from-[#F3EFEA]/80 via-white to-white px-6 py-16 sm:py-20 text-center md:px-16 shadow-xs">
        {/* Metallic Emblem */}
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 drop-shadow-md">
          <Image
            src="/images/pure-evil-emblem.png"
            alt="PURE EVIL Metal Sigil"
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>

        {/* Eyebrow Label */}
        <p className="mt-6 eyebrow">{t("eyebrow")}</p>

        {/* Main Philosophy Heading */}
        <h2 className="mt-3 max-w-2xl text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight">
          {t("heading")}
        </h2>

        {/* Story Paragraph */}
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-text-secondary">
          {t("story")}
        </p>

        {/* Luxury Streetwear CTA Button */}
        <Link
          href={ROUTES.ABOUT}
          className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#111111] px-8 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-all duration-300 hover:bg-[#222222] hover:shadow-xl hover:shadow-black/15 active:scale-95 cursor-pointer border border-white/10"
        >
          <span>{t("cta")}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:translate-x-1">
            <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      </div>
    </section>
  );
}
