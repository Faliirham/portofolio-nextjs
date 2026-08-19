import type { Metadata } from "next";
import { Space_Grotesk, Orbitron } from "next/font/google";
import { getConfig } from "@/lib/content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://faliirham.pages.dev";

const config = getConfig();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Fali Irham Maulana — Portfolio",
  description: `${config.role} from ${config.location}. ${config.tagline}.`,
  keywords: ["student", "next.js", "react", "malang", "portfolio", "full-stack", "AI", "developer"],
  authors: [{ name: config.name }],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${config.name} — Portfolio`,
    description: `${config.role} from ${config.location}. ${config.tagline}.`,
    url: SITE_URL,
    siteName: config.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: `${config.name} — ${config.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.name} — Portfolio`,
    description: `${config.role} from ${config.location}. ${config.tagline}.`,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: config.name,
      url: SITE_URL,
      jobTitle: config.role,
      email: `mailto:${config.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: config.location.split(",")[0],
        addressCountry: "ID",
      },
      sameAs: [
        config.social.github,
        config.social.linkedin,
        config.social.instagram,
      ].filter(Boolean),
    },
    {
      "@type": "WebSite",
      name: config.name,
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}