"use client";

import { Download, FilePlus2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";

type PdfItem = {
  id: string;
  file: File;
  name: string;
  size: number;
};

export default function MergePdfTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<PdfItem[]>([]);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState("");

  function loadFiles(fileList?: FileList | null) {
    if (!fileList) return;

    setError("");

    const selectedFiles = Array.from(fileList).filter(
      (file) => file.type === "application/pdf"
    );

    if (inputRef.current) inputRef.current.value = "";

    const nextFiles = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
    }));

    setFiles((current) => [...current, ...nextFiles]);
  }

  function removeFile(id: string) {
    setFiles((current) => current.filter((file) => file.id !== id));
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function clearFiles() {
    setFiles([]);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function mergePdfs() {
    if (files.length < 2 || isWorking) return;

    setIsWorking(true);
    setError("");

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        let pdf: PDFDocument;

        try {
          const bytes = await item.file.arrayBuffer();
          pdf = await PDFDocument.load(bytes);
        } catch {
          throw new Error(
            `"${item.name}" cannot be merged. It may be password-protected, encrypted, damaged, or restricted.`
          );
        }

        const pageIndices = pdf.getPageIndices();

        if (pageIndices.length === 0) {
          throw new Error(`"${item.name}" has no readable pages.`);
        }

        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();

      if (mergedPdf.getPageCount() === 0) {
        throw new Error("No readable pages were found.");
      }

      const blob = new Blob([new Uint8Array(mergedBytes)], {
  type: "application/pdf",
});
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged-pdf.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not merge these PDFs. Try normal unlocked PDF files."
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
          Upload PDF files
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={(event) => loadFiles(event.target.files)}
          className="hidden"
        />

        <div className="mt-5 grid gap-4">
          <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            Add at least 2 normal, unlocked PDF files. Files are processed in
            your browser.
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={mergePdfs}
            disabled={files.length < 2 || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FilePlus2 size={16} />
            {isWorking ? "Merging PDFs..." : "Merge PDFs"}
          </button>

          {files.length > 0 && (
            <button
              type="button"
              onClick={clearFiles}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-950"
            >
              Clear all PDFs
            </button>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-gray-950">Selected PDFs</h2>
            <p className="mt-1 text-sm text-gray-500">
              {files.length} file{files.length === 1 ? "" : "s"} selected
            </p>
          </div>

          {files.length >= 2 && (
            <button
              type="button"
              onClick={mergePdfs}
              disabled={isWorking}
              className="hidden items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white disabled:bg-gray-300 sm:inline-flex"
            >
              <Download size={16} />
              {isWorking ? "Merging..." : "Download merged PDF"}
            </button>
          )}
        </div>

        {files.length > 0 ? (
          <div className="mt-5 grid gap-3">
            {files.map((file, index) => (
              <div
                key={file.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-black text-gray-950">
                    {index + 1}. {file.name}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-gray-500">
                    {formatBytes(file.size)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-gray-950 shadow-sm"
                  aria-label="Remove PDF"
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid min-h-72 place-items-center rounded-2xl bg-gray-50 p-5 text-center text-sm font-semibold text-gray-500">
            Upload PDF files to preview the merge order.
          </div>
        )}
      </section>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}