import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#E8D5B0",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 14,
          color: "#1a1612",
          fontFamily: "serif",
          letterSpacing: "-0.5px",
        }}
      >
        PQ
      </div>
    ),
    { ...size }
  );
}