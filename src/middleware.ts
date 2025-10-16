export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/feed/:path*",
    "/explore",
    "/messages",
    "/:path*/edit",
    "/((?!login$|register$)[^/]+)", // match any single-segment route except /login
  ],
};
