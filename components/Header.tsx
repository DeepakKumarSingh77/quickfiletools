"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div
        className="mx-auto max-w-7xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 36,
              height: 36,
              background: "#E8D5B0",
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1612"
              strokeWidth="2.2"
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
              fontSize: "1.15rem",
              color: "#F4EFE6",
              letterSpacing: "-0.01em",
            }}
          >
            PDFQuick
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="hidden sm:flex">
          <Link href="/#tools" className="pq-nav-link">Tools</Link>
          <Link href="/about" className="pq-nav-link">About</Link>
          <Link href="/contact" className="pq-nav-link">Contact</Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/#tools" className="pq-header-cta">
            Try Free
          </Link>

          {/* Mobile toggle */}
          <button
            className="sm:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9e9485",
              padding: 4,
              display: "flex",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "#221e18",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {[
            { href: "/#tools", label: "Tools" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: "0.95rem", fontWeight: 500, color: "#9e9485" }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}