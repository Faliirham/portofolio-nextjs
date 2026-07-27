import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fali Irham Maulana — Portfolio",
  description: "Full-Stack Developer & AI Engineer from Malang, Indonesia. Building scalable systems with data & intelligence.",
  keywords: ["student", "next.js", "react", "malang", "portfolio", "full-stack", "AI", "developer"],
  authors: [{ name: "Fali Irham Maulana" }],
  openGraph: {
    title: "Fali Irham Maulana — Portfolio",
    description: "Full-Stack Developer & AI Engineer. Building scalable systems with data & intelligence.",
    url: "https://faliirham.pages.dev",
    siteName: "Fali Irham Maulana",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fali Irham Maulana — Portfolio",
    description: "Full-Stack Developer & AI Engineer. Building scalable systems with data & intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
