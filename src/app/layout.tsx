import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Text to QR Code Converter | SecureScan",
  description: "Convert any text, link, or message into a high-density Secure QR Code instantly. Fast, free, and secure text to QR code generator.",
  keywords: ["text to qr code", "convert text to qr code", "qr code generator", "secure qr scan", "text qr", "custom qr code", "free qr code generator"],
  authors: [{ name: "LAVJEET KUMAR RAI" }],
  openGraph: {
    title: "Text to QR Code Converter | SecureScan",
    description: "Convert any text into a secure high-density QR Code instantly. Try for free!",
    type: "website",
    siteName: "SecureScan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to QR Code Converter | SecureScan",
    description: "Instantly convert any text to a secure QR Code.",
  },
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
