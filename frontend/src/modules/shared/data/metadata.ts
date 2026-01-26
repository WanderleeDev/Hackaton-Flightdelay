import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#00a8e8", // brand-accent
};

const titleTemplate = {
  default: "Flight Prediction",
  template: "%s | Flight Prediction",
} as const;

export const METADATA: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  title: titleTemplate,
  description: "AI-powered flight route and safety prediction engine.",
  alternates: {
    canonical: "/",
  },
  robots: "index, follow",
  openGraph: {
    title: titleTemplate,
    description: "AI-powered flight route and safety prediction engine.",
    type: "website",
    siteName: "Flight Prediction",
    locale: "es_ES",
    images: ["/opengraph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate,
    description: "AI-powered flight route and safety prediction engine.",
    images: ["/opengraph.png"],
  },
};
