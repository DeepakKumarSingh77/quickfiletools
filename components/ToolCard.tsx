// import Link from "next/link";
// import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
// import type { Tool } from "@/lib/tools";

// export default function ToolCard({ tool }: { tool: Tool }) {
//   const Icon = tool.icon;
//   const isReady = tool.status === "ready";

//   return (
//     <Link
//       href={`/tools/${tool.slug}`}
//       className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
//     >
//       <div className="flex items-start justify-between gap-3">
//         <span className="grid h-12 w-12 place-items-center rounded-xl bg-gray-950 text-white">
//           <Icon size={22} />
//         </span>

//         <span
//           className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
//             isReady
//               ? "bg-emerald-100 text-emerald-700"
//               : "bg-orange-100 text-orange-700"
//           }`}
//         >
//           {isReady ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
//           {isReady ? "Working" : "Soon"}
//         </span>
//       </div>

//       <h3 className="mt-5 text-lg font-black">{tool.title}</h3>

//       <p className="mt-2 min-h-12 text-sm leading-6 text-gray-600">
//         {tool.description}
//       </p>

//       <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-600">
//         Open tool
//         <ArrowRight size={16} className="transition group-hover:translate-x-1" />
//       </div>
//     </Link>
//   );
// }

import Link from "next/link";
import { CheckCircle2, Clock3, ArrowRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const isReady = tool.status === "ready";

  return (
    <Link href={`/tools/${tool.slug}`} className="pq-tool-card">
      {/* Top row: icon + badge */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1.1rem",
        }}
      >
        <span
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: "#1a1612",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={21} color="#E8D5B0" strokeWidth={1.8} />
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            borderRadius: 100,
            padding: "4px 11px",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            background: isReady ? "#dcf0e4" : "#fff3e0",
            color: isReady ? "#1a5c35" : "#8a5800",
          }}
        >
          {isReady ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
          {isReady ? "Ready" : "Soon"}
        </span>
      </div>

      {/* Category */}
      <div
        style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          color: "#b5ab9e",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "0.35rem",
        }}
      >
        {tool.category}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#1a1612",
          lineHeight: 1.25,
          marginBottom: "0.45rem",
          letterSpacing: "-0.01em",
        }}
      >
        {tool.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.84rem",
          lineHeight: 1.65,
          color: "#7a6e5f",
          flex: 1,
          minHeight: 44,
        }}
      >
        {tool.description}
      </p>

      {/* Arrow CTA — hover gap handled by CSS */}
      <div className="pq-tool-card-arrow">
        Open tool
        <ArrowRight size={14} strokeWidth={2.5} />
      </div>
    </Link>
  );
}