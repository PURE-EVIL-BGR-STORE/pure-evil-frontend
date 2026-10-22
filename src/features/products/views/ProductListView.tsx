"use client";

import React, { useState } from "react";
import { HeroBanner } from "../components/HeroBanner";
import { BentoShowcase } from "../components/BentoShowcase";
import { CatalogGrid } from "../components/CatalogGrid";
import { BrandIntimacy } from "../components/BrandIntimacy";
import { SizeGuideModal } from "../components/SizeGuideModal";
import { SiteFooter } from "@/components/SiteFooter";

export function ProductListView() {
  const [activeTab, setActiveTab] = useState<"all" | "tees" | "hoodies" | "bottoms">("all");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const handleSelectBentoCategory = (cat: "tees" | "hoodies" | "bottoms") => {
    setActiveTab(cat);
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div>
        {/* Tier 1: Cinematic Editorial Hero Banner & Commitments */}
        <HeroBanner />

        {/* Tier 2: Asymmetric Bento Showcase */}
        <BentoShowcase onSelectCategory={handleSelectBentoCategory} />

        {/* Tier 3: Interactive Catalog Grid + Frosted Glass Quick-Buy Bar */}
        <CatalogGrid
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />

        {/* Tier 4: Brand Craftsmanship Philosophy Banner */}
        <BrandIntimacy />

        {/* Size Guide Modal Dialog */}
        <SizeGuideModal
          open={isSizeGuideOpen}
          onOpenChange={setIsSizeGuideOpen}
        />
      </div>

      {/* Complete Footer */}
      <SiteFooter />
    </div>
  );
}
