import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import { Navigation } from "./components/navigation";
import "../styles/app.css";
const inter = Inter({ subsets: ["latin"] });

const NAVIGATION_FALLBACK = <div aria-hidden className="h-4 w-28" />;

export const metadata: Metadata = {
  description: "web project for khanne's favorite movies, series, and games",
  title: "Khanne Log",
};

const RootLayout = async (props: LayoutProps<"/">) => {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-bg text-fg`}>
        <header className="border-b border-edge">
          <div className="mx-auto flex max-w-screen-md items-center justify-between px-page py-2">
            <Link
              className="rounded-sm text-body font-semibold tracking-tight text-fg transition-opacity duration-150 ease-out hover:opacity-70 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none active:opacity-50 motion-reduce:transition-none"
              href="/"
            >
              {/* eslint-disable-next-line @cspell/spellchecker */}
              <span className="text-h3 font-bold text-accent">K</span>hanne Log
            </Link>
            <Suspense fallback={NAVIGATION_FALLBACK}>
              <Navigation />
            </Suspense>
          </div>
        </header>
        <main className="min-h-[calc(100vh-8rem)] px-page py-8">
          <div className="mx-auto max-w-screen-md">{props.children}</div>
        </main>
        <footer className="border-t border-edge">
          <div className="mx-auto max-w-screen-md px-page py-6 text-center">
            <p className="text-caption text-subtle">&copy; 2026 Khanne</p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
