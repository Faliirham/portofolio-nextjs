"use client";
import Image from "next/image";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import { ExternalLink, Trophy } from "lucide-react";
import type { CertificationsSection } from "@/lib/types";

export default function Certifications({ section }: { section: CertificationsSection }) {
  return (
    <section id="certifications" className="section-py" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <AnimatedSection>
          <SectionLabel>Trophy Room</SectionLabel>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", marginBottom: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.03em", textTransform: "uppercase" }}>
            Certifications
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
          }}
          className="sm:grid-cols-2"
        >
          {section.certifications.map((cert, i) => (
            <AnimatedSection key={cert.title} delay={i * 0.08}>
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  padding: "clamp(1.2rem, 3vw, 1.5rem)",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(251, 191, 36, 0.3)";
                  el.style.boxShadow = "0 0 30px rgba(251, 191, 36, 0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Gold stripe */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, var(--yellow), transparent)",
                  }}
                />

                {/* Trophy icon / Image */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "2px",
                    background: "var(--yellow-dim)",
                    border: "1px solid rgba(251, 191, 36, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "var(--yellow)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.issuer}
                      fill
                      style={{ objectFit: "contain", padding: "4px" }}
                      sizes="40px"
                    />
                  ) : (
                    <Trophy size={18} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontWeight: 700,
                        fontSize: "clamp(0.7rem, 1.3vw, 0.8rem)",
                        letterSpacing: "0.03em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {cert.title}
                    </h3>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-muted)", flexShrink: 0, display: "flex", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--yellow)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                  <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
