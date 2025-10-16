import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "../components/sidebar";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
          <main className="min-h-screen flex">
            <aside className="fixed top-0 left-0 w-64 h-screen pl-15 pr-6 py-2 border-gray-600 border-r-1">
              <Sidebar />
            </aside>
            <section className="flex-1 ml-64">
              <div className="min-h-screen flex flex-col">{children}</div>
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
