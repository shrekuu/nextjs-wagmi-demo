import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import GitHubRibbon from "./_components/GitHubRibbon";

export const metadata: Metadata = {
  title: "MetaMask & OKX Wallet Test",
  description: "Test MetaMask and OKX wallet on mobile and desktop environments.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <GitHubRibbon />
      </body>
    </html>
  );
}
