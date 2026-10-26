import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* WebMCP bridge: registers the /mcp tools on navigator.modelContext
            for in-page agents. No-op in browsers without WebMCP. */}
        <Script src="/mcp?webmcp-script" strategy="lazyOnload" />
      </body>
      <Analytics />
    </html>
  );
}
