"use client";

import { Download, FileText, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import jsPDF from "jspdf";

type PageSize = "a4" | "letter";
type Orientation = "portrait" | "landscape";

type ImageItem = {
  id: string;
  url: string;
  name: string;
  width: number;
  height: number;
};

const pageSizes: Record<
  PageSize,
  { label: string; width: number; height: number }
> = {
  a4: {
    label: "A4",
    width: 210,
    height: 297,
  },
  letter: {
    label: "Letter",
    width: 216,
    height: 279,
  },
};

export default function JpgToPdfTool() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [isWorking, setIsWorking] = useState(false);

  function loadImages(files?: FileList | null) {
    if (!files) return;

    const selectedFiles = Array.from(files);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    selectedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();

        image.onload = () => {
          setImages((current) => [
            ...current,
            {
              id: crypto.randomUUID(),
              url: String(reader.result),
              name: file.name,
              width: image.width,
              height: image.height,
            },
          ]);
        };

        image.src = String(reader.result);
      };

      reader.readAsDataURL(file);
    });
  }

  function removeImage(id: string) {
    setImages((current) => current.filter((image) => image.id !== id));

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function clearImages() {
    setImages([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function createPdf() {
    if (images.length === 0 || isWorking) return;

    setIsWorking(true);

    try {
      const selectedSize = pageSizes[pageSize];
      const width =
        orientation === "portrait" ? selectedSize.width : selectedSize.height;
      const height =
        orientation === "portrait" ? selectedSize.height : selectedSize.width;

      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: [width, height],
      });

      images.forEach((image, index) => {
        if (index > 0) {
          pdf.addPage([width, height], orientation);
        }

        const margin = 10;
        const availableWidth = width - margin * 2;
        const availableHeight = height - margin * 2;
        const imageRatio = image.width / image.height;
        const pageRatio = availableWidth / availableHeight;

        let drawWidth = availableWidth;
        let drawHeight = availableHeight;

        if (imageRatio > pageRatio) {
          drawHeight = availableWidth / imageRatio;
        } else {
          drawWidth = availableHeight * imageRatio;
        }

        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        pdf.addImage(image.url, "JPEG", x, y, drawWidth, drawHeight);
      });

      pdf.save("images-to-pdf.pdf");
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
          Upload JPG or PNG images
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(event) => loadImages(event.target.files)}
          className="hidden"
        />

        <div className="mt-5 grid gap-5">
          <div>
            <div className="mb-2 text-sm font-black text-gray-950">
              Page size
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(pageSizes) as PageSize[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPageSize(key)}
                  className={`rounded-xl border px-4 py-3 text-sm font-black ${
                    pageSize === key
                      ? "border-gray-950 bg-gray-950 text-white"
                      : "border-gray-200 bg-white text-gray-950"
                  }`}
                >
                  {pageSizes[key].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-black text-gray-950">
              Orientation
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(["portrait", "landscape"] as Orientation[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setOrientation(key)}
                  className={`rounded-xl border px-4 py-3 text-sm font-black capitalize ${
                    orientation === key
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 bg-white text-gray-950"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={createPdf}
            disabled={images.length === 0 || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FileText size={16} />
            {isWorking ? "Creating PDF..." : "Create PDF"}
          </button>

          {images.length > 0 && (
            <button
              type="button"
              onClick={clearImages}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-950"
            >
              Clear all images
            </button>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-gray-950">
              Selected images
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {images.length} image{images.length === 1 ? "" : "s"} selected
            </p>
          </div>

          {images.length > 0 && (
            <button
              type="button"
              onClick={createPdf}
              disabled={isWorking}
              className="hidden items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white disabled:bg-gray-300 sm:inline-flex"
            >
              <Download size={16} />
              {isWorking ? "Creating..." : "Download PDF"}
            </button>
          )}
        </div>

        {images.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative rounded-2xl border border-gray-200 bg-gray-50 p-3"
              >
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white text-gray-950 shadow-sm"
                  aria-label="Remove image"
                >
                  <X size={15} />
                </button>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-48 w-full rounded-xl object-contain"
                />

                <div className="mt-3 truncate text-sm font-black text-gray-950">
                  {image.name}
                </div>

                <div className="mt-1 text-xs font-semibold text-gray-500">
                  {image.width} x {image.height} px
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid min-h-72 place-items-center rounded-2xl bg-gray-50 p-5 text-center text-sm font-semibold text-gray-500">
            Upload images to preview them here.
          </div>
        )}
      </section>
    </div>
  );
}