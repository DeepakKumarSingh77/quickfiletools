import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quickfiletools-six.vercel.app/"),
  title: {
    default: "PDFQuick - Free Online File Tools",
    template: "%s | PDFQuick",
  },
  description:
    "Free online PDF, image, QR code, media, and writing tools. Compress, convert, resize, merge, split, and create files in your browser.",
  
  verification: {
    google: "2XUNBJoY6kJEjd5zkFXvEAY5psx9dVbG4-69dyKTSTg", // 👈 paste from Search Console
  },


  keywords: [
    "free PDF tools",
    "compress PDF",
    "merge PDF",
    "split PDF",
    "compress image",
    "resize image",
    "JPG to PDF",
    "PDF to JPG",
    "QR code generator",
    "word counter",
  ],
  openGraph: {
    title: "PDFQuick - Free Online File Tools",
    description:
      "Free online PDF, image, QR code, media, and writing tools for everyday file work.",
    url: "https://quickfiletools-six.vercel.app",
    siteName: "PDFQuick",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}