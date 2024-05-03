import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './prism-duotone-dark.css';
import "./globals.css";
import Link from "next/link";
import DarkmodeToggle from "@/components/DarkmodeToggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'orels\' Blog',
  description: 'orels1 types words... and you read them',
  metadataBase: new URL('https://blog.orels.sh'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blog.orels.sh',
    description: 'orels1 types words... and you read them',
    title: 'orels\' Blog',
    siteName: 'orels\' Blog',
    images: '/orels-tips-splash.png',
  },
  twitter: {
    site: '@orels1_',
    card: 'summary_large_image',
    description: 'orels1 types words... and you read them',
    title: 'orels\' Blog',
    images: '/orels-blog-splash.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'dark')}>
        <div className="flex min-h-screen flex-col min-w-screen dark:bg-[#201f29] dark:text-[#d9d9d9] bg-zinc-100 text-zinc-900 transition-colors">
          <nav className="w-full py-2 px-4 flex items-center gap-4 justify-between border-b-[1px] border-b-zinc-200 dark:border-b-zinc-700 flex-wrap">
            <div className="flex items-center gap-6 flex-wrap">
              <Link href="/" className="hover:text-sky-500">Blog</Link>
              <Link href="https://tips.orels.sh" className="hover:text-sky-500">Knowledge Base</Link>
              <Link href="https://github.com/orels1" className="hover:text-sky-500">GitHub</Link>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link href="https://twitter.com/orels1_" target="_blank">
                <Button variant="ghost" size="icon"><TwitterIcon /></Button>
              </Link>
              <DarkmodeToggle />
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
