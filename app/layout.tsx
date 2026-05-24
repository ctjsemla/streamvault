import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { RootProviders } from "@/components/providers/RootProviders";
import { PageTransition } from "@/components/providers/PageTransition";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StreamVault — Live Streaming Talent Management",
    template: "%s | StreamVault",
  },
  description:
    "The premier live streaming talent agency in the United States. Exclusive management and brand partnerships for Twitch, YouTube, Kick, and TikTok Live creators.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SessionProvider>
          <RootProviders>
            <SiteChrome>
              <PageTransition>{children}</PageTransition>
            </SiteChrome>
          </RootProviders>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
