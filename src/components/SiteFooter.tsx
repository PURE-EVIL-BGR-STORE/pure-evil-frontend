import Link from "next/link";
import { BRAND, ROUTES } from "@/shared/constants";
import { BrandLogo } from "./BrandLogo";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F9F9F8] border-t border-black/10 text-[#666666]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <BrandLogo emblemSize={28} textSize="text-2xl" />
            <p className="type-body-sm text-[#666666] max-w-sm leading-relaxed">
              {BRAND.TAGLINE}
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="type-overline text-[#111111] font-semibold mb-5 tracking-widest">
              Company
            </h4>
            <ul className="space-y-3 type-body-sm">
              <li>
                <Link
                  href={ROUTES.CATALOG}
                  className="hover:text-[#111111] transition-colors"
                >
                  Catalog
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="hover:text-[#111111] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.FAQ}
                  className="hover:text-[#111111] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CONTACT}
                  className="hover:text-[#111111] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="type-overline text-[#111111] font-semibold mb-5 tracking-widest">
              Connect
            </h4>
            <ul className="space-y-3 type-body-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111111] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111111] transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="mailto:pureevildreams@gmail.com"
                  className="hover:text-[#111111] transition-colors"
                >
                  pureevildreams@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 type-caption text-[#8E8E8E]">
          <p>
            © {currentYear} {BRAND.NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#111111] transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#111111] transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
