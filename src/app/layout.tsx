import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/app.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "khanne이 좋아하는 영화, 드라마, 게임을 기록하는 웹 프로젝트",
  title: "Khanne Log",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex w-full flex-row-reverse">
          <h1 className="pt-2 pr-3 text-gray-400">Khanne Log</h1>
        </header>
        <main className="p-5">
          <div className="mx-auto max-w-screen-md">{children}</div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
