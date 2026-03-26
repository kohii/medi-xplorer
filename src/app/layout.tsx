
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import "./globals.css";
import { Providers } from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: process.env.URL ? new URL(process.env.URL) : undefined,
  title: "MediXplorer - 診療行為・医薬品マスタービューアー",
  description: "MediXplorerは社会保険診療報酬支払基金から提供される診療行為マスター・医薬品マスターを検索・閲覧するためのアプリケーションです。",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: "/og.png",
    siteName: "MediXplorer",
    type: "website",
  },
  twitter: {
    card: "summary",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="h-full">
      <body className={inter.className + " h-full bg-white leading-tight"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
