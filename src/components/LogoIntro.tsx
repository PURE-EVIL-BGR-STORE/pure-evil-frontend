"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Anton } from "next/font/google";
import { BRAND, DESIGN_TOKENS } from "@/shared/constants";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface LogoIntroProps {
  /**
   * Set to true to force playing the animation on every reload.
   * You can also pass ?intro=true in the URL to test anytime.
   */
  debugMode?: boolean;
  onFinish?: () => void;
}

const emptySubscribe = () => () => {};

export function LogoIntro({ debugMode = false, onFinish }: LogoIntroProps) {
  // Check if intro has already been played in this browser session
  const isIntroSeen = useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window === "undefined") return true;
      if (debugMode) return false;
      const params = new URLSearchParams(window.location.search);
      if (params.get("intro") === "true") return false;
      return sessionStorage.getItem("pure_evil_intro_seen") === "true";
    },
    () => true, // On server side: don't render intro to avoid SSR hydration shifts
  );

  const [phase, setPhase] = useState<
    "enter" | "shimmer" | "exit" | "hidden"
  >("enter");

  useEffect(() => {
    if (isIntroSeen) {
      return;
    }

    // Phase 1 -> Phase 2: Metallic specular sweep (starts at 450ms)
    const shimmerTimer = setTimeout(() => {
      setPhase("shimmer");
    }, 450);

    // Phase 2 -> Phase 3: Dissolve smoothly into the store layout (starts at 1250ms)
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 1250);

    // Phase 3 -> Hidden: Complete and unmount from DOM (1650ms total)
    const hideTimer = setTimeout(() => {
      sessionStorage.setItem("pure_evil_intro_seen", "true");
      setPhase("hidden");
      onFinish?.();
    }, 1650);

    return () => {
      clearTimeout(shimmerTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [isIntroSeen, onFinish]);

  const handleSkip = () => {
    sessionStorage.setItem("pure_evil_intro_seen", "true");
    setPhase("hidden");
    onFinish?.();
  };

  // If already seen in this session or animation has completed, render nothing
  if (isIntroSeen || phase === "hidden") {
    return null;
  }

  return (
    <aside
      aria-label="Pure Evil Welcome Screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] select-none ${
        phase === "exit"
          ? "opacity-0 scale-[1.03] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle radial ambient glow accentuating the cool brushed metal */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-slate-200/50 blur-3xl transition-opacity duration-1000" />

      {/* Subtle Skip button for instant user control */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[11px] font-semibold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer py-1.5 px-3 rounded-full border border-black/[0.08] bg-white/70 backdrop-blur-sm shadow-xs"
        aria-label="Skip intro animation"
      >
        Skip
      </button>

      {/* 3D Perspective Reveal of the Brushed Metallic Emblem */}
      <div className="relative flex items-center justify-center [perspective:1000px]">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center animate-emblem-3d">
          {/* Base Emblem */}
          <Image
            src="/images/pure-evil-emblem.png"
            alt="Pure Evil Emblem"
            width={96}
            height={96}
            priority
            className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(15,23,42,0.14)]"
          />

          {/* Metallic Sweep Shimmer clipped precisely to the emblem alpha channel */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: "url('/images/pure-evil-emblem.png')",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: "url('/images/pure-evil-emblem.png')",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          >
            <div
              className={`h-full w-[200%] -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] ${
                phase === "shimmer" || phase === "exit"
                  ? "animate-metallic-sweep"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* Brand Wordmark using the design token typography and gradient */}
      <div className="mt-5 overflow-hidden text-center">
        <span
          style={{
            fontFamily: `${anton.style.fontFamily}, 'Anton', Impact, sans-serif`,
            background: DESIGN_TOKENS.gradients.logo,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className={`${anton.className} inline-block text-xl sm:text-2xl font-normal uppercase tracking-[0.12em] leading-none animate-brand-welcome`}
        >
          {BRAND.NAME}
        </span>
      </div>

      {/* Hairline Progress Indicator */}
      <div className="mt-4 h-[1.5px] w-14 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full w-full origin-left bg-neutral-900 animate-intro-progress" />
      </div>
    </aside>
  );
}
