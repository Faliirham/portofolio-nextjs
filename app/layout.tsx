import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rizky Pratama — Fullstack Developer",
  description: "Portfolio of Rizky Pratama, a Fullstack Developer from Surabaya specializing in React, Next.js, and AI-powered applications.",
  keywords: ["fullstack developer", "next.js", "react", "surabaya", "portfolio"],
  authors: [{ name: "Rizky Pratama" }],
  openGraph: {
    title: "Rizky Pratama — Fullstack Developer",
    description: "Building digital products that matter.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
