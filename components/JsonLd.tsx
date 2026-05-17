// components/JsonLd.tsx
// Drop this component into your homepage and tool pages for rich search results.

// ── Homepage usage ──────────────────────────────────────────────────
// Add <HomeJsonLd /> anywhere inside <main> on app/page.tsx

export function HomeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PDFQuick",
    url: "https://quickfiletools-six.vercel.app",
    description:
      "Free online PDF, image, QR code, and writing tools. Fast browser-based utilities for everyday file work.",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://quickfiletools-six.vercel.app/#tools?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Tool page usage ─────────────────────────────────────────────────
// Add <ToolJsonLd tool={tool} /> inside the tool page <main>

import type { Tool } from "@/lib/tools";

export function ToolJsonLd({ tool }: { tool: Tool }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Web Browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    url: `https://quickfiletools-six.vercel.app/tools/${tool.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}