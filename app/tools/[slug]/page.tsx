import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Shield, Zap, Gift, ArrowRight } from "lucide-react";
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
    title: `${tool.title} Online Free (No Upload) – PDFQuick`,
    description: `Use this free ${tool.title.toLowerCase()} tool online. No upload required, fast and secure.`,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) notFound();

  const Icon = tool.icon;
  const isReady = tool.status === "ready";

  // Related tools (same category, exclude current)
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <main style={{ minHeight: "100vh", background: "#F4EFE6" }}>

      {/* ── HERO HEADER ─────────────────────────────────── */}
      <div style={{ background: "#1a1612", padding: "1.5rem 1.25rem 0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Back button */}
          <Link href="/" className="pq-back-btn" style={{ marginBottom: "1.5rem" }}>
            <ArrowLeft size={14} />
            All tools
          </Link>

          {/* Hero content */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1.5rem",
              paddingBottom: "2rem",
            }}
          >
            <div style={{ flex: 1, minWidth: 260 }}>
              {/* Icon + category row */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.1rem" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "#E8D5B0",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={25} color="#1a1612" strokeWidth={1.8} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#6b6057",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 3,
                    }}
                  >
                    {tool.category}
                  </div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: isReady ? "rgba(74,175,112,0.15)" : "rgba(251,191,36,0.15)",
                      border: isReady ? "1px solid rgba(74,175,112,0.3)" : "1px solid rgba(251,191,36,0.3)",
                      color: isReady ? "#a8d5bc" : "#fbbf24",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 100,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {isReady ? <CheckCircle2 size={11} /> : <Clock3 size={11} />}
                    {isReady ? "Working" : "Coming soon"}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                  fontWeight: 900,
                  color: "#F4EFE6",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "0.6rem",
                }}
              >
                {tool.title}
              </h1>

              {/* Description */}
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#7a6e5f", maxWidth: 480 }}>
                {tool.description}
              </p>
            </div>

            {/* Trust pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingBottom: 4 }}>
              {[
                { icon: "🔒", text: "Files stay local" },
                { icon: "⚡", text: "No upload" },
                { icon: "✅", text: "100% Free" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#7a6e5f",
                  }}
                >
                  <span>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Curved divider */}
      <div style={{ background: "#1a1612", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 28" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,28 C360,0 1080,0 1440,28 L1440,28 L0,28 Z" fill="#F4EFE6" />
        </svg>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "1.5rem 1.25rem 4rem" }}>

        {/* Tool workspace card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e4ddd2",
            borderRadius: 20,
            padding: "1.75rem",
            boxShadow: "0 4px 24px rgba(26,22,18,0.07)",
            marginBottom: "2rem",
          }}
        >
          <ToolWorkspace slug={tool.slug} />
        </div>

        {/* ── FEATURE CARDS ──────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.85rem",
            marginBottom: "2.5rem",
          }}
        >
          {[
            {
              Icon: Shield,
              color: "#4ade80",
              bg: "rgba(74,222,128,0.08)",
              border: "rgba(74,222,128,0.2)",
              title: "100% Private",
              desc: "Your files never leave your device. Processing happens locally in your browser.",
            },
            {
              Icon: Zap,
              color: "#fb923c",
              bg: "rgba(251,146,60,0.08)",
              border: "rgba(251,146,60,0.2)",
              title: "Instant Results",
              desc: "No server round-trip. Files are processed immediately without any wait time.",
            },
            {
              Icon: Gift,
              color: "#E8D5B0",
              bg: "rgba(232,213,176,0.08)",
              border: "rgba(232,213,176,0.2)",
              title: "Always Free",
              desc: "No sign-up, no subscription, no limits. Every tool is free to use forever.",
            },
          ].map(({ Icon: FeatureIcon, color, bg, border, title, desc }) => (
            <div
              key={title}
              style={{
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: "1.25rem",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: border,
                  display: "grid",
                  placeItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <FeatureIcon size={18} color={color} />
              </div>
              <div
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#1a1612",
                  marginBottom: "0.3rem",
                }}
              >
                {title}
              </div>
              <div style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#7a6e5f" }}>
                {desc}
              </div>
            </div>
          ))}
        </div>

        {/* ── SEO SECTION ────────────────────────────── */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e4ddd2",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {/* Section header */}
          <div
            style={{
              background: "#1a1612",
              padding: "1.25rem 1.75rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#F4EFE6",
              }}
            >
              About this tool
            </span>
          </div>

          <div style={{ padding: "1.75rem", color: "#4a3f2c", lineHeight: 1.75 }}>

            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#1a1612",
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
              }}
            >
              {tool.title} Online Free (No Upload Required)
            </h2>

            <p style={{ fontSize: "0.9rem", marginBottom: "1.25rem", color: "#5c5347" }}>
              Use this free online {tool.title.toLowerCase()} tool to process your files
              directly in your browser. Your files never leave your device, ensuring
              full privacy and fast performance.
            </p>

            {/* How to use */}
            <div
              style={{
                background: "#F4EFE6",
                borderRadius: 14,
                padding: "1.25rem 1.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#1a1612",
                  marginBottom: "0.75rem",
                }}
              >
                How to use {tool.title}
              </h3>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {[
                  "Upload your file",
                  "Choose settings if available",
                  "Click process",
                  "Download result instantly",
                ].map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#1a1612",
                        color: "#E8D5B0",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "0.88rem", color: "#4a3f2c" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why use */}
            <div
              style={{
                background: "#F4EFE6",
                borderRadius: 14,
                padding: "1.25rem 1.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#1a1612",
                  marginBottom: "0.75rem",
                }}
              >
                Why use this tool?
              </h3>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {[
                  "No upload required — files stay on your device",
                  "Works entirely inside your browser",
                  "Fast, secure, and private",
                  "Completely free with no account needed",
                ].map((point) => (
                  <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <CheckCircle2 size={15} color="#4ade80" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.88rem", color: "#4a3f2c" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <h3
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#1a1612",
                marginBottom: "0.75rem",
              }}
            >
              Frequently Asked Questions
            </h3>

            <div style={{ display: "grid", gap: "0.75rem" }}>
              {[
                {
                  q: `Is my file secure when using ${tool.title}?`,
                  a: "Yes. Your files are processed entirely in your browser and never sent to any server. Only you can see your files.",
                },
                {
                  q: `Is this ${tool.title} tool free?`,
                  a: "Yes, completely free. No sign-up, no subscription, no hidden charges. All tools on PDFQuick are free forever.",
                },
                {
                  q: "Do I need to install anything?",
                  a: "No installation needed. Everything runs in your browser. Works on desktop, tablet, and mobile.",
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  style={{
                    borderRadius: 12,
                    border: "1px solid #e4ddd2",
                    padding: "1rem 1.25rem",
                    background: "#faf8f4",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      color: "#1a1612",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {q}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#7a6e5f", lineHeight: 1.65 }}>
                    {a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED TOOLS ──────────────────────────── */}
        {relatedTools.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#1a1612",
                marginBottom: "1rem",
                letterSpacing: "-0.01em",
              }}
            >
              Related {tool.category} tools
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "0.85rem",
              }}
            >
              {relatedTools.map((related) => {
                const RelatedIcon = related.icon;
                return (
                  <Link
                    key={related.slug}
                    href={`/tools/${related.slug}`}
                    className="pq-tool-card"
                    style={{ padding: "1rem" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.6rem" }}>
                      <span
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: "#1a1612",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <RelatedIcon size={17} color="#E8D5B0" strokeWidth={1.8} />
                      </span>
                      <span
                        style={{
                          fontFamily: "'Fraunces', Georgia, serif",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "#1a1612",
                        }}
                      >
                        {related.title}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#7a6e5f", lineHeight: 1.55, margin: 0 }}>
                      {related.description}
                    </p>
                    <div className="pq-tool-card-arrow" style={{ marginTop: "0.75rem" }}>
                      Open tool <ArrowRight size={13} strokeWidth={2.5} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── BOTTOM CTA ─────────────────────────────── */}
        <div
          style={{
            background: "#1a1612",
            borderRadius: 18,
            padding: "2rem 1.75rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#F4EFE6",
                marginBottom: "0.3rem",
              }}
            >
              More free tools
            </div>
            <div style={{ fontSize: "0.85rem", color: "#6b6057" }}>
              16 tools available — all free, all browser-based.
            </div>
          </div>
          <Link
            href="/#tools"
            className="pq-cta-btn"
          >
            Browse all tools
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </main>
  );
}

// import Link from "next/link";
// import { ArrowLeft, CheckCircle2, Clock3 } from "lucide-react";
// import { notFound } from "next/navigation";
// import ToolWorkspace from "@/components/ToolWorkspace";
// import { getTool, tools } from "@/lib/tools";

// type PageProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// export function generateStaticParams() {
//   return tools.map((tool) => ({
//     slug: tool.slug,
//   }));
// }

// export async function generateMetadata({ params }: PageProps) {
//   const { slug } = await params;
//   const tool = getTool(slug);

//   if (!tool) {
//     return { title: "Tool Not Found" };
//   }

//   return {
//     title: `${tool.title} - PDFQuick`,
//     description: `${tool.description} Use this free online ${tool.title.toLowerCase()} tool.`,
//   };
// }

// export default async function ToolPage({ params }: PageProps) {
//   const { slug } = await params;
//   const tool = getTool(slug);

//   if (!tool) notFound();

//   const Icon = tool.icon;
//   const isReady = tool.status === "ready";

//   return (
//     <main
//       style={{
//         minHeight: "100vh",
//         background: "#F4EFE6",
//         padding: "1.75rem 1.25rem",
//       }}
//     >
//       <div className="mx-auto max-w-5xl">

//         {/* Back button — CSS class handles hover */}
//         <Link href="/" className="pq-back-btn">
//           <ArrowLeft size={15} />
//           All tools
//         </Link>

//         {/* Tool header card */}
//         <div
//           style={{
//             background: "#1a1612",
//             borderRadius: 20,
//             padding: "2rem",
//             marginBottom: "1.25rem",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           {/* Decorative radial glow */}
//           <div
//             aria-hidden="true"
//             style={{
//               position: "absolute",
//               top: -60,
//               right: -60,
//               width: 280,
//               height: 280,
//               background:
//                 "radial-gradient(circle, rgba(232,213,176,0.07) 0%, transparent 70%)",
//               pointerEvents: "none",
//             }}
//           />

//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               alignItems: "flex-start",
//               justifyContent: "space-between",
//               gap: "1rem",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <div>
//               {/* Icon */}
//               <div
//                 style={{
//                   width: 54,
//                   height: 54,
//                   borderRadius: 14,
//                   background: "#E8D5B0",
//                   display: "grid",
//                   placeItems: "center",
//                   marginBottom: "1.25rem",
//                 }}
//               >
//                 <Icon size={26} color="#1a1612" strokeWidth={1.8} />
//               </div>

//               {/* Category */}
//               <p
//                 style={{
//                   fontSize: "0.73rem",
//                   fontWeight: 700,
//                   color: "#9e9485",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.1em",
//                   marginBottom: "0.4rem",
//                 }}
//               >
//                 {tool.category}
//               </p>

//               {/* Title */}
//               <h1
//                 style={{
//                   fontFamily: "'Fraunces', Georgia, serif",
//                   fontSize: "clamp(1.9rem, 4vw, 3rem)",
//                   fontWeight: 900,
//                   color: "#F4EFE6",
//                   letterSpacing: "-0.03em",
//                   lineHeight: 1.1,
//                   marginBottom: "0.75rem",
//                 }}
//               >
//                 {tool.title}
//               </h1>

//               {/* Description */}
//               <p
//                 style={{
//                   fontSize: "1rem",
//                   lineHeight: 1.7,
//                   color: "#7a6e5f",
//                   maxWidth: 520,
//                 }}
//               >
//                 {tool.description}
//               </p>
//             </div>

//             {/* Status badge */}
//             <span
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 7,
//                 borderRadius: 10,
//                 padding: "8px 16px",
//                 fontSize: "0.8rem",
//                 fontWeight: 700,
//                 letterSpacing: "0.03em",
//                 textTransform: "uppercase",
//                 flexShrink: 0,
//                 background: isReady
//                   ? "rgba(220,240,228,0.12)"
//                   : "rgba(255,243,224,0.12)",
//                 border: isReady
//                   ? "1px solid rgba(74,175,112,0.3)"
//                   : "1px solid rgba(251,191,36,0.3)",
//                 color: isReady ? "#a8d5bc" : "#fbbf24",
//               }}
//             >
//               {isReady ? <CheckCircle2 size={15} /> : <Clock3 size={15} />}
//               {isReady ? "Working tool" : "Coming soon"}
//             </span>
//           </div>
//         </div>

//         {/* Workspace card */}
//         <div
//           style={{
//             background: "#ffffff",
//             border: "1px solid #e4ddd2",
//             borderRadius: 20,
//             padding: "1.75rem",
//             boxShadow: "0 2px 12px rgba(26,22,18,0.05)",
//           }}
//         >
//           <ToolWorkspace slug={tool.slug} />
//         </div>

//         {/* Trust row */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "2rem",
//             marginTop: "1.5rem",
//             flexWrap: "wrap",
//           }}
//         >
//           {[
//             "🔒 Files stay in your browser",
//             "⚡ No server upload",
//             "✅ 100% free",
//           ].map((item) => (
//             <span
//               key={item}
//               style={{ fontSize: "0.78rem", color: "#9e9485", fontWeight: 500 }}
//             >
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }