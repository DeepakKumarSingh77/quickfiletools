import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import ToolWorkspace from "@/components/ToolWorkspace";
import { getTool, tools } from "@/lib/tools";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  return {
    title: `${tool.title} - PDFQuick`,
    description: `${tool.description} Use this free online ${tool.title.toLowerCase()} tool.`,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) notFound();

  const Icon = tool.icon;
  const isReady = tool.status === "ready";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F4EFE6",
        padding: "1.75rem 1.25rem",
      }}
    >
      <div className="mx-auto max-w-5xl">

        {/* Back button — CSS class handles hover */}
        <Link href="/" className="pq-back-btn">
          <ArrowLeft size={15} />
          All tools
        </Link>

        {/* Tool header card */}
        <div
          style={{
            background: "#1a1612",
            borderRadius: 20,
            padding: "2rem",
            marginBottom: "1.25rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative radial glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 280,
              height: 280,
              background:
                "radial-gradient(circle, rgba(232,213,176,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              {/* Icon */}
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: "#E8D5B0",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <Icon size={26} color="#1a1612" strokeWidth={1.8} />
              </div>

              {/* Category */}
              <p
                style={{
                  fontSize: "0.73rem",
                  fontWeight: 700,
                  color: "#9e9485",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.4rem",
                }}
              >
                {tool.category}
              </p>

              {/* Title */}
              <h1
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "clamp(1.9rem, 4vw, 3rem)",
                  fontWeight: 900,
                  color: "#F4EFE6",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "0.75rem",
                }}
              >
                {tool.title}
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "#7a6e5f",
                  maxWidth: 520,
                }}
              >
                {tool.description}
              </p>
            </div>

            {/* Status badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                flexShrink: 0,
                background: isReady
                  ? "rgba(220,240,228,0.12)"
                  : "rgba(255,243,224,0.12)",
                border: isReady
                  ? "1px solid rgba(74,175,112,0.3)"
                  : "1px solid rgba(251,191,36,0.3)",
                color: isReady ? "#a8d5bc" : "#fbbf24",
              }}
            >
              {isReady ? <CheckCircle2 size={15} /> : <Clock3 size={15} />}
              {isReady ? "Working tool" : "Coming soon"}
            </span>
          </div>
        </div>

        {/* Workspace card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e4ddd2",
            borderRadius: 20,
            padding: "1.75rem",
            boxShadow: "0 2px 12px rgba(26,22,18,0.05)",
          }}
        >
          <ToolWorkspace slug={tool.slug} />
        </div>

        {/* Trust row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            "🔒 Files stay in your browser",
            "⚡ No server upload",
            "✅ 100% free",
          ].map((item) => (
            <span
              key={item}
              style={{ fontSize: "0.78rem", color: "#9e9485", fontWeight: 500 }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}