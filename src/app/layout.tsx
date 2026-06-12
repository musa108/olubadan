import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { Providers } from "./providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Olubadan of Ibadanland | Official Royal Palace Website",
    template: "%s | Olubadan Palace",
  },
  description:
    "The official website of the Olubadan of Ibadanland — the paramount traditional ruler of Ibadan. Explore royal history, chieftaincy lines, palace news, and cultural heritage.",
  keywords: [
    "Olubadan",
    "Ibadan",
    "Ibadanland",
    "Yoruba royalty",
    "traditional ruler",
    "Nigerian culture",
    "chieftaincy",
    "palace",
    "Baale",
    "Mogaji",
    "Balogun",
  ],
  authors: [{ name: "Palace of the Olubadan of Ibadanland" }],
  icons: {
    icon: "/the king.jpeg",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Olubadan Palace",
    title: "Olubadan of Ibadanland | Official Royal Palace Website",
    description:
      "The official digital home of the Olubadan of Ibadanland. Discover royal history, chieftaincy traditions, and palace news.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olubadan of Ibadanland | Official Royal Palace Website",
    description:
      "The official digital home of the Olubadan of Ibadanland. Discover royal history, chieftaincy traditions, and palace news.",
  },
  verification: {
    google: "KeIcM4KzduDPCi0sjVxjIHa4n51lIoAnUGBjH_XCtlk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="KeIcM4KzduDPCi0sjVxjIHa4n51lIoAnUGBjH_XCtlk" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
