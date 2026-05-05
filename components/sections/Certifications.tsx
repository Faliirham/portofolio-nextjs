"use client";
import { certifications } from "@/lib/data";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import { Award, ExternalLink } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding: "7rem 0", borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <AnimatedSection>
          <SectionLabel>Credentials</SectionLabel>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", marginBottom: "3rem" }}>
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
          {certifications.map((cert, i) => (
            <AnimatedSection key={cert.title} delay={i * 0.08}>
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  padding: "1.5rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  transition: "border-color 0.2s",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-red)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "4px",
                    background: "var(--red-dim)",
                    border: "1px solid var(--border-red)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "var(--red-light)",
                  }}
                >
                  <Award size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        letterSpacing: "-0.01em",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {cert.title}
                    </h3>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-muted)", flexShrink: 0, display: "flex" }}
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
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
