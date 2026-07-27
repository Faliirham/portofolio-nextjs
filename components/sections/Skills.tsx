"use client";
import { motion } from "framer-motion";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import dynamic from "next/dynamic";
import type { SkillsSection } from "@/lib/types";

const SkillGraph = dynamic(() => import("@/components/three/SkillGraph"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "300px", borderRadius: "4px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--bg-card)" }} />
  ),
});

export default function Skills({ section }: { section: SkillsSection }) {
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
          <SectionLabel>{section.title}</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              marginBottom: "0.5rem",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            What I work with
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "clamp(2rem, 5vw, 3rem)", fontFamily: 'var(--font-orbitron), sans-serif', letterSpacing: "0.05em", fontSize: "clamp(0.65rem, 1.2vw, 0.75rem)" }}>
            TOOLS AND TECHNOLOGIES UNLOCKED
          </p>
        </AnimatedSection>

        {/* 3D Skill Graph */}
        <AnimatedSection delay={0.1} className="mb-8 lg:mb-12">
          <SkillGraph />
        </AnimatedSection>

        {/* Skill tree layout */}
        <div style={{ position: "relative" }}>
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "linear-gradient(180deg, var(--red), var(--yellow), var(--red))",
              opacity: 0.15,
            }}
            className="hidden lg:block"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "clamp(1rem, 2vw, 1.5rem)",
            }}
            className="lg:grid-cols-2"
          >
            {section.categories.map((group, i) => (
              <AnimatedSection key={group.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    padding: "clamp(1.2rem, 3vw, 1.5rem)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = group.color + "44";
                    el.style.boxShadow = `0 0 30px ${group.color}11`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Top accent stripe */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: `linear-gradient(90deg, ${group.color}, transparent)`,
                    }}
                  />

                  {/* Node indicator */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: group.color,
                        boxShadow: `0 0 12px ${group.color}66`,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: group.color,
                      }}
                    >
                      {group.name}
                    </span>
                  </div>

                  {/* Skills as nodes */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {group.items.map((skill, j) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: j * 0.05 }}
                        style={{
                          background: `${group.color}11`,
                          border: `1px solid ${group.color}22`,
                          color: group.color,
                          fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
                          fontFamily: 'var(--font-orbitron), sans-serif',
                          fontWeight: 500,
                          letterSpacing: "0.04em",
                          padding: "0.3rem 0.6rem",
                          borderRadius: "2px",
                          display: "inline-block",
                          lineHeight: 1.4,
                          transition: "all 0.2s",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${group.color}22`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${group.color}44`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${group.color}11`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${group.color}22`;
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
