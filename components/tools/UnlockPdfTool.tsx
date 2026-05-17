"use client";

import { FileLock2 } from "lucide-react";

export default function UnlockPdfTool() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-orange-700">
          <FileLock2 size={22} />
        </span>

        <div>
          <h2 className="text-xl font-black text-gray-950">
            Unlock PDF Coming Soon
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            This tool needs a proper PDF password engine. We are keeping it
            disabled for now so users do not get broken output.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
        For launch, use the working PDF tools: merge, split, rotate, compress,
        JPG to PDF, and PDF to JPG.
      </div>
    </div>
  );
}