"use client";

import Image from "next/image";
import Link from "next/link";
import { Anton } from "next/font/google";
import { ROUTES } from "@/shared/constants";
import { cn } from "@/lib/utils";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface BrandLogoProps {
  className?: string;
  textSize?: string;
  emblemSize?: number;
  href?: string;
  hideTextOnMobile?: boolean;
}

export function BrandLogo({
  className,
  textSize = "text-[30px]",
  emblemSize = 34,
  href = ROUTES.HOME,
  hideTextOnMobile = false,
}: BrandLogoProps) {
  const content = (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 select-none cursor-pointer shrink-0",
        className,
      )}
    >
      {/* Brand Wordmark */}
      <span
        style={{
          fontFamily: `${anton.style.fontFamily}, 'Anton', Impact, sans-serif`,
          background:
            "linear-gradient(90deg, #6B7280 0%, #374151 40%, #1F2937 75%, #4B5563 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className={cn(
          anton.className,
          "font-normal tracking-[0.03em] uppercase leading-none whitespace-nowrap",
          hideTextOnMobile ? "hidden md:inline-block" : "inline-block",
          textSize,
        )}
      >
        PURE EVIL STORE
      </span>

      {/* Brand Geometric Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/images/pure-evil-emblem.png"
          alt="Pure Evil Emblem"
          width={emblemSize}
          height={emblemSize}
          priority
          className="w-auto object-contain"
          style={{ height: `${emblemSize}px` }}
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
