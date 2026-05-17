"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: "#1a1612",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0.875rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              background: "#E8D5B0",
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1612"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="13" y2="17" />
            </svg>
          </span>
          <span
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#F4EFE6",
              letterSpacing: "-0.01em",
            }}
          >
            PDFQuick
          </span>
        </Link>

        {/* Desktop nav — CSS hides on mobile */}
        <nav className="pq-desktop-nav">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="pq-nav-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* CTA hidden on mobile via CSS */}
          <Link href="/#tools" className="pq-header-cta">
            Try Free
          </Link>

          {/* Hamburger — CSS hides on sm+ */}
          <button
            className="pq-hamburger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          style={{
            background: "#1e1a14",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "1rem 1.25rem 1.25rem",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="pq-mobile-link"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#tools"
            className="pq-mobile-cta"
            onClick={() => setOpen(false)}
          >
            Try Free →
          </Link>
        </div>
      )}
    </header>
  );
}