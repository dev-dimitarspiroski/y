import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "../components/sidebar";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // This provides a class (inter.variable) which sets a CSS variable
});

export const metadata: Metadata = {
  title: "Y",
  description: "This is a X clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark",
          inter.variable
        )}
      >
        <Providers>
          <main className="min-h-screen flex flex-col items-center">
            <article className="flex flex-row w-full h-screen">
              <section className="w-80 px-4 py-2">
                <Sidebar />
              </section>
              <section className="w-full border-gray-600 border-l-2 p-0">
                {children}
              </section>
            </article>
          </main>
        </Providers>
      </body>
    </html>
  );
}
