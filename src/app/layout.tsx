import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "SecureScan-by-LAV",
  description: "SecureScan by LAVJEET KUMAR RAI",
};

import { ModernVerticalSidebar } from "@/components/ui/modern-vertical-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${inter.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <ModernVerticalSidebar />
          <main className="flex-1 ml-20 sm:ml-24 md:ml-28 w-full transition-all">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
