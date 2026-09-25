import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { FloatingSocials } from "@/components/layout/FloatingSocials";
import { brandData } from "@/data/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: `${brandData.name} | ${brandData.tagline}`,
  description: brandData.description,

  openGraph: {
    title: `${brandData.name} | ${brandData.tagline}`,
    description: brandData.description,
    url: "https://srbuilders.london/",
    siteName: brandData.name,
    images: [
      {
        url: "https://srbuilders.london/images/HomeBanner.png",
        width: 1200,
        height: 630,
        alt: `${brandData.name} - ${brandData.tagline}`,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {children}
        <FloatingSocials />
      </body>
    </html>
  );
}
