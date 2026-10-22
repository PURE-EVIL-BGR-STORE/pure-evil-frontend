"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui";

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SizeGuideModal({ open, onOpenChange }: SizeGuideModalProps) {
  const t = useTranslations("Home.SizeGuide");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 sm:p-8 bg-surface border border-black/10">
        <DialogHeader className="text-left space-y-2">
          <div className="eyebrow">{t("eyebrow")}</div>
          <DialogTitle className="type-h3 text-text-primary uppercase tracking-wide">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="type-body-sm text-text-secondary">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        {/* Bảng thông số đo */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-black/10 text-text-tertiary uppercase tracking-wider">
                <th className="py-2.5 px-3 font-semibold">{t("colSize")}</th>
                <th className="py-2.5 px-3 font-semibold">{t("colHeight")}</th>
                <th className="py-2.5 px-3 font-semibold">{t("colWeight")}</th>
                <th className="py-2.5 px-3 font-semibold">{t("colLength")}</th>
                <th className="py-2.5 px-3 font-semibold">{t("colChest")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] text-text-primary">
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-bold text-accent">S</td>
                <td className="py-3 px-3">160 – 168</td>
                <td className="py-3 px-3">50 – 62</td>
                <td className="py-3 px-3">71</td>
                <td className="py-3 px-3">56</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-bold text-accent">M</td>
                <td className="py-3 px-3">168 – 175</td>
                <td className="py-3 px-3">63 – 74</td>
                <td className="py-3 px-3">73</td>
                <td className="py-3 px-3">58</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-bold text-accent">L</td>
                <td className="py-3 px-3">175 – 182</td>
                <td className="py-3 px-3">75 – 84</td>
                <td className="py-3 px-3">75</td>
                <td className="py-3 px-3">61</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-3 px-3 font-bold text-accent">XL</td>
                <td className="py-3 px-3">180 – 192</td>
                <td className="py-3 px-3">85 – 100+</td>
                <td className="py-3 px-3">77</td>
                <td className="py-3 px-3">64</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Gợi ý chọn size */}
        <div className="mt-5 rounded-md bg-[#F4F4F3] border border-black/5 p-4 text-xs text-text-secondary space-y-1.5 leading-relaxed">
          <p className="font-semibold text-text-primary uppercase tracking-wider text-[11px]">
            {t("noteTitle")}
          </p>
          <p>• {t("note1")}</p>
          <p>• {t("note2")}</p>
          <p>• {t("note3")}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
