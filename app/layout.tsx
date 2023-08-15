"use client"

import "./styles/global.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./provider";

import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Search } from "@/components/search";
import { FormSchema } from "@/lib/types";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page");

  function onSearchSubmit(data: z.infer<typeof FormSchema>) {
    route.push(`/${data.type}?keyword=${data.keyword}&page=${pageNumber}`);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <nav className="flex w-full h-20 border-b">
              <div className="max-w-6xl w-full flex flex-wrap items-center justify-between mx-auto py-4">
                <Navigation />
                <Search onSearchSubmit={onSearchSubmit} />
              </div>
            </nav>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
