import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { hasLocale, NextIntlClientProvider } from "next-intl";

import { routing } from "@/i18n/routing";

import { CountrySelect } from "../root-layout/CountrySelect";

import "../../styles/app.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "web project for khanne's favorite movies, series, and games",
  title: "Khanne Log",
};

const RootLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <header className="flex w-full items-center justify-between p-3">
            <h1 className="pr-3 text-gray-400">Khanne Log</h1>
            <CountrySelect />
          </header>
          <main className="p-3">
            <div className="mx-auto max-w-screen-md">{children}</div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
