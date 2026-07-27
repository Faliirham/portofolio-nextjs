"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import { MapPin, Coffee, Code2, Zap } from "lucide-react";
import type { AboutSection } from "@/lib/types";

const traitIcons = [
  { icon: <Code2 size={13} />, key: "D-IV Informatics" },
  { icon: <Zap size={13} />, key: "HMTI" },
  { icon: <Coffee size={13} />, key: "Data-driven" },
  { icon: <MapPin size={13} />, key: "Malang" },
];

export default function About({ section }: { section: AboutSection }) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !section.image || !imageRef.current) return;
    import("@/lib/gsap").then(({ gsap }) => {
      gsap.to(imageRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, [section.image]);

  const traits = section.traits.map((t) => {
    const match = traitIcons.find((ti) => t.toLowerCase().includes(ti.key.toLowerCase()));
    return { icon: match?.icon || <Code2 size={13} />, text: t };
  });

  return (
    <section id="about" className="section-py" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <div
          style={{ display: "grid", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "start" }}
          className="lg:grid-cols-[1fr_1fr]"
        >
          {/* Left */}
          <AnimatedSection>
            <SectionLabel>{section.title}</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                marginBottom: "1.5rem",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}
            >
              Student who builds
              <br />
              <span style={{ color: "var(--red)" }}>real things.</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.85rem, 1.5vw, 0.92rem)", marginBottom: "1.5rem" }}>
              {section.content.split("\n\n")[0] || section.content}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.78rem, 1.3vw, 0.85rem)" }}>
              <strong style={{ color: "var(--text-primary)" }}>What makes me different?</strong> {section.content.split("\n\n")[1] || ""}
            </p>

            {/* Traits */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2rem" }}>
              {traits.map((t) => (
                <span
                  key={t.text}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    padding: "0.4rem 0.8rem",
                    fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)",
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    color: "var(--text-secondary)",
                    letterSpacing: "0.03em",
                  }}
                >
                  <span style={{ color: "var(--red-light)" }}>{t.icon}</span>
                  {t.text}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — visual block */}
          <AnimatedSection delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {/* Image (if provided) */}
              {section.image && (
                <div
                  ref={imageRef}
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    marginBottom: "1px",
                  }}
                >
                  <Image
                    src={section.image}
                    alt="About me"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Quote card */}
              <div
                className="racing-stripe"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  padding: "clamp(1.2rem, 3vw, 1.75rem)",
                  borderRadius: "2px",
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                    fontWeight: 600,
                    lineHeight: 1.6,
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  &quot;{section.quote}&quot;
                </p>
                <p style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)", color: "var(--text-muted)", fontFamily: 'var(--font-orbitron), sans-serif', letterSpacing: "0.08em" }}>
                  {section.quoteAuthor}
                </p>
              </div>

              {/* Skills quick view — tachometer style */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  padding: "clamp(1.2rem, 3vw, 1.75rem)",
                  borderRadius: "2px",
                  marginTop: "1px",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(0.55rem, 1vw, 0.65rem)",
                    color: "var(--yellow)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                    fontWeight: 700,
                    fontFamily: 'var(--font-orbitron), sans-serif',
                  }}
                >
                  SKILL METER
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {section.skillMeters.map((item) => (
                    <div key={item.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)", fontFamily: 'var(--font-orbitron), sans-serif', color: "var(--text-secondary)", letterSpacing: "0.04em" }}>
                          {item.label}
                        </span>
                        <span style={{ fontSize: "clamp(0.55rem, 1vw, 0.68rem)", fontFamily: 'var(--font-orbitron), sans-serif', color: "var(--yellow)", fontWeight: 700 }}>
                          {item.value}%
                        </span>
                      </div>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.04)", borderRadius: "2px", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            height: "100%",
                            background: `linear-gradient(90deg, var(--red), ${item.value > 85 ? "var(--yellow)" : "var(--red-light)"})`,
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
