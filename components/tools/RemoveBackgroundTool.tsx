"use client";

import { Download, ImageMinus, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

type ImageInfo = {
  url: string;
  name: string;
  size: number;
  width: number;
  height: number;
};

type Result = {
  url: string;
  size: number;
};

export default function RemoveBackgroundTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<ImageInfo | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function loadImage(file?: File) {
    if (!file) return;

    setImage(null);
    setResult(null);
    setError("");
    setStatus("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = async () => {
        const nextImage = {
          url: String(reader.result),
          name: file.name,
          size: file.size,
          width: img.width,
          height: img.height,
        };

        setImage(nextImage);
        await removeBackground(file);
      };

      img.src = String(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImage(null);
    setResult(null);
    setError("");
    setStatus("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function removeBackground(file: File) {
    setIsWorking(true);
    setError("");
    setResult(null);
    setStatus("Loading AI background remover...");

    try {
      const { removeBackground } = await import("@imgly/background-removal");

      setStatus("Removing background automatically...");

      const outputBlob = await removeBackground(file);
      const url = URL.createObjectURL(outputBlob);

      setResult({
        url,
        size: outputBlob.size,
      });

      setStatus("Background removed");
    } catch {
      setError(
        "Could not remove the background. Try a clear image with a visible person or product."
      );
      setStatus("");
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
          disabled={isWorking}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-sm font-black text-gray-950 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isWorking ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Upload size={18} />
          )}
          {isWorking ? "Removing background..." : "Upload image"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => loadImage(event.target.files?.[0])}
          className="hidden"
        />

        <div className="mt-5 grid gap-4">
          <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            Upload an image and the background will be removed automatically
            using AI in the browser.
          </div>

          {status && (
            <div className="rounded-2xl bg-gray-50 p-4 text-sm font-semibold leading-6 text-gray-700">
              {status}
            </div>
          )}

          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          {image && (
            <button
              type="button"
              onClick={clearImage}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-950"
            >
              <X size={16} />
              Clear image
            </button>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-gray-950">Background result</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Preview title="Original" url={image?.url || null} />
          <Preview title="Transparent PNG" url={result?.url || null} checker />
        </div>

        {image && result && (
          <div className="mt-5 grid gap-3 rounded-2xl bg-gray-50 p-4 sm:grid-cols-3">
            <Stat label="Original" value={formatBytes(image.size)} />
            <Stat label="PNG size" value={formatBytes(result.size)} />
            <Stat label="Output" value="Transparent" />
          </div>
        )}

        {result && (
          <a
            href={result.url}
            download="background-removed.png"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
          >
            <Download size={16} />
            Download PNG
          </a>
        )}
      </section>
    </div>
  );
}

function Preview({
  title,
  url,
  checker,
}: {
  title: string;
  url: string | null;
  checker?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-black text-gray-950">{title}</div>
      <div
        className={`grid aspect-square place-items-center rounded-2xl p-3 ${
          checker ? "bg-checker" : "bg-gray-50"
        }`}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={title}
            className="max-h-full max-w-full rounded-xl object-contain"
          />
        ) : (
          <span className="text-sm font-semibold text-gray-400">No image</span>
        )}
      </div>
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

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}