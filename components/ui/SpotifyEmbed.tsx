"use client";

interface SpotifyEmbedProps {
  url: string;
}

export default function SpotifyEmbed({ url }: SpotifyEmbedProps) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
      }}
    >
      <div style={{ position: "relative", paddingBottom: "100%" }}>
        <iframe
          src={url}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
}
