import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";
import { ArrowRight, ShieldCheck, Zap, Globe2 } from "lucide-react";


export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section
          style={{
            background: "#1a1612",
            padding: "3.5rem 1.25rem 3rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 80% at 65% 40%, #2d2519 0%, #1a1612 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            {/* Two-column on lg, single column on mobile */}
            <div className="pq-hero-grid">

              {/* ── Left: Copy ── */}
              <div>
                {/* Pill tag */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: "rgba(232,213,176,0.1)",
                    border: "1px solid rgba(232,213,176,0.2)",
                    color: "#E8D5B0",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    borderRadius: 100,
                    marginBottom: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: "#E8D5B0",
                      borderRadius: "50%",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  Free online file tools
                </div>

                {/* Headline */}
                <h1
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(2.4rem, 8vw, 4.2rem)",
                    fontWeight: 900,
                    lineHeight: 1.06,
                    color: "#F4EFE6",
                    letterSpacing: "-0.03em",
                    marginBottom: "1rem",
                  }}
                >
                  PDFQuick
                  <br />
                  <em style={{ fontStyle: "italic", color: "#E8D5B0", fontWeight: 300 }}>
                    tools that just work
                  </em>
                </h1>

                {/* Sub-copy */}
                <p
                  style={{
                    fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                    lineHeight: 1.75,
                    color: "#9e9485",
                    maxWidth: 500,
                    marginBottom: "2rem",
                  }}
                >
                  Compress images, resize photos, generate QR codes, count words, and
                  use PDF tools — all free, all in your browser.
                </p>

                {/* CTA */}
                <a href="#tools" className="pq-btn-primary">
                  Explore tools
                  <ArrowRight size={17} />
                </a>

                {/* Mini stats */}
                <div className="pq-stats-row">
                  {[
                    { value: `${tools.length}+`, label: "Tools available" },
                    { value: "100%", label: "Browser-based" },
                    { value: "₹0", label: "Always free" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div
                        style={{
                          fontFamily: "'Fraunces', Georgia, serif",
                          fontSize: "clamp(1.6rem, 4vw, 2rem)",
                          fontWeight: 700,
                          color: "#F4EFE6",
                          lineHeight: 1,
                        }}
                      >
                        {value}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "#6b6057",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginTop: 4,
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: feature card (desktop only via CSS) ── */}
              

            </div>
          </div>
        </section>

        {/* ── TRUST BAR ──────────────────────────────────── */}
        <div className="pq-trust-bar">
          {[
            { icon: "🔒", text: "Files stay in your browser" },
            { icon: "⚡", text: "No server upload" },
            { icon: "📱", text: "Works on mobile" },
          ].map(({ icon, text }) => (
            <div key={text} className="pq-trust-item">
              <span>{icon}</span>
              {text}
            </div>
          ))}
        </div>

        {/* ── TOOLS SECTION ──────────────────────────────── */}
        <section
          id="tools"
          style={{ background: "#F4EFE6", padding: "3rem 1.25rem 4rem" }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>

            {/* Section header */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#9e9485",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "0.4rem",
                }}
              >
                All tools
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
                    fontWeight: 700,
                    color: "#1a1612",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  Popular tools
                </h2>
                <span
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: "#9e9485",
                  }}
                >
                  {tools.filter((t) => t.status === "ready").length} working now
                </span>
              </div>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  color: "#7a6e5f",
                  maxWidth: 520,
                }}
              >
                We will make every tool fully working one by one. Start with image
                tools because they are useful and easier to launch fast.
              </p>
            </div>

            {/* Tool grid — responsive via CSS class */}
            <div className="pq-tool-grid">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ─────────────────────────────────── */}
        <section
          style={{
            background: "#1a1612",
            margin: "0 1rem 2rem",
            borderRadius: 18,
            padding: "2.5rem 1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "clamp(1.5rem, 4vw, 1.9rem)",
                fontWeight: 700,
                color: "#F4EFE6",
                lineHeight: 1.2,
                marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              All tools,{" "}
              <em style={{ color: "#E8D5B0", fontStyle: "italic", fontWeight: 300 }}>
                always free
              </em>
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#6b6057", lineHeight: 1.65 }}>
              Supported by ads, not subscriptions. No account needed.
            </p>
          </div>

          <a href="#tools" className="pq-cta-btn">
            Browse all tools
            <ArrowRight size={17} />
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}