"use client";

import { Download, RefreshCcw, Upload } from "lucide-react";
import { useRef, useState } from "react";

type OutputFormat = "jpeg" | "png" | "webp";

type ImageResult = {
  url: string;
  size: number;
  width: number;
  height: number;
};

const formatLabels: Record<OutputFormat, string> = {
  jpeg: "JPG",
  png: "PNG",
  webp: "WebP",
};

const mimeTypes: Record<OutputFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export default function ImageConverterTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [original, setOriginal] = useState<ImageResult | null>(null);
  const [converted, setConverted] = useState<ImageResult | null>(null);
  const [format, setFormat] = useState<OutputFormat>("webp");
  const [quality, setQuality] = useState(0.88);
  const [fileName, setFileName] = useState("converted-image.webp");
  const [isWorking, setIsWorking] = useState(false);

  function loadImage(file?: File) {
    if (!file) return;

    setConverted(null);
    setFileName(file.name.replace(/\.[^/.]+$/, "") + `.${formatExtension(format)}`);

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
      };

      image.src = String(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function convertImage() {
    if (!original) return;

    setIsWorking(true);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        setIsWorking(false);
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;

      if (format === "jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0);

      const mimeType = mimeTypes[format];
      const url =
        format === "png"
          ? canvas.toDataURL(mimeType)
          : canvas.toDataURL(mimeType, quality);

      setConverted({
        url,
        size: dataUrlSize(url),
        width: image.width,
        height: image.height,
      });

      setFileName(`converted-image.${formatExtension(format)}`);
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
          <div>
            <div className="mb-2 text-sm font-black">Output format</div>
            <div className="grid grid-cols-3 gap-2">
              {(["jpeg", "png", "webp"] as OutputFormat[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setFormat(item);
                    setConverted(null);
                    setFileName(`converted-image.${formatExtension(item)}`);
                  }}
                  className={`rounded-xl border px-4 py-3 text-sm font-black ${
                    format === item
                      ? "border-gray-950 bg-gray-950 text-white"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {formatLabels[item]}
                </button>
              ))}
            </div>
          </div>

          {format !== "png" && (
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
          )}

          <button
            type="button"
            onClick={convertImage}
            disabled={!original || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <RefreshCcw size={16} />
            {isWorking ? "Converting..." : "Convert image"}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Preview title="Original" image={original} />
          <Preview title="Converted" image={converted} />
        </div>

        {original && converted && (
          <div className="mt-5 grid gap-3 rounded-2xl bg-gray-50 p-4 sm:grid-cols-3">
            <Stat label="Original" value={formatBytes(original.size)} />
            <Stat label="Converted" value={formatBytes(converted.size)} />
            <Stat label="Format" value={formatLabels[format]} />
          </div>
        )}

        {converted && (
          <a
            href={converted.url}
            download={fileName}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
          >
            <Download size={16} />
            Download converted image
          </a>
        )}
      </section>
    </div>
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
          {image.width} x {image.height} px
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

function formatExtension(format: OutputFormat) {
  if (format === "jpeg") return "jpg";
  return format;
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