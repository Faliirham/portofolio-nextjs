import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fali Irham Maulana — Portfolio",
  description: "Portfolio of Fali Irham Maulana, a Student from Malang specializing in React, Next.js, and AI-powered applications.",
  keywords: ["student", "next.js", "react", "malang", "portfolio"],
  authors: [{ name: "Fali Irham Maulana" }],
  openGraph: {
    title: "Fali Irham Maulana — Portfolio",
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
