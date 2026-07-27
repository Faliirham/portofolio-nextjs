"use client";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import SpotifyEmbed from "@/components/ui/SpotifyEmbed";
import { motion } from "framer-motion";

export default function MusicPlaylist({ spotifyEmbed }: { spotifyEmbed: string }) {
  return (
    <section id="playlist" className="section-py" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(2rem, 5vw, 3rem)", alignItems: "start" }}
          className="lg:grid-cols-[1fr_1.5fr]"
        >
          {/* Left — Info */}
          <AnimatedSection>
            <SectionLabel>Garage Playlist</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                marginBottom: "1rem",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}
            >
              Now Playing
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.8rem, 1.5vw, 0.88rem)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              My coding playlist. Music that keeps me in the zone while building.
            </p>

            {/* Equalizer animation */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "24px", marginBottom: "1.5rem" }}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: ["8px", "20px", "12px", "24px", "8px"],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "3px",
                    background: "var(--red)",
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontSize: "clamp(0.55rem, 1vw, 0.65rem)",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              TAP TO PLAY
            </p>
          </AnimatedSection>

          {/* Right — Spotify embed */}
          <AnimatedSection delay={0.1}>
            <SpotifyEmbed url={spotifyEmbed} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
