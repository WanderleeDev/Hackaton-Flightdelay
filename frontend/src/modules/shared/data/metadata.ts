import { Metadata } from "next";

export const METADATA: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Flight Search Engine",
    template: "%s | Flight Prediction",
  },
  description: "AI-powered flight route and safety prediction engine.",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "%s | Flight Search Engine | Flight Prediction",
    description: "AI-powered flight route and safety prediction engine.",
    images: [
      {
        url: "/screen.webp",
        width: 1200,
        height: 630,
        alt: "Flight Search Engine Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "%s | Flight Search Engine | Flight Prediction",
    description: "AI-powered flight route and safety prediction engine.",
    images: ["/screen.webp"],
  },
};
