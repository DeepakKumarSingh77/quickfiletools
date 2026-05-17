import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1612", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mx-auto max-w-7xl" style={{ padding: "0 2rem" }}>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            padding: "3rem 0 2.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.9rem" }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  background: "#E8D5B0",
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1612"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#F4EFE6",
                }}
              >
                PDFQuick
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "#6b6057", maxWidth: 260 }}>
              Free online PDF, image, QR, and writing tools built for fast daily
              work. No sign-up required.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: "1.25rem" }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: "#4caf70",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "0.75rem", color: "#5c5347" }}>
                All systems operational
              </span>
            </div>
          </div>

          {/* Tools column */}
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#6b6057",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Tools
            </div>
            <div style={{ display: "grid", gap: "0.55rem" }}>
              {[
                { href: "/tools/compress-image", label: "Compress Image" },
                { href: "/tools/resize-image", label: "Resize Image" },
                { href: "/tools/qr-code-generator", label: "QR Generator" },
                { href: "/tools/word-counter", label: "Word Counter" },
                { href: "/tools/merge-pdf", label: "Merge PDF" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="pq-footer-link">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#6b6057",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Company
            </div>
            <div style={{ display: "grid", gap: "0.55rem" }}>
              {[
                { href: "/about", label: "About" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Use" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="pq-footer-link">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 0",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.78rem", color: "#433d38" }}>
            © {new Date().getFullYear()} PDFQuick. Free forever.
          </span>
          <span style={{ fontSize: "0.78rem", color: "#433d38" }}>
            Made with ♥ for everyday file work
          </span>
        </div>
      </div>
    </footer>
  );
}