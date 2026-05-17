"use client";

import { Download, ImageIcon, Upload } from "lucide-react";
import { useRef, useState } from "react";

type PhotoSize = "india" | "two-inch";
type LayoutType = "single" | "four" | "six" | "eight";

type ImageResult = {
  url: string;
  size: number;
  width: number;
  height: number;
};

const photoSizes: Record<
  PhotoSize,
  { label: string; width: number; height: number; note: string }
> = {
  india: {
    label: "India Passport 35 x 45 mm",
    width: 413,
    height: 531,
    note: "Common 35x45mm photo size at 300 DPI.",
  },
  "two-inch": {
    label: "2 x 2 inch",
    width: 600,
    height: 600,
    note: "Common square passport/visa photo size at 300 DPI.",
  },
};

const layouts: Record<
  LayoutType,
  { label: string; columns: number; rows: number; note: string }
> = {
  single: {
    label: "Single photo",
    columns: 1,
    rows: 1,
    note: "Download one passport photo.",
  },
  four: {
    label: "4-photo sheet",
    columns: 2,
    rows: 2,
    note: "Good for quick printing and cutting.",
  },
  six: {
    label: "6-photo sheet",
    columns: 3,
    rows: 2,
    note: "More copies on one printable sheet.",
  },
  eight: {
    label: "8-photo sheet",
    columns: 4,
    rows: 2,
    note: "Best for maximum copies.",
  },
};

export default function PassportPhotoTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [original, setOriginal] = useState<ImageResult | null>(null);
  const [sheet, setSheet] = useState<ImageResult | null>(null);
  const [photoSize, setPhotoSize] = useState<PhotoSize>("india");
  const [layout, setLayout] = useState<LayoutType>("four");
  const [background, setBackground] = useState("#ffffff");
  const [fileName, setFileName] = useState("passport-photo-sheet.jpg");
  const [isWorking, setIsWorking] = useState(false);

  function loadImage(file?: File) {
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, "") + "-passport-photo.jpg");
    setSheet(null);

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

  function createSheet() {
    if (!original) return;

    setIsWorking(true);

    const image = new Image();

    image.onload = () => {
      const size = photoSizes[photoSize];
      const selectedLayout = layouts[layout];
      const gap = layout === "single" ? 0 : 28;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        setIsWorking(false);
        return;
      }

      canvas.width =
        size.width * selectedLayout.columns +
        gap * Math.max(0, selectedLayout.columns + 1);

      canvas.height =
        size.height * selectedLayout.rows +
        gap * Math.max(0, selectedLayout.rows + 1);

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < selectedLayout.rows; row++) {
        for (let col = 0; col < selectedLayout.columns; col++) {
          const x = layout === "single" ? 0 : gap + col * (size.width + gap);
          const y = layout === "single" ? 0 : gap + row * (size.height + gap);

          context.fillStyle = background;
          context.fillRect(x, y, size.width, size.height);

          drawContain(context, image, x, y, size.width, size.height);

          if (layout !== "single") {
            context.strokeStyle = "#d1d5db";
            context.lineWidth = 2;
            context.strokeRect(x, y, size.width, size.height);
          }
        }
      }

      const url = canvas.toDataURL("image/jpeg", 0.92);

      setSheet({
        url,
        size: dataUrlSize(url),
        width: canvas.width,
        height: canvas.height,
      });

      setFileName(
        layout === "single"
          ? "passport-photo.jpg"
          : `${layout}-passport-photo-sheet.jpg`
      );

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
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-sm font-black text-gray-950 transition hover:bg-gray-100"
        >
          <Upload size={18} />
          Upload portrait photo
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
            <div className="mb-2 text-sm font-black text-gray-950">
              Photo size
            </div>

            <div className="grid gap-2">
              {(Object.keys(photoSizes) as PhotoSize[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setPhotoSize(key);
                    setSheet(null);
                  }}
                  className={`rounded-xl border px-4 py-3 text-left ${
                    photoSize === key
                      ? "border-gray-950 bg-gray-950 text-white"
                      : "border-gray-200 bg-white text-gray-950"
                  }`}
                >
                  <div className="text-sm font-black">
                    {photoSizes[key].label}
                  </div>
                  <div
                    className={`mt-1 text-xs ${
                      photoSize === key ? "text-gray-200" : "text-gray-500"
                    }`}
                  >
                    {photoSizes[key].note}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-black text-gray-950">
              Output layout
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(layouts) as LayoutType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setLayout(key);
                    setSheet(null);
                  }}
                  className={`rounded-xl border px-4 py-3 text-left ${
                    layout === key
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 bg-white text-gray-950"
                  }`}
                >
                  <div className="text-sm font-black">{layouts[key].label}</div>
                  <div
                    className={`mt-1 text-xs ${
                      layout === key ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {layouts[key].note}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <label className="text-sm font-black text-gray-950">
            Background color
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
              <input
                type="color"
                value={background}
                onChange={(event) => {
                  setBackground(event.target.value);
                  setSheet(null);
                }}
                className="h-9 w-10 cursor-pointer border-0 bg-transparent p-0"
              />
              <input
                value={background}
                onChange={(event) => {
                  setBackground(event.target.value);
                  setSheet(null);
                }}
                className="min-w-0 flex-1 text-gray-950 outline-none"
              />
            </div>
          </label>

          <button
            type="button"
            onClick={createSheet}
            disabled={!original || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ImageIcon size={16} />
            {isWorking ? "Creating..." : "Create passport photo"}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Preview title="Original" image={original} />
          <Preview title="Result" image={sheet} />
        </div>

        {sheet && (
          <div className="mt-5 grid gap-3 rounded-2xl bg-gray-50 p-4 sm:grid-cols-3">
            <Stat label="Width" value={`${sheet.width}px`} />
            <Stat label="Height" value={`${sheet.height}px`} />
            <Stat label="File size" value={formatBytes(sheet.size)} />
          </div>
        )}

        {sheet && (
          <a
            href={sheet.url}
            download={fileName}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
          >
            <Download size={16} />
            Download result
          </a>
        )}

        <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          Tip: Use a clear front-facing photo with good lighting. For official
          use, always check the photo rules of the application or country.
        </div>
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
      <div className="mb-2 text-sm font-black text-gray-950">{title}</div>
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
      <div className="text-lg font-black text-gray-950">{value}</div>
      <div className="text-xs font-bold uppercase text-gray-500">{label}</div>
    </div>
  );
}

function drawContain(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const padding = 24;
  const availableWidth = width - padding * 2;
  const availableHeight = height - padding * 2;

  const scale = Math.min(
    availableWidth / image.width,
    availableHeight / image.height
  );

  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const offsetX = x + (width - drawWidth) / 2;
  const offsetY = y + (height - drawHeight) / 2;

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
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