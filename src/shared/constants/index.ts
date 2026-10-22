export const BRAND = {
  NAME: "PURE EVIL STORE",
  TAGLINE: "Not everyone is meant to fit in. Some are born to stand apart.",
  HOTLINE: "0906178691",
  PRIMARY_COLOR: "#C19A6B",
  LOGO_URL:
    "https://res.cloudinary.com/dsbkss6bo/image/upload/v1789505080/pure-evil-logo_nlc3hg.png",
} as const;

export const DESIGN_TOKENS = {
  colors: {
    background: "#F9F9F8",
    surface: "#FFFFFF",
    surfaceWarm: "#F2ECE3",
    textPrimary: "#111111",
    textSecondary: "#666666",
    textTertiary: "#8E8E8E",
    accent: "#C19A6B",
    accentHover: "#B0895C",
    steel: "#2D3F52",
    steelDark: "#182B3F",
    steelLight: "#7E8E9F",
    border: "rgba(0, 0, 0, 0.25)",
    borderSubtle: "rgba(0, 0, 0, 0.10)",
  },
  gradients: {
    logo: "linear-gradient(90deg, #6B7280 0%, #374151 40%, #1F2937 75%, #4B5563 100%)",
    steel: "linear-gradient(135deg, #7E8E9F 0%, #2D3F52 45%, #182B3F 75%, #42556A 100%)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "80px",
    "5xl": "120px",
  },
  radius: {
    sharp: "0px",
    subtle: "3px",
  },
  typography: {
    fonts: {
      heading: "Inter",
      body: "Geist",
    },
    scale: {
      display: { size: "64px", weight: "700", lineHeight: "1.1" },
      h1: { size: "40px", weight: "600", lineHeight: "1.2" },
      h2: { size: "32px", weight: "600", lineHeight: "1.25" },
      h3: { size: "24px", weight: "500", lineHeight: "1.3" },
      h4: { size: "20px", weight: "600", lineHeight: "1.4" },
      bodyLarge: { size: "18px", weight: "400", lineHeight: "1.6" },
      body: { size: "16px", weight: "400", lineHeight: "1.5" },
      bodySmall: { size: "14px", weight: "400", lineHeight: "1.5" },
      caption: { size: "13px", weight: "500", lineHeight: "1.4" },
      overline: { size: "12px", weight: "500", lineHeight: "1.4" },
    },
  },
} as const;

export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  PRODUCTS: "/catalog",
  COLLECTIONS: "/collections",
  ABOUT: "/about",
  FAQ: "/faq",
  CONTACT: "/contact",
  CART: "/cart",
  CHECKOUT: "/checkout",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  TERMS: "/terms",
  PRIVACY: "/privacy",
  PROFILE: "/profile",
} as const;
