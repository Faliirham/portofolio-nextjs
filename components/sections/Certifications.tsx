"use client";
import Image from "next/image";
import { AnimatedSection, SectionHeading } from "@/components/ui";
import { ExternalLink, Trophy } from "lucide-react";
import type { CertificationsSection } from "@/lib/types";

export default function Certifications({ section }: { section: CertificationsSection }) {
  return (
    <section id="certifications" className="section-py" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <AnimatedSection>
          <SectionHeading num="05" label="Trophy Room" title="Certifications" />
        </AnimatedSection>

        <div className="scroll-rail" style={{ margin: "0 calc(-1 * clamp(1rem, 4vw, 2.5rem))", paddingLeft: "clamp(1rem, 4vw, 2.5rem)", paddingRight: "clamp(1rem, 4vw, 2.5rem)" }}>
          {section.certifications.map((cert, i) => (
            <div key={cert.title} style={{ minWidth: "min(320px, 82vw)", flexShrink: 0 }}>
              <AnimatedSection delay={i * 0.06}>
              <div
                className="card-brutal"
                style={{
                  padding: "clamp(1.2rem, 3vw, 1.5rem)",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div className="tape-line" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "var(--yellow)" }} />

                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "var(--yellow-dim)",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
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
                      sizes="44px"
                    />
                  ) : (
                    <Trophy size={18} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontWeight: 700,
                        fontSize: "clamp(0.72rem, 1.3vw, 0.84rem)",
                        letterSpacing: "0.02em",
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
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)", color: "var(--text-muted)", letterSpacing: "0.06em", fontWeight: 500 }}>
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </div>
            </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}