import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  // Load composite component messages (SiteNav, SiteFooter, etc.) from src/components/messages/
  const componentMessages = (
    await import(`@/components/messages/${locale}.json`)
  ).default;

  // Load feature messages from src/features/auth/messages/
  let authMessages = {};
  try {
    authMessages = (
      await import(`@/features/auth/messages/${locale}.json`)
    ).default;
  } catch {
    // Fallback if missing
  }

  return {
    locale,
    messages: {
      ...componentMessages,
      Auth: authMessages,
    },
  };
});
