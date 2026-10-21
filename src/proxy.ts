import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match internationalized paths, ignoring static files, images, and internal routes
  matcher: ["/", "/(vi|en)/:path*", "/((?!_next|_vercel|images|api|.*\\..*).*)"],
};
