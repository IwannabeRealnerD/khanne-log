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
      <body className={`${inter.className} bg-bg text-fg`}>
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-screen-md items-center justify-between px-page py-2">
            <Link className="text-body font-semibold tracking-tight text-fg" href="/">
              <span className="text-h3 font-bold text-accent">K</span>hanne Log
            </Link>
            <nav className="flex gap-4">
              <Link className="text-caption text-muted transition-colors hover:text-accent" href="/">
                Home
              </Link>
              <Link className="text-caption text-muted transition-colors hover:text-accent" href="/lines?page=1">
                Lines
              </Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100vh-8rem)] px-page py-8">
          <div className="mx-auto max-w-screen-md">{props.children}</div>
        </main>
        <footer className="border-t border-border">
          <div className="mx-auto max-w-screen-md px-page py-6 text-center">
            <p className="text-caption text-subtle">&copy; 2026 Khanne</p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
