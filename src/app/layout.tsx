
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: process.env.URL ? new URL(process.env.URL) : undefined,
  title: "MediXplorer - 医科診療行為マスタービューアー",
  description: "厚生労働省から提供される医科診療行為マスターを検索・閲覧するためのアプリケーションです。",
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
        {children}
      </body>
    </html >
  );
}
