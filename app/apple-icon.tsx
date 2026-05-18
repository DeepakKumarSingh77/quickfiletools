import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#1a1612",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 70,
          color: "#E8D5B0",
          fontFamily: "serif",
          letterSpacing: "-2px",
        }}
      >
        PQ
      </div>
    ),
    { ...size }
  );
}