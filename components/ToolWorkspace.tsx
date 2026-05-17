"use client";

import { useMemo, useRef, useState } from "react";
import { Download, ImageIcon, Link2, RefreshCw, Upload } from "lucide-react";
import CompressImageTool from "@/components/tools/CompressImageTool";
import ResizeImageTool from "@/components/tools/ResizeImageTool";
import QrCodeTool from "@/components/tools/QrCodeTool";
import WordCounterTool from "@/components/tools/WordCounterTool";
import CropImageTool from "@/components/tools/CropImageTool";
import ImageConverterTool from "@/components/tools/ImageConverterTool";
import AdvancedPassportPhotoTool from "@/components/tools/PassportPhotoTool";
import JpgToPdfTool from "@/components/tools/JpgToPdfTool";
import MergePdfTool from "@/components/tools/MergePdfTool";
import SplitPdfTool from "@/components/tools/SplitPdfTool";
import PdfToJpgTool from "@/components/tools/PdfToJpgTool";
import RotatePdfTool from "@/components/tools/RotatePdfTool";
import CompressPdfTool from "@/components/tools/CompressPdfTool";
import UnlockPdfTool from "@/components/tools/UnlockPdfTool";
import Mp4ToMp3Tool from "@/components/tools/Mp4ToMp3Tool";
import RemoveBackgroundTool from "@/components/tools/RemoveBackgroundTool";


export default function ToolWorkspace({ slug }: { slug: string }) {
  if (slug === "word-counter") return <WordCounterTool />;
  if (slug === "qr-code-generator") return <QrCodeTool />;
  if (slug === "resize-image") return <ResizeImageTool />;
  if (slug === "compress-image") return <CompressImageTool />;
  if (slug === "passport-size-photo") return <AdvancedPassportPhotoTool />;
  if (slug === "crop-image") return <CropImageTool />;
  if (slug === "image-converter") return <ImageConverterTool />;
  if (slug === "jpg-to-pdf") return <JpgToPdfTool />;
  if (slug === "merge-pdf") return <MergePdfTool />;
  if (slug === "split-pdf") return <SplitPdfTool />;
  if (slug === "pdf-to-jpg") return <PdfToJpgTool />;
  if (slug === "rotate-pdf") return <RotatePdfTool />;
  if (slug === "compress-pdf") return <CompressPdfTool />;
  // if (slug === "unlock-pdf") return <UnlockPdfTool />;
  if (slug === "mp4-to-mp3") return <Mp4ToMp3Tool />;
  if (slug === "remove-background") return <RemoveBackgroundTool />;

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6">
      <h2 className="text-xl font-black">Tool coming soon</h2>
      <p className="mt-2 text-gray-600">
        This page is ready. We will add the real tool engine in the next phase.
      </p>
    </div>
  );
}

function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.trim()
      ? text.split(/[.!?]+/).filter(Boolean).length
      : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return { words, characters, charactersNoSpaces, sentences, minutes };
  }, [text]);

  return (
    <div className="grid gap-5">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Paste or type your text here..."
        className="min-h-64 w-full resize-y rounded-lg border border-gray-200 bg-white p-4 leading-7 outline-none focus:border-blue-500"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Words" value={stats.words} />
        <Stat label="Characters" value={stats.characters} />
        <Stat label="No spaces" value={stats.charactersNoSpaces} />
        <Stat label="Sentences" value={stats.sentences} />
        <Stat label="Read time" value={`${stats.minutes} min`} />
      </div>
    </div>
  );
}

function QrGenerator() {
  const [value, setValue] = useState("https://pdfquick.vercel.app");
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    value || " "
  )}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div>
        <label className="text-sm font-black">Text or URL</label>
        <div className="mt-2 flex gap-2">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-gray-950 text-white">
            <Link2 size={18} />
          </span>

          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 outline-none focus:border-blue-500"
            placeholder="Enter a link or message"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 text-center shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrUrl} alt="Generated QR code" className="mx-auto h-72 w-72" />

        <a
          href={qrUrl}
          download="qr-code.png"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-3 text-sm font-bold text-white"
        >
          <Download size={16} />
          Download PNG
        </a>
      </div>
    </div>
  );
}

function ImageTool({ mode }: { mode: "resize" | "compress" }) {
  const [source, setSource] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [quality, setQuality] = useState(0.7);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function loadImage(file?: File) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSource(String(reader.result));
      setResult(null);
    };
    reader.readAsDataURL(file);
  }

  function processImage() {
    if (!source) return;

    const image = new Image();

    image.onload = () => {
      const ratio = image.width / image.height;

      const targetWidth =
        mode === "resize" ? Number(width) : Math.min(image.width, 1400);

      const targetHeight =
        mode === "resize" ? Number(height) : Math.round(targetWidth / ratio);

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.width = Math.max(1, targetWidth);
      canvas.height = Math.max(1, targetHeight);

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const compressed = canvas.toDataURL("image/jpeg", Number(quality));
      setResult(compressed);
    };

    image.src = source;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-sm font-bold"
        >
          <Upload size={18} />
          Choose image
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => loadImage(event.target.files?.[0])}
          className="hidden"
        />

        <div className="mt-5 grid gap-4">
          {mode === "resize" && (
            <div className="grid grid-cols-2 gap-3">
              <NumberField label="Width" value={width} onChange={setWidth} />
              <NumberField label="Height" value={height} onChange={setHeight} />
            </div>
          )}

          <label className="text-sm font-black">
            Quality: {Math.round(quality * 100)}%
            <input
              type="range"
              min="0.2"
              max="1"
              step="0.02"
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="mt-3 w-full accent-gray-950"
            />
          </label>

          <button
            type="button"
            onClick={processImage}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-bold text-white"
          >
            <RefreshCw size={16} />
            {mode === "resize" ? "Resize image" : "Reduce image size"}
          </button>
        </div>
      </div>

      <PreviewPanel source={result || source} downloadName={`${mode}-image.jpg`} />
    </div>
  );
}


function PreviewPanel({
  source,
  downloadName,
}: {
  source: string | null;
  downloadName: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="grid min-h-72 place-items-center rounded-lg bg-gray-50 p-4">
        {source ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={source}
            alt="Preview"
            className="max-h-[460px] max-w-full rounded-lg object-contain"
          />
        ) : (
          <div className="text-center text-sm font-semibold text-gray-500">
            Preview appears here
          </div>
        )}
      </div>

      {source && (
        <a
          href={source}
          download={downloadName}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-3 text-sm font-bold text-white"
        >
          <Download size={16} />
          Download
        </a>
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="text-sm font-black">
      {label}
      <input
        type="number"
        min="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 outline-none focus:border-blue-500"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-2xl font-black">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase text-gray-500">
        {label}
      </div>
    </div>
  );
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const offsetX = x + (width - drawWidth) / 2;
  const offsetY = y + (height - drawHeight) / 2;

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}