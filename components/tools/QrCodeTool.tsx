"use client";

import { Download, Link2, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";

export default function QrCodeTool() {
  const [value, setValue] = useState("https://your-site.vercel.app");
  const [size, setSize] = useState(320);
  const [foreground, setForeground] = useState("#111827");
  const [background, setBackground] = useState("#ffffff");

  const qrUrl = useMemo(() => {
    const params = new URLSearchParams({
      size: `${size}x${size}`,
      data: value || " ",
      color: foreground.replace("#", ""),
      bgcolor: background.replace("#", ""),
      format: "png",
      margin: "16",
    });

    return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
  }, [value, size, foreground, background]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">Free QR Code Generator</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Create a QR code for a website, WhatsApp link, payment link, social
          profile, phone number, email, or plain text. Download the QR code as a
          PNG image.
        </p>

        <div className="mt-6 grid gap-5">
          <label className="text-sm font-black">
            Text or URL
            <div className="mt-2 flex gap-2">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gray-950 text-white">
                <Link2 size={18} />
              </span>

              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Enter website link, WhatsApp link, UPI link, or text"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <label className="text-sm font-black">
            QR size: {size}px
            <input
              type="range"
              min="180"
              max="600"
              step="20"
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="mt-3 w-full accent-gray-950"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <ColorField
              label="QR color"
              value={foreground}
              onChange={setForeground}
            />

            <ColorField
              label="Background"
              value={background}
              onChange={setBackground}
            />
          </div>

          <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            Tip: For best scanning, use a dark QR color and a light background.
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
        <div className="grid min-h-80 place-items-center rounded-2xl bg-gray-50 p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={qrUrl}
            src={qrUrl}
            alt="Generated QR code"
            className="max-h-full max-w-full rounded-xl"
          />
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={qrUrl}
            download="qr-code.png"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
          >
            <Download size={16} />
            Download PNG
          </a>

          <button
            type="button"
            onClick={() => setValue("")}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black"
          >
            <RefreshCw size={16} />
            Clear
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-left text-sm leading-6 text-gray-600">
          <strong className="text-gray-950">Popular uses:</strong> business
          cards, product labels, restaurant menus, event posters, school
          projects, payment pages, and social media profiles.
        </div>
      </section>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-sm font-black">
      {label}
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-10 cursor-pointer border-0 bg-transparent p-0"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 outline-none"
        />
      </div>
    </label>
  );
}