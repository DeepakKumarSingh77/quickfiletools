import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://quickfiletools-six.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PDFQuick – Free Online PDF & Image Tools",
    template: "%s | PDFQuick",
  },
  description:
    "Free online tools to compress images, resize photos, merge PDFs, generate QR codes, and more. Fast, private, and browser-based — no sign-up needed.",
  
  verification: {
    google: "2XUNBJoY6kJEjd5zkFXvEAY5psx9dVbG4-69dyKTSTg", // 👈 paste from Search Console
    other: {
      "msvalidate.01":["FECC996082E1D5514A9B45F9F804789C"],
    },
  },
  keywords: [
    "compress image",
    "resize image",
    "merge pdf",
    "pdf to jpg",
    "qr code generator",
    "word counter",
    "free online tools",
    "image converter",
    "remove background",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "PDFQuick",
    title: "PDFQuick – Free Online PDF & Image Tools",
    description:
      "Compress images, convert PDFs, generate QR codes and more — all free, all in your browser.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "PDFQuick – Free Online PDF & Image Tools",
    description:
      "Compress images, convert PDFs, generate QR codes and more — all free, all in your browser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}