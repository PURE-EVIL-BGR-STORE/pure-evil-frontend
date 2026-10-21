/**
 * Centralized environment configuration
 */
export const env = {
  // API Gateway
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  // Keycloak (IAM)
  keycloakUrl: process.env.KEYCLOAK_URL,
  keycloakRealm: process.env.KEYCLOAK_REALM,
  keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
  keycloakClientSecret: process.env.KEYCLOAK_CLIENT_SECRET,

  // Brand Info
  hotline: process.env.NEXT_PUBLIC_HOTLINE,
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL,
  siteName: "Pure Evil Store",
  siteDescription: "Luxury streetwear & modern apparel",
} as const;
