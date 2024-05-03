import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './prism-duotone-dark.css';
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blog @ orels.sh",
  description: "orels1 types words... and you read them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
        <nav className="w-full py-4 px-4 flex items-center gap-4 justify-between border-b-[1px] border-b-zinc-700">
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-sky-500">Blog</Link>
            <Link href="https://tips.orels.sh" className="hover:text-sky-500">Knowledge Base</Link>
            <Link href="https://github.com/orels1" className="hover:text-sky-500">GitHub</Link>
          </div>
        </nav>
        <main>
          <div className="relative mx-auto max-w-screen-xl gap-x-6 px-4 py-10 md:flex md:flex-row md:py-10 md:px-10">
            {children}
          </div>
        </main>
      </div>
      </body>
    </html>
  );
}
