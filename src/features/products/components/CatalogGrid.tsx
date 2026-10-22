"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { CATALOG_CATEGORIES, PRODUCTS, Product } from "../data/catalog";
import { useToast } from "@/shared/ui";

interface CatalogGridProps {
  activeTab: "all" | "tees" | "hoodies" | "bottoms";
  onTabChange: (tab: "all" | "tees" | "hoodies" | "bottoms") => void;
  onOpenSizeGuide: () => void;
}

export function CatalogGrid({
  activeTab,
  onTabChange,
  onOpenSizeGuide,
}: CatalogGridProps) {
  const t = useTranslations("Home.Catalog");
  const locale = useLocale();
  const { toast } = useToast();

  const filteredProducts =
    activeTab === "all"
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === activeTab);

  const handleQuickAdd = (product: Product, size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(
      t("toastSuccess"),
      `${product.name} (Size: ${size}) • ${product.price}`
    );
  };

  return (
    <section
      id="catalog-section"
      className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[80px] py-12 md:py-16 scroll-mt-24"
    >
      {/* Category Tabs & Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-black/[0.08] pb-6 md:flex-row md:items-center">
        <div>
          <div className="eyebrow mb-1">{t("eyebrow")}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {t("subtitle")}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATALOG_CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#111111] text-white shadow-md"
                    : "bg-surface border border-black/10 text-text-secondary hover:text-text-primary hover:border-black/30"
                }`}
              >
                {t(`categories.${tab.id}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Luxury Streetwear Product Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const displaySpec =
            locale === "en" && product.specEn ? product.specEn : product.spec;

          return (
            <div key={product.id} className="group flex flex-col">
              {/* 4:5 Aspect Ratio Image Card with Frosted Glass Quick-Buy */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#EFECE6] shadow-xs">
                {/* Product Status Tag Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-[#111111] uppercase backdrop-blur-md shadow-xs border border-black/5">
                    {product.tag}
                  </span>
                </div>

                {/* Primary Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
                />

                {/* Alternate Hover Image */}
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} Alternate View`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-100"
                />

                {/* Frosted Glass Quick-Buy Bar (Slides up on Hover) */}
                <div className="absolute inset-x-3 bottom-3 z-20 translate-y-4 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-xl border border-white/50 bg-white/95 p-3 shadow-2xl backdrop-blur-md">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-semibold tracking-wider text-text-secondary uppercase">
                      <span>{t("quickAdd")}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenSizeGuide();
                        }}
                        className="underline cursor-pointer text-[#111111] hover:text-[#C19A6B] transition-colors"
                      >
                        {t("sizeGuide")}
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {["S", "M", "L", "XL"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={(e) => handleQuickAdd(product, size, e)}
                          className="rounded-lg border border-black/10 bg-white py-2 text-xs font-bold text-[#111111] transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-white cursor-pointer active:scale-95 shadow-2xs"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Meta Info */}
              <div className="mt-4 flex items-start justify-between gap-4 px-1">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.14em] text-text-tertiary uppercase">
                    {displaySpec}
                  </p>
                  <h3 className="mt-1 text-sm font-bold tracking-wide text-text-primary group-hover:text-neutral-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <span className="text-sm font-semibold text-text-primary whitespace-nowrap">
                  {product.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
