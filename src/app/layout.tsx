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
  title: "Canbay Kuaför - Profesyonel Berber Hizmeti",
  description:
    "Canbay Kuaför - Pursaklar'da profesyonel berber hizmeti. Modern kesim, sakal tıraşı, cilt bakımı ve daha fazlası.",
  keywords: [
    "berber",
    "kuaför",
    "Canbay Kuaför",
    "Pursaklar berber",
    "Ankara kuaför",
    "erkek bakım",
    "saç kesimi",
    "sakal tıraşı",
    "profesyonel berber",
  ],
  authors: [{ name: "Canbay Kuaför" }],
  icons: {
    icon: "/canbay-icon.png",
  },
  openGraph: {
    title: "Canbay Kuaför - Profesyonel Berber Hizmeti",
    description:
      "Canbay Kuaför - Pursaklar'da profesyonel berber hizmeti. Modern kesim, sakal tıraşı, cilt bakımı ve daha fazlası.",
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
        style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
