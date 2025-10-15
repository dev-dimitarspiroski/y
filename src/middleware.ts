export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/feed/:path*", // Protects all subpages under /feed
    "/explore", // Protects the /explore page
    "/messages", // Protects the /messages page
    "/:path*/edit", // Protects any edit page (e.g. /username/edit)
  ],
};
