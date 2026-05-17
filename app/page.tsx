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
        {/* ── HERO ──────────────────────────────────────────── */}
        <section
          style={{
            background: "#1a1612",
            padding: "5rem 2rem 4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle radial glow — decorative only */}
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
            className="mx-auto max-w-7xl"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div
              style={{
                display: "grid",
                gap: "3rem",
                alignItems: "center",
              }}
              className="lg:grid-cols-[1.15fr_0.85fr]"
            >
              {/* Left: copy */}
              <div>
                {/* Pill tag */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(232,213,176,0.1)",
                    border: "1px solid rgba(232,213,176,0.22)",
                    color: "#E8D5B0",
                    fontSize: "0.74rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    padding: "7px 16px",
                    borderRadius: 100,
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: "#E8D5B0",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  />
                  Free online file tools
                </div>

                <h1
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                    fontWeight: 900,
                    lineHeight: 1.06,
                    color: "#F4EFE6",
                    letterSpacing: "-0.03em",
                    marginBottom: "1.25rem",
                  }}
                >
                  PDFQuick
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "#E8D5B0",
                      fontWeight: 300,
                    }}
                  >
                    tools that just work
                  </em>
                </h1>

                <p
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.75,
                    color: "#9e9485",
                    maxWidth: 500,
                    marginBottom: "2.25rem",
                  }}
                >
                  Compress images, resize photos, generate QR codes, count words,
                  and use PDF tools from one clean, fast, mobile-friendly website.
                </p>

                {/* CTA — CSS class handles hover */}
                <a href="#tools" className="pq-btn-primary">
                  Explore tools
                  <ArrowRight size={17} />
                </a>

                {/* Stats row */}
                <div
                  style={{
                    display: "flex",
                    gap: "2.5rem",
                    flexWrap: "wrap",
                    marginTop: "3rem",
                    paddingTop: "2.25rem",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[
                    { value: `${tools.length}+`, label: "Tools available" },
                    { value: "100%", label: "Browser-based" },
                    { value: "₹0", label: "Always free" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div
                        style={{
                          fontFamily: "'Fraunces', Georgia, serif",
                          fontSize: "2rem",
                          fontWeight: 700,
                          color: "#F4EFE6",
                          lineHeight: 1,
                        }}
                      >
                        {value}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
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
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ──────────────────────────────────────── */}
        <div
          style={{
            background: "#E8D5B0",
            padding: "0.8rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: "🔒", text: "Files never leave your browser" },
            { icon: "⚡", text: "No upload to servers" },
            { icon: "📱", text: "Works on mobile" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#4a3f2c",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              <span>{icon}</span>
              {text}
            </div>
          ))}
        </div>

        {/* ── TOOLS SECTION ──────────────────────────────────── */}
        <section
          id="tools"
          style={{ background: "#F4EFE6", padding: "4rem 1.5rem 5rem" }}
        >
          <div className="mx-auto max-w-7xl">
            {/* Section header */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#9e9485",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "0.5rem",
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
                    fontSize: "2.2rem",
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
                    fontSize: "1rem",
                    color: "#9e9485",
                  }}
                >
                  {tools.filter((t) => t.status === "ready").length} working now
                </span>
              </div>
              <p
                style={{
                  marginTop: "0.6rem",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "#7a6e5f",
                  maxWidth: 560,
                }}
              >
                We will make every tool fully working one by one. Start with image
                tools because they are useful and easier to launch fast.
              </p>
            </div>

            {/* Tool grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ─────────────────────────────────────── */}
        <section
          style={{
            background: "#1a1612",
            margin: "0 1.5rem 2.5rem",
            borderRadius: 20,
            padding: "3rem 2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "1.9rem",
                fontWeight: 700,
                color: "#F4EFE6",
                lineHeight: 1.2,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              All tools,{" "}
              <em
                style={{
                  color: "#E8D5B0",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                always free
              </em>
            </h2>
            <p
              style={{ fontSize: "0.9rem", color: "#6b6057", lineHeight: 1.65 }}
            >
              We&apos;re supported by ads, not subscriptions. Use every tool without
              creating an account.
            </p>
          </div>

          {/* CSS class handles hover */}
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