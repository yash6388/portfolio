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
          background: "#f6f4ef",
          color: "#17160f",
        }}
      >
        <div style={{ fontSize: 26, color: "#d9481f", letterSpacing: 4 }}>PORTFOLIO</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 18 }}>{profile.name}</div>
        <div
          style={{
            fontSize: 44,
            marginTop: 10,
            color: "#d9481f",
          }}
        >
          {profile.role}
        </div>
        <div style={{ fontSize: 28, marginTop: 34, color: "#6c6959", maxWidth: 950 }}>
          GenAI · RAG · Multi-agent systems · LangGraph · MCP · FastAPI
        </div>
      </div>
    ),
    size,
  );
}
