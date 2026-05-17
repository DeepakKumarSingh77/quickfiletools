"use client";

import { Download, FileArchive, Upload, X } from "lucide-react";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";

type Mode = "safe" | "hard";

type PdfResult = {
  url: string;
  originalSize: number;
  compressedSize: number;
  pageCount: number;
  mode: Mode;
};

export default function CompressPdfTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<PdfResult | null>(null);
  const [mode, setMode] = useState<Mode>("hard");
  const [quality, setQuality] = useState(0.55);
  const [scale, setScale] = useState(1.2);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState("");

  async function loadFile(selectedFile?: File) {
    if (!selectedFile) return;

    setFile(selectedFile);
    setResult(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function clearFile() {
    setFile(null);
    setResult(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function compressPdf() {
    if (!file || isWorking) return;

    setIsWorking(true);
    setError("");
    setResult(null);

    try {
      if (mode === "safe") {
        await safeCompress();
      } else {
        await hardCompress();
      }
    } catch {
      setError(
        "Could not compress this PDF. It may be password-protected, encrypted, damaged, or restricted."
      );
    } finally {
      setIsWorking(false);
    }
  }

  async function safeCompress() {
    if (!file) return;

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    pdf.setTitle("");
    pdf.setAuthor("");
    pdf.setSubject("");
    pdf.setKeywords([]);
    pdf.setProducer("");
    pdf.setCreator("");
    pdf.setCreationDate(new Date(0));
    pdf.setModificationDate(new Date(0));

    const compressedBytes = await pdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });

    const blob = new Blob([new Uint8Array(compressedBytes)], {
  type: "application/pdf",
});
    const url = URL.createObjectURL(blob);

    setResult({
      url,
      originalSize: file.size,
      compressedSize: compressedBytes.length,
      pageCount: pdf.getPageCount(),
      mode: "safe",
    });
  }

  async function hardCompress() {
    if (!file) return;

    const pdfjsLib = await getPdfJs();
    const bytes = await file.arrayBuffer();
    const data = new Uint8Array(bytes);

    const sourcePdf = await pdfjsLib.getDocument({
  data,
  disableWorker: true,
} as any).promise;

    let outputPdf: jsPDF | null = null;

    for (let pageNumber = 1; pageNumber <= sourcePdf.numPages; pageNumber++) {
      const page = await sourcePdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) continue;

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      const imageUrl = canvas.toDataURL("image/jpeg", quality);
      const orientation = canvas.width > canvas.height ? "landscape" : "portrait";

      const pageWidthMm = canvas.width * 0.264583;
      const pageHeightMm = canvas.height * 0.264583;

      if (!outputPdf) {
        outputPdf = new jsPDF({
          orientation,
          unit: "mm",
          format: [pageWidthMm, pageHeightMm],
          compress: true,
        });
      } else {
        outputPdf.addPage([pageWidthMm, pageHeightMm], orientation);
      }

      outputPdf.addImage(imageUrl, "JPEG", 0, 0, pageWidthMm, pageHeightMm);
    }

    if (!outputPdf) {
      throw new Error("No pages converted");
    }

    const blob = outputPdf.output("blob");
    const url = URL.createObjectURL(blob);

    setResult({
      url,
      originalSize: file.size,
      compressedSize: blob.size,
      pageCount: sourcePdf.numPages,
      mode: "hard",
    });
  }

  const savedPercent =
    result && result.originalSize > 0
      ? Math.max(
          0,
          Math.round(
            ((result.originalSize - result.compressedSize) /
              result.originalSize) *
              100
          )
        )
      : 0;

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
            Hard compression can make PDFs much smaller by converting pages to
            compressed images. Text may not remain selectable.
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          <div>
            <div className="mb-2 text-sm font-black text-gray-950">
              Compression method
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setMode("safe");
                  setResult(null);
                }}
                className={`rounded-xl border px-4 py-3 text-left ${
                  mode === "safe"
                    ? "border-gray-950 bg-gray-950 text-white"
                    : "border-gray-200 bg-white text-gray-950"
                }`}
              >
                <div className="text-sm font-black">Keep text quality</div>
                <div className="mt-1 text-xs opacity-75">
                  Smaller reduction, best quality
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("hard");
                  setResult(null);
                }}
                className={`rounded-xl border px-4 py-3 text-left ${
                  mode === "hard"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-white text-gray-950"
                }`}
              >
                <div className="text-sm font-black">Hard compress</div>
                <div className="mt-1 text-xs opacity-75">
                  Smaller file, lower image quality
                </div>
              </button>
            </div>
          </div>

          {mode === "hard" && (
            <>
              <label className="text-sm font-black text-gray-950">
                Image quality: {Math.round(quality * 100)}%
                <input
                  type="range"
                  min="0.25"
                  max="0.9"
                  step="0.05"
                  value={quality}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                    setResult(null);
                  }}
                  className="mt-3 w-full accent-gray-950"
                />
              </label>

              <label className="text-sm font-black text-gray-950">
                Page resolution: {scale.toFixed(1)}x
                <input
                  type="range"
                  min="0.8"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(event) => {
                    setScale(Number(event.target.value));
                    setResult(null);
                  }}
                  className="mt-3 w-full accent-gray-950"
                />
              </label>
            </>
          )}

          <button
            type="button"
            onClick={compressPdf}
            disabled={!file || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FileArchive size={16} />
            {isWorking ? "Compressing PDF..." : "Compress PDF"}
          </button>

          {file && (
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
        <h2 className="text-xl font-black text-gray-950">Compression result</h2>

        {file ? (
          <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="truncate text-sm font-black text-gray-950">
              {file.name}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <Stat label="Original" value={formatBytes(file.size)} />
              <Stat
                label="Compressed"
                value={result ? formatBytes(result.compressedSize) : "-"}
              />
              <Stat label="Saved" value={result ? `${savedPercent}%` : "-"} />
              <Stat
                label="Mode"
                value={
                  result
                    ? result.mode === "hard"
                      ? "Hard"
                      : "Safe"
                    : mode === "hard"
                      ? "Hard"
                      : "Safe"
                }
              />
            </div>

            {result && result.compressedSize >= result.originalSize && (
              <div className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm font-semibold leading-6 text-orange-800">
                This PDF did not become smaller. Try Hard compress with lower
                image quality.
              </div>
            )}

            {result && (
              <a
                href={result.url}
                download="compressed-pdf.pdf"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
              >
                <Download size={16} />
                Download compressed PDF
              </a>
            )}
          </div>
        ) : (
          <div className="mt-5 grid min-h-72 place-items-center rounded-2xl bg-gray-50 p-5 text-center text-sm font-semibold text-gray-500">
            Upload a PDF to see compression details.
          </div>
        )}
      </section>
    </div>
  );
}

async function getPdfJs() {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  return pdfjsLib;
}

function Stat({ label, value }: { label: string; value: string }) {
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