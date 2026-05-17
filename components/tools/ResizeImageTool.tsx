"use client";

import { Download, RefreshCw, Upload } from "lucide-react";
import { useRef, useState } from "react";

type ImageResult = {
  url: string;
  size: number;
  width: number;
  height: number;
};

export default function ResizeImageTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [original, setOriginal] = useState<ImageResult | null>(null);
  const [resized, setResized] = useState<ImageResult | null>(null);
  const [fileName, setFileName] = useState("resized-image.jpg");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [quality, setQuality] = useState(0.9);
  const [keepRatio, setKeepRatio] = useState(true);
  const [isWorking, setIsWorking] = useState(false);

  function loadImage(file?: File) {
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, "") + "-resized.jpg");
    setResized(null);

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        setOriginal({
          url: String(reader.result),
          size: file.size,
          width: image.width,
          height: image.height,
        });

        const startWidth = Math.min(image.width, 1200);
        const ratio = image.width / image.height;

        setWidth(startWidth);
        setHeight(Math.round(startWidth / ratio));
      };

      image.src = String(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function updateWidth(nextWidth: number) {
    setWidth(nextWidth);

    if (keepRatio && original) {
      const ratio = original.width / original.height;
      setHeight(Math.round(nextWidth / ratio));
    }
  }

  function updateHeight(nextHeight: number) {
    setHeight(nextHeight);

    if (keepRatio && original) {
      const ratio = original.width / original.height;
      setWidth(Math.round(nextHeight * ratio));
    }
  }

  function resizeImage() {
    if (!original) return;

    setIsWorking(true);

    const image = new Image();

    image.onload = () => {
      const targetWidth = Math.max(1, Number(width));
      const targetHeight = Math.max(1, Number(height));

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        setIsWorking(false);
        return;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, targetWidth, targetHeight);

      const url = canvas.toDataURL("image/jpeg", Number(quality));
      const size = dataUrlSize(url);

      setResized({
        url,
        size,
        width: targetWidth,
        height: targetHeight,
      });

      setIsWorking(false);
    };

    image.src = original.url;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-sm font-black transition hover:bg-gray-100"
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

        <div className="mt-5 grid gap-5">
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Width" value={width} onChange={updateWidth} />
            <NumberField label="Height" value={height} onChange={updateHeight} />
          </div>

          <label className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <input
              type="checkbox"
              checked={keepRatio}
              onChange={(event) => setKeepRatio(event.target.checked)}
              className="h-4 w-4 accent-gray-950"
            />
            Keep aspect ratio
          </label>

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
            onClick={resizeImage}
            disabled={!original || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <RefreshCw size={16} />
            {isWorking ? "Resizing..." : "Resize image"}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Preview title="Original" image={original} />
          <Preview title="Resized" image={resized} />
        </div>

        {original && resized && (
          <div className="mt-5 grid gap-3 rounded-2xl bg-gray-50 p-4 sm:grid-cols-3">
            <Stat label="Original" value={`${original.width} x ${original.height}`} />
            <Stat label="Resized" value={`${resized.width} x ${resized.height}`} />
            <Stat label="File size" value={formatBytes(resized.size)} />
          </div>
        )}

        {resized && (
          <a
            href={resized.url}
            download={fileName}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
          >
            <Download size={16} />
            Download resized image
          </a>
        )}
      </section>
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
        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
      />
    </label>
  );
}

function Preview({
  title,
  image,
}: {
  title: string;
  image: ImageResult | null;
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-black">{title}</div>
      <div className="grid aspect-square place-items-center rounded-2xl bg-gray-50 p-3">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url}
            alt={title}
            className="max-h-full max-w-full rounded-xl object-contain"
          />
        ) : (
          <span className="text-sm font-semibold text-gray-400">No image</span>
        )}
      </div>
      {image && (
        <p className="mt-2 text-xs font-semibold text-gray-500">
          {formatBytes(image.size)}
        </p>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-lg font-black">{value}</div>
      <div className="text-xs font-bold uppercase text-gray-500">{label}</div>
    </div>
  );
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