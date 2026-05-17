// Put this in app/tools/[slug]/page.tsx
// Replace your existing generateMetadata with this version

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) return { title: "Tool Not Found" };

  const title = `${tool.title} - Free Online Tool | PDFQuick`;
  const description = `${tool.description} Free, fast, and works directly in your browser. No sign-up or download needed.`;
  const url = `https://quickfiletools-six.vercel.app/tools/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "PDFQuick",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}