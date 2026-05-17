"use client";

import { Clipboard, Eraser, Type } from "lucide-react";
import { useMemo, useState } from "react";

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean)
      : [];
    const paragraphs = trimmed
      ? trimmed.split(/\n+/).map((p) => p.trim()).filter(Boolean)
      : [];

    const wordMap = new Map<string, number>();

    words.forEach((word) => {
      const clean = word.toLowerCase().replace(/[^a-z0-9]/gi, "");
      if (clean.length > 2) {
        wordMap.set(clean, (wordMap.get(clean) || 0) + 1);
      }
    });

    const keywords = [...wordMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      words: words.length,
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readingTime: Math.max(1, Math.ceil(words.length / 200)),
      speakingTime: Math.max(1, Math.ceil(words.length / 130)),
      keywords,
    };
  }, [text]);

  function copyText() {
    navigator.clipboard.writeText(text);
  }

  function convertCase(type: "upper" | "lower" | "title") {
    if (type === "upper") setText(text.toUpperCase());
    if (type === "lower") setText(text.toLowerCase());

    if (type === "title") {
      setText(
        text
          .toLowerCase()
          .replace(/\b\w/g, (letter) => letter.toUpperCase())
      );
    }
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black">Advanced Word Counter</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Count words, characters, reading time, speaking time, paragraphs,
              and top repeated keywords.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyText}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-black"
            >
              <Clipboard size={15} />
              Copy
            </button>

            <button
              type="button"
              onClick={() => setText("")}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-black"
            >
              <Eraser size={15} />
              Clear
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste or type your text here..."
          className="mt-5 min-h-72 w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 p-4 leading-7 outline-none focus:border-blue-500"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <CaseButton label="UPPERCASE" onClick={() => convertCase("upper")} />
          <CaseButton label="lowercase" onClick={() => convertCase("lower")} />
          <CaseButton label="Title Case" onClick={() => convertCase("title")} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Words" value={stats.words} />
        <Stat label="Characters" value={stats.characters} />
        <Stat label="No spaces" value={stats.charactersNoSpaces} />
        <Stat label="Sentences" value={stats.sentences} />
        <Stat label="Paragraphs" value={stats.paragraphs} />
        <Stat label="Reading time" value={`${stats.readingTime} min`} />
        <Stat label="Speaking time" value={`${stats.speakingTime} min`} />
        <Stat label="Top keywords" value={stats.keywords.length} />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Type size={18} className="text-blue-600" />
          <h3 className="text-lg font-black">Keyword density</h3>
        </div>

        {stats.keywords.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.keywords.map(([word, count]) => (
              <div key={word} className="rounded-xl bg-gray-50 p-4">
                <div className="font-black">{word}</div>
                <div className="mt-1 text-sm font-semibold text-gray-500">
                  {count} time{count > 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-gray-500">
            Type text to see repeated keywords.
          </p>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-3xl font-black text-gray-950">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase text-gray-500">
        {label}
      </div>
    </div>
  );
}

function CaseButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-black transition hover:bg-gray-200"
    >
      {label}
    </button>
  );
}