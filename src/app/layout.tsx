import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import "../styles/app.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "web project for khanne's favorite movies, series, and games",
  title: "Khanne Log",
};

const RootLayout = async (props: LayoutProps<"/">) => {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="flex w-full items-center justify-between p-3">
          <Link href="/">
            <h1 className="pr-3 text-gray-400">Khanne Log</h1>
          </Link>
        </header>
        <main className="p-3">
          <div className="mx-auto max-w-screen-md">{props.children}</div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
