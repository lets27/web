import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// List of routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/forum(.*)",
  "/orders(.*)", // Add orders page here
  "/basket(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Only protect the routes listed above
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
