import NextAuth from "next-auth/next";
import { options } from "@/lib/next-auth";

// Create the NextAuth handler using the provided options (providers, callbacks, etc.)
const handler = NextAuth(options);

// Export the handler for both GET and POST requests.
// This enables NextAuth to handle authentication requests. (e.g. login, logout...)
export { handler as GET, handler as POST };
