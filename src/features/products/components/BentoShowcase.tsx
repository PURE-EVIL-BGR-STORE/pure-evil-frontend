"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface BentoShowcaseProps {
  onSelectCategory: (category: "tees" | "hoodies" | "bottoms") => void;
}

export function BentoShowcase({ onSelectCategory }: BentoShowcaseProps) {
  const t = useTranslations("Home.Bento");

  const handleCardClick = (cat: "tees" | "hoodies" | "bottoms") => {
    onSelectCategory(cat);
    const el = document.getElementById("catalog-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[80px] py-12 md:py-16">
      {/* Section Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            {t("title")}
          </h2>
        </div>
        <p className="max-w-md text-sm text-text-secondary leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:h-[540px]">
        {/* Large Block Left: Oversized Tees / Pump Covers (col-span-7) */}
        <div
          onClick={() => handleCardClick("tees")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 md:col-span-7 h-[360px] md:h-full shadow-md"
        >
          <Image
            src="https://controlledinsanity.com/cdn/shop/files/Creative-116.jpg"
            alt="Controlled Insanity Oversized Tees & Pump Covers"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 sm:p-8">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#C19A6B] uppercase">
                {t("card1Badge")}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
                {t("card1Title")}
              </h3>
              <p className="text-xs text-neutral-300 hidden sm:block">
                {t("card1Sub")}
              </p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111111] transition-transform duration-300 group-hover:rotate-45 shadow-lg shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* 2 Blocks Right: Cargo Pants & Distressed Hoodies (col-span-5) */}
        <div className="grid grid-cols-1 gap-5 md:col-span-5 md:grid-rows-2">
          {/* Top Block: Cargo Pants / Sweatpants */}
          <div
            onClick={() => handleCardClick("bottoms")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 h-[260px] md:h-full shadow-md"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0807/4556/2400/files/DSC04306.jpg"
              alt="Controlled Insanity Heavyweight Sweatpants"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C19A6B] uppercase">
                  {t("card2Badge")}
                </span>
                <h3 className="mt-1 text-lg sm:text-xl font-bold text-white tracking-wide">
                  {t("card2Title")}
                </h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#111111] transition-transform duration-300 group-hover:rotate-45 shadow-md shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Bottom Block: Heavy Hoodies & Zip-Ups */}
          <div
            onClick={() => handleCardClick("hoodies")}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 h-[260px] md:h-full shadow-md"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0807/4556/2400/files/Reaper6.jpg"
              alt="Controlled Insanity Heavy Distressed Hoodies"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C19A6B] uppercase">
                  {t("card3Badge")}
                </span>
                <h3 className="mt-1 text-lg sm:text-xl font-bold text-white tracking-wide">
                  {t("card3Title")}
                </h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#111111] transition-transform duration-300 group-hover:rotate-45 shadow-md shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
