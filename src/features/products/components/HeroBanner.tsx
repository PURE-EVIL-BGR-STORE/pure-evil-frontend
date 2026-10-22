"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface HeroBannerProps {
  onExploreCatalog?: () => void;
  onExploreStory?: () => void;
}

export function HeroBanner({
  onExploreCatalog,
  onExploreStory,
}: HeroBannerProps) {
  const t = useTranslations("Home.Hero");

  const scrollToCatalog = () => {
    if (onExploreCatalog) {
      onExploreCatalog();
    } else {
      const el = document.getElementById("catalog-section");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToStory = () => {
    if (onExploreStory) {
      onExploreStory();
    } else {
      const el = document.getElementById("brand-story");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-[80px] pt-3 pb-8">
      {/* Cinematic Full-Bleed Frame */}
      <div className="relative h-[76vh] min-h-[540px] max-h-[820px] w-full overflow-hidden rounded-2xl bg-[#0A0A0A] shadow-2xl">
        {/* Background Controlled Insanity Editorial Image */}
        <div className="absolute inset-0">
          <Image
            src="https://controlledinsanity.com/cdn/shop/files/hero-desktop.png"
            alt="PURE EVIL x CONTROLLED INSANITY DROP 001 Editorial"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80 scale-105 transition-transform duration-[2500ms] ease-out hover:scale-100"
          />
        </div>

        {/* Multi-layered cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block" />

        {/* Banner Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16">
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            {/* Steel Metallic Pulsing Drop Indicator Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#7E8E9F] shadow-[0_0_8px_rgba(126,142,159,0.9)] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-white uppercase">
                {t("dropBadge")}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.06]">
              {t("headingLine1")} <br />
              <span className="font-light italic text-neutral-300">
                {t("headingLine2")}
              </span>
            </h1>

            {/* Subtitle / Story Snippet */}
            <p className="max-w-xl text-sm sm:text-base text-neutral-300 leading-relaxed">
              {t("subtitle")}
            </p>

            {/* Dual Actions */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 sm:px-8 py-3.5 sm:py-4 text-xs font-bold tracking-[0.2em] text-[#111111] uppercase transition-all hover:bg-neutral-200 cursor-pointer shadow-lg active:scale-95"
              >
                <span>{t("exploreCatalog")}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToStory}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-sm transition-all hover:bg-white/15 cursor-pointer active:scale-95"
              >
                <span>{t("brandStory")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
