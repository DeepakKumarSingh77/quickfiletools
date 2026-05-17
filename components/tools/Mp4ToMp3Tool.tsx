"use client";

import { Download, Music, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

type Result = {
  url: string;
  size: number;
};

export default function Mp4ToMp3Tool() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [bitrate, setBitrate] = useState("192k");
  const [isWorking, setIsWorking] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  function loadFile(selectedFile?: File) {
    if (!selectedFile) return;

    setFile(selectedFile);
    setResult(null);
    setError("");
    setProgress("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function clearFile() {
    setFile(null);
    setResult(null);
    setError("");
    setProgress("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function loadFfmpeg() {
    if (ffmpegRef.current) {
      return ffmpegRef.current;
    }

    const ffmpeg = new FFmpeg();

    ffmpeg.on("log", ({ message }) => {
      if (message) setProgress(message);
    });

    await ffmpeg.load();

    ffmpegRef.current = ffmpeg;
    return ffmpeg;
  }

  async function convertToMp3() {
    if (!file || isWorking) return;

    setIsWorking(true);
    setError("");
    setResult(null);
    setProgress("Loading converter...");

    try {
      const ffmpeg = await loadFfmpeg();

      setProgress("Reading video file...");
      await ffmpeg.writeFile("input.mp4", await fetchFile(file));

      setProgress("Extracting MP3 audio...");
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vn",
        "-b:a",
        bitrate,
        "output.mp3",
      ]);

      const data = await ffmpeg.readFile("output.mp3");
      const blob = new Blob([new Uint8Array(data as Uint8Array)], {
  type: "audio/mpeg",
});
      const url = URL.createObjectURL(blob);

      setResult({
        url,
        size: blob.size,
      });

      setProgress("Done");
    } catch {
      setError(
        "Could not convert this file. Try a smaller MP4 video or a standard video file."
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
          Upload MP4 video
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/*"
          onChange={(event) => loadFile(event.target.files?.[0])}
          className="hidden"
        />

        <div className="mt-5 grid gap-4">
          <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            Extract MP3 audio from MP4 videos in your browser. Large videos may
            take time depending on your device.
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          <div>
            <div className="mb-2 text-sm font-black text-gray-950">
              Audio quality
            </div>

            <div className="grid grid-cols-3 gap-2">
              {["128k", "192k", "320k"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setBitrate(item);
                    setResult(null);
                  }}
                  className={`rounded-xl border px-4 py-3 text-sm font-black ${
                    bitrate === item
                      ? "border-gray-950 bg-gray-950 text-white"
                      : "border-gray-200 bg-white text-gray-950"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={convertToMp3}
            disabled={!file || isWorking}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Music size={16} />
            {isWorking ? "Converting..." : "Convert to MP3"}
          </button>

          {file && (
            <button
              type="button"
              onClick={clearFile}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-950"
            >
              <X size={16} />
              Clear video
            </button>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-gray-950">Conversion result</h2>

        {file ? (
          <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="truncate text-sm font-black text-gray-950">
              {file.name}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Stat label="Video size" value={formatBytes(file.size)} />
              <Stat label="MP3 size" value={result ? formatBytes(result.size) : "-"} />
              <Stat label="Quality" value={bitrate} />
            </div>

            {progress && (
              <div className="mt-5 rounded-2xl bg-white p-4 text-xs font-semibold leading-6 text-gray-500">
                {progress}
              </div>
            )}

            {result && (
              <>
                <audio controls src={result.url} className="mt-5 w-full" />

                <a
                  href={result.url}
                  download="converted-audio.mp3"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
                >
                  <Download size={16} />
                  Download MP3
                </a>
              </>
            )}
          </div>
        ) : (
          <div className="mt-5 grid min-h-72 place-items-center rounded-2xl bg-gray-50 p-5 text-center text-sm font-semibold text-gray-500">
            Upload an MP4 video to extract audio.
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
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