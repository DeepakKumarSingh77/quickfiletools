"use client";

import { Download, FileImage, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

type ConvertedPage = {
  page: number;
  url: string;
  width: number;
  height: number;
  size: number;
};

type PdfInfo = {
  file: File;
  name: string;
  size: number;
  pageCount: number;
};

export default function PdfToJpgTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [pdfInfo, setPdfInfo] = useState<PdfInfo | null>(null);
  const [pages, setPages] = useState<ConvertedPage[]>([]);
  const [scale, setScale] = useState(1.5);
  const [quality, setQuality] = useState(0.9);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState("");

  async function loadFile(file?: File) {
    if (!file) return;

    setError("");
    setPages([]);
    setPdfInfo(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    try {
      const pdfjsLib = await getPdfJs();
      const bytes = await file.arrayBuffer();
      const data = new Uint8Array(bytes);

      const pdf = await pdfjsLib.getDocument({
  data,
  disableWorker: true,
} as any).promise;

      setPdfInfo({
        file,
        name: file.name,
        size: file.size,
        pageCount: pdf.numPages,
      });
    } catch (err) {
      console.error(err);
      setError(
        "Could not read this PDF. Try a normal unlocked PDF file. Some secured PDFs cannot be converted in the browser."
      );
    }
  }

  function clearFile() {
    setPdfInfo(null);
    setPages([]);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function convertPdf() {
    if (!pdfInfo || isWorking) return;

    setIsWorking(true);
    setError("");
    setPages([]);

    try {
      const pdfjsLib = await getPdfJs();
      const bytes = await pdfInfo.file.arrayBuffer();
      const data = new Uint8Array(bytes);

      const pdf = await pdfjsLib.getDocument({
  data,
  disableWorker: true,
} as any).promise;

      const convertedPages: ConvertedPage[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
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

        const url = canvas.toDataURL("image/jpeg", quality);

        convertedPages.push({
          page: pageNumber,
          url,
          width: canvas.width,
          height: canvas.height,
          size: dataUrlSize(url),
        });
      }

      setPages(convertedPages);
    } catch (err) {
      console.error(err);
      setError("Could not convert this PDF. Try a normal unlocked PDF file.");
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
            Convert each PDF page into a JPG image in your browser.
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          <label className="text-sm font-black text-gray-950">
            Image scale: {scale.toFixed(1)}x
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
              className="mt-3 w-full accent-gray-950"
            />
          </label>

          <label className="text-sm font-black text-gray-950">
            JPG quality: {Math.round(quality * 100)}%
            <input
              type="range"
              min="0.4"
              max="1"
              step="0.02"
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="mt-3 w-full accent-gray-950"
            />
          </label>

          <button
            type="button"
            onClick={convertPdf}
            disabled={!pdfInfo || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FileImage size={16} />
            {isWorking ? "Converting..." : "Convert PDF to JPG"}
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
        <h2 className="text-xl font-black text-gray-950">Converted pages</h2>

        {pdfInfo && (
          <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm font-semibold text-gray-600">
            {pdfInfo.name} - {pdfInfo.pageCount} page
            {pdfInfo.pageCount === 1 ? "" : "s"}
          </div>
        )}

        {pages.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {pages.map((page) => (
              <div
                key={page.page}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={page.url}
                  alt={`Page ${page.page}`}
                  className="h-64 w-full rounded-xl object-contain"
                />

                <div className="mt-3 text-sm font-black text-gray-950">
                  Page {page.page}
                </div>

                <div className="mt-1 text-xs font-semibold text-gray-500">
                  {page.width} x {page.height}px - {formatBytes(page.size)}
                </div>

                <a
                  href={page.url}
                  download={`page-${page.page}.jpg`}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white"
                >
                  <Download size={15} />
                  Download JPG
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid min-h-72 place-items-center rounded-2xl bg-gray-50 p-5 text-center text-sm font-semibold text-gray-500">
            Upload and convert a PDF to see JPG pages here.
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

function dataUrlSize(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] || "";
  return Math.round((base64.length * 3) / 4);
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}