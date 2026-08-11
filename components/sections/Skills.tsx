"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, SectionHeading } from "@/components/ui";
import type { SkillsSection } from "@/lib/types";

export default function Skills({ section }: { section: SkillsSection }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const group = section.categories[active];

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % section.categories.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [auto, section.categories.length]);

  const select = useCallback((i: number) => {
    setAuto(false);
    setActive(i);
  }, []);

  const rowA = section.categories
    .filter((_, i) => i % 2 === 0)
    .flatMap((c) => c.items)
    .slice(0, 16);
  const rowB = section.categories
    .filter((_, i) => i % 2 === 1)
    .flatMap((c) => c.items)
    .slice(0, 16);

  return (
    <section
      id="skills"
      className="section-py"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container-custom">
        <AnimatedSection>
          <SectionHeading num="02" label={section.title} title="What I work with" />
        </AnimatedSection>

        {/* Live skill stream — two counter-scrolling bands */}
        <AnimatedSection>
          <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
            <div className="marquee">
              <div className="marquee-track">
                {[0, 1].map((g) => (
                  <div key={g} className="marquee-group">
                    {rowA.map((skill, i) => {
                      const cat = section.categories.find((c) => c.items.includes(skill));
                      const color = cat?.color || "var(--red)";
                      return (
                        <span
                          key={`${g}-${i}`}
                          className="stream-chip"
                          style={{
                            background: `${color}12`,
                            border: `1px solid ${color}30`,
                            color,
                          }}
                        >
                          <span className="stream-chip-dot" style={{ background: color }} />
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="marquee">
              <div className="marquee-track marquee-track-rev">
                {[0, 1].map((g) => (
                  <div key={g} className="marquee-group">
                    {rowB.map((skill, i) => {
                      const cat = section.categories.find((c) => c.items.includes(skill));
                      const color = cat?.color || "var(--red)";
                      return (
                        <span
                          key={`${g}-${i}`}
                          className="stream-chip"
                          style={{
                            background: `${color}12`,
                            border: `1px solid ${color}30`,
                            color,
                          }}
                        >
                          <span className="stream-chip-dot" style={{ background: color }} />
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Interactive pit-board picker */}
        <div
          style={{ display: "grid", gap: "clamp(1.5rem, 4vw, 3rem)", alignItems: "start" }}
          className="lg:grid-cols-[1fr_1.25fr]"
        >
          {/* Category list */}
          <AnimatedSection>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {section.categories.map((cat, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={cat.name}
                    onClick={() => select(i)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid var(--border)",
                      cursor: "pointer",
                      padding: "clamp(0.75rem, 2vw, 1.05rem) 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      textAlign: "left",
                      position: "relative",
                      transition: "background 0.25s ease, color 0.25s ease",
                      color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                    onMouseEnter={() => select(i)}
                  >
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontWeight: 900,
                        fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                        color: isActive ? cat.color : "transparent",
                        WebkitTextStroke: isActive ? "0px" : "1px rgba(255,255,255,0.2)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: isActive ? 800 : 600,
                        fontSize: "clamp(0.72rem, 1.4vw, 0.85rem)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        flex: 1,
                        color: "inherit",
                      }}
                    >
                      {cat.name}
                    </span>
                    <span
                      className="tabular-nums"
                      style={{
                        width: "30px",
                        height: "30px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isActive ? cat.color : "var(--bg-card)",
                        border: `1px solid ${isActive ? cat.color : "var(--border)"}`,
                        color: isActive ? "#0a0a0a" : "var(--text-muted)",
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontWeight: 800,
                        fontSize: "0.6rem",
                        flexShrink: 0,
                      }}
                    >
                      {cat.items.length}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="cat-tape"
                        style={{
                          position: "absolute",
                          left: 0,
                          height: "5px",
                          width: "100%",
                          bottom: "-3px",
                          background: cat.color,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Active category — animated chips wall */}
          <AnimatedSection delay={0.1}>
            <div
              className="card-brutal"
              style={{
                padding: "0",
                position: "relative",
                overflow: "hidden",
                minHeight: "280px",
              }}
            >
              <div className="tape-line" style={{ width: "100%", background: group.color, height: "7px" }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: "clamp(1.2rem, 3vw, 1.75rem)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        background: group.color,
                        boxShadow: `0 0 14px ${group.color}66`,
                        flexShrink: 0,
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontSize: "clamp(0.8rem, 1.6vw, 1rem)",
                        fontWeight: 800,
                        color: group.color,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {group.name}
                    </h3>
                    <span
                      className="stamp"
                      style={{
                        fontSize: "0.55rem",
                        color: group.color,
                        borderColor: `${group.color}55`,
                        transform: "rotate(0deg)",
                        padding: "0.15rem 0.4rem",
                        marginLeft: "auto",
                        fontWeight: 800,
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      {group.items.length} SKILLS
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {group.items.map((skill, j) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: j * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className="chip-square"
                        style={{
                          background: `${group.color}14`,
                          border: `1px solid ${group.color}30`,
                          color: group.color,
                          fontSize: "clamp(0.6rem, 1.1vw, 0.7rem)",
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          padding: "0.42rem 0.8rem",
                          display: "inline-block",
                          transition: "all 0.2s",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${group.color}26`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${group.color}55`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${group.color}14`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${group.color}30`;
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}