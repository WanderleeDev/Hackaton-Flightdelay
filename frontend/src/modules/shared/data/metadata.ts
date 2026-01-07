import { Metadata } from "next";

const titleTemplate = {
  default: "Flight Search Engine",
  template: "%s | Flight Prediction",
} as const;

export const METADATA: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  icons: {
    icon: "/favicon.svg",
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
    locale: "en_US",
    images: ["/opengraph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate,
    description: "AI-powered flight route and safety prediction engine.",
  },
};
