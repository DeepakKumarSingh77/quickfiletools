// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "PDFQuick - Free Online File Tools",
//   description:
//     "Free online PDF, image, QR code, and writing tools. Fast browser-based utilities for everyday file work.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-site.vercel.app"),
  title: {
    default: "PDFQuick - Free Online File Tools",
    template: "%s | PDFQuick",
  },
  description:
    "Free online PDF, image, QR code, media, and writing tools. Compress, convert, resize, merge, split, and create files in your browser.",
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
    url: "https://your-site.vercel.app",
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