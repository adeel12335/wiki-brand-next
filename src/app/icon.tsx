import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f0c668",
          border: "3px solid #d8a53a",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 28%, #183448 0%, #061421 48%, #020c16 100%)",
          fontFamily: "Georgia, serif",
          fontSize: 42,
          fontWeight: 700,
          lineHeight: 1,
          boxShadow: "inset 0 0 0 3px rgba(240,198,104,.15)",
        }}
      >
        W
      </div>
    ),
    size,
  );
}
