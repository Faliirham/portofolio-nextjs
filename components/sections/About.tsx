"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedSection, SectionHeading } from "@/components/ui";
import { MapPin, Coffee, Code2, Zap } from "lucide-react";
import type { AboutSection, Config } from "@/lib/types";

const traitIcons = [
  { icon: <Code2 size={13} />, key: "D-IV Informatics" },
  { icon: <Zap size={13} />, key: "HMTI" },
  { icon: <Coffee size={13} />, key: "Data-driven" },
  { icon: <MapPin size={13} />, key: "Malang" },
];

export default function About({ section, config }: { section: AboutSection; config: Config }) {
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
        <AnimatedSection>
          <SectionHeading num="01" label={section.title} title={<>Student who builds <span style={{ color: "var(--red)" }}>real things.</span></>} />
        </AnimatedSection>

        <div
          style={{ display: "grid", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "start" }}
          className="lg:grid-cols-[1fr_1fr]"
        >
          {/* Left */}
          <AnimatedSection>
            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.85rem, 1.5vw, 0.92rem)", marginBottom: "1.5rem" }}>
              {section.content.split("\n\n")[0] || section.content}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.78rem, 1.3vw, 0.85rem)" }}>
              <strong style={{ color: "var(--text-primary)" }}>What makes me different?</strong> {section.content.split("\n\n")[1] || ""}
            </p>

            {/* Traits — hard blocks with left tape */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2rem" }}>
              {traits.map((t) => (
                <span
                  key={t.text}
                  className="racing-stripe"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    padding: "0.45rem 0.9rem",
                    fontSize: "clamp(0.62rem, 1.2vw, 0.72rem)",
                    fontFamily: 'var(--font-ui)',
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
              {section.image && (
                <div style={{ position: "relative", marginBottom: "clamp(1.2rem, 3vw, 1.75rem)" }}>
                  {/* Offset frame */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: "translate(clamp(10px, 1.5vw, 14px), clamp(10px, 1.5vw, 14px))",
                      border: "1px solid var(--red)",
                      background: "transparent",
                    }}
                  />
                  <div
                    ref={imageRef}
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      overflow: "hidden",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Image
                      src={section.image}
                      alt="About me"
                      fill
                      style={{
                        objectFit: "cover",
                        filter: "hue-rotate(-16deg) saturate(0.55) contrast(1.12)",
                      }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Duotone tint */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(160deg, rgba(230,35,36,0.3) 0%, rgba(0,0,0,0.15) 55%, rgba(230,35,36,0.25) 100%)",
                        mixBlendMode: "multiply",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.55) 100%)",
                      }}
                    />
                    <div className="checker-big" style={{ position: "absolute", top: 0, right: 0, width: "72px", height: "72px", opacity: 0.9 }} />
                    <div className="tape-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px" }} />
                    {/* Corner caption */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0.75rem",
                        left: "0.9rem",
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="racing-stripe"
                        style={{
                          background: "var(--red)",
                          padding: "0.25rem 0.55rem",
                          color: "#fff",
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 800,
                          fontSize: "0.6rem",
                          letterSpacing: "0.14em",
                        }}
                      >
                        PIT CREW
                      </span>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>
                        {section.title}
                      </span>
                    </div>
                  </div>
                  {/* Floating rider decal */}
                  <motion.div
                    aria-hidden="true"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="card-brutal"
                    style={{
                      position: "absolute",
                      top: "clamp(-22px, -2vw, -16px)",
                      right: "clamp(-4px, 0vw, 4px)",
                      zIndex: 2,
                      background: "var(--yellow)",
                      border: "1px solid var(--text-primary)",
                      padding: "0.45rem 0.7rem",
                      boxShadow: "0 0 0 4px var(--bg-primary), 4px 4px 0 rgba(0,0,0,0.55)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontWeight: 900,
                        color: "var(--text-primary)",
                        fontSize: "clamp(0.7rem, 1.4vw, 0.85rem)",
                        letterSpacing: "0.04em",
                        whiteSpace: "nowrap",
                        display: "flex",
                        gap: "0.45rem",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "var(--red)" }}>{config.riderNumber.startsWith("#") ? config.riderNumber : `#${config.riderNumber}`}</span>
                      <span>{config.name.split(" ")[0].toUpperCase()}</span>
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Quote — brutal decal */}
              <div
                className="card-brutal"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  padding: "clamp(1.4rem, 3vw, 2rem)",
                  transform: "rotate(-0.75deg)",
                  marginTop: "2px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    fontWeight: 900,
                    fontSize: "clamp(2.5rem, 7vw, 4rem)",
                    lineHeight: 0.6,
                    color: "var(--red)",
                    display: "block",
                    marginBottom: "0.6rem",
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: "var(--text-primary)",
                    marginBottom: "0.9rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {section.quote}
                </p>
                <p style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)", color: "var(--text-muted)", fontFamily: 'var(--font-ui)', letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                  — {section.quoteAuthor}
                </p>
              </div>

              {/* Skill meter — thick flat bars */}
              <div
                className="card-brutal"
                style={{
                  border: "1px solid var(--border)",
                  padding: "clamp(1.2rem, 3vw, 1.75rem)",
                  marginTop: "1px",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(0.6rem, 1vw, 0.7rem)",
                    color: "var(--yellow)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: "1.1rem",
                    fontWeight: 800,
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  SKILL METER
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {section.skillMeters.map((item) => (
                    <div key={item.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "clamp(0.62rem, 1.2vw, 0.72rem)", fontFamily: 'var(--font-ui)', color: "var(--text-secondary)", letterSpacing: "0.04em", fontWeight: 500 }}>
                          {item.label}
                        </span>
                        <span
                          className="tabular-nums"
                          style={{ fontSize: "clamp(0.6rem, 1vw, 0.7rem)", fontFamily: 'var(--font-ui)', color: "var(--yellow)", fontWeight: 800 }}
                        >
                          {item.value}%
                        </span>
                      </div>
                      <div style={{ height: "12px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            height: "100%",
                            background: item.value > 85 ? "var(--yellow)" : "var(--red)",
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