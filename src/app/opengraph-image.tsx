import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 20% 0%, #312e81 0%, #07070b 55%)",
          color: "#ededf1",
        }}
      >
        <div style={{ fontSize: 30, color: "#a5b4fc", letterSpacing: 4 }}>PORTFOLIO</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 18 }}>{profile.name}</div>
        <div
          style={{
            fontSize: 44,
            marginTop: 10,
            background: "linear-gradient(90deg, #a5b4fc, #c4b5fd, #67e8f9)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.role}
        </div>
        <div style={{ fontSize: 28, marginTop: 34, color: "#9b9bab", maxWidth: 950 }}>
          GenAI · RAG · Multi-agent systems · LangGraph · MCP · FastAPI
        </div>
      </div>
    ),
    size,
  );
}
