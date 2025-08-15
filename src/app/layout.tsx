import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import "../styles/app.css";
import { GLOBAL_INTERNAL_URL } from "@/constants/internal-url";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "web project for khanne's favorite movies, series, and games",
  title: "Khanne Log",
};

const RootLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <header className="flex w-full items-center justify-between p-3">
          <Link href={GLOBAL_INTERNAL_URL.ROOT}>
            <h1 className="pr-3 text-gray-400">Khanne Log</h1>
          </Link>
        </header>
        <main className="p-3">
          <div className="mx-auto max-w-screen-md">{children}</div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
