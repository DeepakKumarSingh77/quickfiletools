"use client";

import { Download, RotateCw, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { degrees, PDFDocument } from "pdf-lib";

type Rotation = 90 | 180 | 270;

type PdfInfo = {
  file: File;
  name: string;
  size: number;
  pageCount: number;
};

export default function RotatePdfTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [pdfInfo, setPdfInfo] = useState<PdfInfo | null>(null);
  const [rotation, setRotation] = useState<Rotation>(90);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState("");

  async function loadFile(file?: File) {
    if (!file) return;

    setPdfInfo(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      setPdfInfo({
        file,
        name: file.name,
        size: file.size,
        pageCount: pdf.getPageCount(),
      });
    } catch {
      setError(
        "Could not read this PDF. It may be password-protected, encrypted, damaged, or restricted."
      );
    }
  }

  function clearFile() {
    setPdfInfo(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function rotatePdf() {
    if (!pdfInfo || isWorking) return;

    setIsWorking(true);
    setError("");

    try {
      const bytes = await pdfInfo.file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotation) % 360));
      });

      const rotatedBytes = await pdf.save();
      const blob = new Blob([new Uint8Array(rotatedBytes)], {
  type: "application/pdf",
});
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "rotated-pdf.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch {
      setError("Could not rotate this PDF. Try a normal unlocked PDF file.");
    } finally {
      setIsWorking(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-sm font-black text-gray-950 transition hover:bg-gray-100"
        >
          <Upload size={18} />
          Upload PDF file
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={(event) => loadFile(event.target.files?.[0])}
          className="hidden"
        />

        <div className="mt-5 grid gap-4">
          <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            Rotate every page in your PDF and download a corrected file.
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          <div>
            <div className="mb-2 text-sm font-black text-gray-950">
              Rotation
            </div>

            <div className="grid grid-cols-3 gap-2">
              {([90, 180, 270] as Rotation[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRotation(item)}
                  className={`rounded-xl border px-4 py-3 text-sm font-black ${
                    rotation === item
                      ? "border-gray-950 bg-gray-950 text-white"
                      : "border-gray-200 bg-white text-gray-950"
                  }`}
                >
                  {item}°
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={rotatePdf}
            disabled={!pdfInfo || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <RotateCw size={16} />
            {isWorking ? "Rotating PDF..." : "Rotate PDF"}
          </button>

          {pdfInfo && (
            <button
              type="button"
              onClick={clearFile}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-950"
            >
              <X size={16} />
              Clear PDF
            </button>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-gray-950">Selected PDF</h2>

        {pdfInfo ? (
          <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="truncate text-sm font-black text-gray-950">
              {pdfInfo.name}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Stat label="File size" value={formatBytes(pdfInfo.size)} />
              <Stat label="Pages" value={pdfInfo.pageCount} />
              <Stat label="Rotation" value={`${rotation}°`} />
            </div>

            <button
              type="button"
              onClick={rotatePdf}
              disabled={isWorking}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white disabled:bg-gray-300"
            >
              <Download size={16} />
              {isWorking ? "Preparing..." : "Download rotated PDF"}
            </button>
          </div>
        ) : (
          <div className="mt-5 grid min-h-72 place-items-center rounded-2xl bg-gray-50 p-5 text-center text-sm font-semibold text-gray-500">
            Upload a PDF to see file details.
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string | number; value: string | number }) {
  return (
    <div>
      <div className="text-lg font-black text-gray-950">{value}</div>
      <div className="text-xs font-bold uppercase text-gray-500">{label}</div>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}