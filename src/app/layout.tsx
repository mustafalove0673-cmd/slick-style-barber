import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slick Style - Profesyonel Berber Hizmeti",
  description:
    "Erkekler için premium bakım deneyimi. Uzman ellerde, modern tarzda. Slick Style ile profesyonel berber hizmeti alın.",
  keywords: [
    "berber",
    "kuaför",
    "erkek bakım",
    "saç kesimi",
    "sakal tıraşı",
    "premium berber",
    "Slick Style",
  ],
  authors: [{ name: "Slick Style" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Slick Style - Profesyonel Berber Hizmeti",
    description:
      "Erkekler için premium bakım deneyimi. Uzman ellerde, modern tarzda.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#ffffff", color: "#111827" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
