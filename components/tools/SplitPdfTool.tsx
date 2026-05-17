"use client";

import { Download, Scissors, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";

type PdfInfo = {
  file: File;
  name: string;
  size: number;
  pageCount: number;
};

export default function SplitPdfTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [pdfInfo, setPdfInfo] = useState<PdfInfo | null>(null);
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState("");

  async function loadFile(file?: File) {
    if (!file) return;

    setError("");
    setPdfInfo(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pageCount = pdf.getPageCount();

      setPdfInfo({
        file,
        name: file.name,
        size: file.size,
        pageCount,
      });

      setFromPage(1);
      setToPage(pageCount);
    } catch {
      setError(
        "Could not read this PDF. It may be password-protected, encrypted, damaged, or restricted."
      );
    }
  }

  function clearFile() {
    setPdfInfo(null);
    setError("");
    setFromPage(1);
    setToPage(1);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function splitPdf() {
    if (!pdfInfo || isWorking) return;

    const safeFrom = Math.max(1, Math.min(fromPage, pdfInfo.pageCount));
    const safeTo = Math.max(1, Math.min(toPage, pdfInfo.pageCount));

    if (safeFrom > safeTo) {
      setError("Start page cannot be greater than end page.");
      return;
    }

    setIsWorking(true);
    setError("");

    try {
      const bytes = await pdfInfo.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();

      const pageIndices = Array.from(
        { length: safeTo - safeFrom + 1 },
        (_, index) => safeFrom - 1 + index
      );

      const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(newBytes)], {
  type: "application/pdf",
});
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `split-pages-${safeFrom}-to-${safeTo}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch {
      setError(
        "Could not split this PDF. Try a normal unlocked PDF file."
      );
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
            Upload one normal, unlocked PDF and choose the pages you want to
            extract.
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="From page"
              value={fromPage}
              onChange={setFromPage}
              max={pdfInfo?.pageCount || 1}
            />
            <NumberField
              label="To page"
              value={toPage}
              onChange={setToPage}
              max={pdfInfo?.pageCount || 1}
            />
          </div>

          <button
            type="button"
            onClick={splitPdf}
            disabled={!pdfInfo || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Scissors size={16} />
            {isWorking ? "Splitting PDF..." : "Split PDF"}
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
            <div className="text-sm font-black text-gray-950">
              {pdfInfo.name}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Stat label="File size" value={formatBytes(pdfInfo.size)} />
              <Stat label="Pages" value={pdfInfo.pageCount} />
              <Stat
                label="Extracting"
                value={`${fromPage} - ${toPage}`}
              />
            </div>

            <button
              type="button"
              onClick={splitPdf}
              disabled={isWorking}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white disabled:bg-gray-300"
            >
              <Download size={16} />
              {isWorking ? "Preparing..." : "Download split PDF"}
            </button>
          </div>
        ) : (
          <div className="mt-5 grid min-h-72 place-items-center rounded-2xl bg-gray-50 p-5 text-center text-sm font-semibold text-gray-500">
            Upload a PDF to see page details.
          </div>
        )}
      </section>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
}) {
  return (
    <label className="text-sm font-black text-gray-950">
      {label}
      <input
        type="number"
        min="1"
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
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