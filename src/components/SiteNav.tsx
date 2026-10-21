"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, Globe, User } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { ROUTES } from "@/shared/constants";
import { BrandLogo } from "./BrandLogo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
} from "@/shared/ui";

export function SiteNav() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Restore drawer open state if language was changed from inside the drawer
  useEffect(() => {
    const wasOpen = sessionStorage.getItem("pure_evil_drawer_open");
    if (wasOpen === "true") {
      sessionStorage.removeItem("pure_evil_drawer_open");
      requestAnimationFrame(() => {
        setIsMobileMenuOpen(true);
      });
    }
  }, []);

  const handleLanguageChange = (
    nextLocale: "vi" | "en",
    keepDrawerOpen = false,
  ) => {
    if (nextLocale !== locale) {
      if (keepDrawerOpen && typeof window !== "undefined") {
        sessionStorage.setItem("pure_evil_drawer_open", "true");
      }
      router.replace(pathname, { locale: nextLocale });
    }
  };

  const navLinks = [
    { label: t("catalog"), href: ROUTES.CATALOG },
    { label: t("about"), href: ROUTES.ABOUT },
    { label: t("faq"), href: ROUTES.FAQ },
    { label: t("contact"), href: ROUTES.CONTACT },
  ];

  // Hide Navbar completely on dedicated Auth split pages (/login and /register)
  // MUST be placed AFTER all hooks to adhere to React Rules of Hooks
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9F9F8]/95 backdrop-blur-md transition-colors border-b border-black/[0.04]">
      {/* 3-Column Navigation Bar with 80px horizontal padding on desktop */}
      <div className="w-full px-4 sm:px-8 lg:px-[80px] h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* COLUMN 1 (LEFT): Brand Logo & Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-start min-w-0">
          {/* Mobile Hamburger Drawer Trigger */}
          <div className="lg:hidden shrink-0">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open Mobile Menu"
                  className="p-1.5 -ml-1 text-[#111111] hover:text-[#C19A6B] transition-colors cursor-pointer"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="pb-6 text-left">
                    <SheetTitle className="sr-only">
                      Mobile Navigation Menu
                    </SheetTitle>
                    {/* Full Brand Logo inside Drawer */}
                    <BrandLogo
                      hideTextOnMobile={false}
                      emblemSize={26}
                      textSize="text-[22px]"
                    />
                  </SheetHeader>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-4 pt-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[15px] font-semibold text-[#111111] hover:text-[#C19A6B] transition-colors uppercase tracking-[0.1em] py-1.5"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Dedicated Auth Buttons for Mobile (Login & Register) */}
                    <div className="pt-6 border-t border-black/10 flex flex-col gap-2.5">
                      <Link
                        href={ROUTES.AUTH.LOGIN}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full"
                      >
                        <Button variant="primary" size="md" className="w-full">
                          {t("login")}
                        </Button>
                      </Link>
                      <Link
                        href={ROUTES.AUTH.REGISTER}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full"
                      >
                        <Button variant="outline" size="md" className="w-full">
                          {t("register")}
                        </Button>
                      </Link>
                    </div>
                  </nav>
                </div>

                {/* Mobile Drawer Footer */}
                <div className="pt-6 border-t border-black/10 space-y-4">
                  <div className="flex items-center justify-between text-sm text-[#666666]">
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#C19A6B]" />
                      Language
                    </span>
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      <button
                        onClick={() => handleLanguageChange("vi", true)}
                        className={`px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer ${
                          locale === "vi"
                            ? "bg-[#111111] text-white"
                            : "text-[#666666] hover:text-[#111111]"
                        }`}
                      >
                        VI
                      </button>
                      <span>/</span>
                      <button
                        onClick={() => handleLanguageChange("en", true)}
                        className={`px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer ${
                          locale === "en"
                            ? "bg-[#111111] text-white"
                            : "text-[#666666] hover:text-[#111111]"
                        }`}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-[#8E8E8E]">
                    © {new Date().getFullYear()} PURE EVIL STORE.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Logo: Emblem only on mobile, Full Text + Emblem on md+ */}
          <BrandLogo
            hideTextOnMobile={true}
            emblemSize={28}
            textSize="text-[26px] lg:text-[30px]"
          />
        </div>

        {/* COLUMN 2: Centered Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14.5px] font-semibold text-[#111111] hover:text-[#C19A6B] transition-colors uppercase tracking-[0.12em] whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* COLUMN 3: Actions */}
        <div className="flex items-center justify-end gap-3.5 sm:gap-5 flex-1 shrink-0 text-[#111111]">
          {/* Language Switcher (Desktop) */}
          <div className="hidden sm:flex items-center gap-1 text-[12px] font-semibold tracking-wider select-none">
            <button
              onClick={() => handleLanguageChange("vi", false)}
              className={`transition-colors cursor-pointer ${
                locale === "vi"
                  ? "text-[#111111] font-bold"
                  : "text-[#8E8E8E] hover:text-[#111111]"
              }`}
            >
              VI
            </button>
            <span className="text-[#8E8E8E] text-[10px]">/</span>
            <button
              onClick={() => handleLanguageChange("en", false)}
              className={`transition-colors cursor-pointer ${
                locale === "en"
                  ? "text-[#111111] font-bold"
                  : "text-[#8E8E8E] hover:text-[#111111]"
              }`}
            >
              EN
            </button>
          </div>

          {/* Search Icon */}
          <button
            aria-label={t("search")}
            className="p-1 hover:text-[#C19A6B] transition-colors cursor-pointer"
          >
            <Search className="w-[18px] h-[18px] text-[#111111]" />
          </button>

          {/* User Account Icon */}
          <Link
            href={ROUTES.AUTH.LOGIN}
            aria-label="User Account"
            className="p-1 hover:text-[#C19A6B] transition-colors"
          >
            <User className="w-[18px] h-[18px] text-[#111111]" />
          </Link>

          {/* Cart Icon + Inline Count 0 */}
          <Link
            href={ROUTES.CART}
            aria-label={t("cart")}
            className="inline-flex items-center gap-1 p-1 hover:text-[#C19A6B] transition-colors"
          >
            <ShoppingBag className="w-[18px] h-[18px] text-[#111111]" />
            <span className="text-[13.5px] font-medium leading-none text-[#111111]">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
