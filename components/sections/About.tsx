"use client";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import { MapPin, Coffee, Code2, Zap } from "lucide-react";

const traits = [
  { icon: <Code2 size={14} />, text: "D-IV Informatics, Polinema" },
  { icon: <Zap size={14} />, text: "Active in HMTI" },
  { icon: <Coffee size={14} />, text: "Data & Intelligence driven" },
  { icon: <MapPin size={14} />, text: "Based in Malang, ID" },
];

export default function About() {
  return (
    <section id="about" style={{ padding: "7rem 0", borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="lg:grid-cols-[1fr_1fr]"
        >
          {/* Left */}
          <AnimatedSection>
            <SectionLabel>About Me</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em",
              }}
            >
              Student who builds
              <br />
              <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
                real things.
              </span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              {personalInfo.bio}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>What makes me different?</strong> I don't just write code; I build systems that solve real problems. My background in both full-stack development and machine learning allows me to design scalable architectures with intelligent capabilities, ensuring that the applications I create are both robust and smart.
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
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
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
              {/* Quote card */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--red)",
                  padding: "1.75rem",
                  borderRadius: "2px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  "First, solve the problem. Then, write the code."
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>— John Johnson</p>
              </div>

              {/* Skills quick view */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  padding: "1.75rem",
                  borderRadius: "2px",
                  marginTop: "1px",
                }}
              >
                <p style={{ fontSize: "0.72rem", color: "var(--red-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
                  Learning & exploring
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { label: "Full-stack development", pct: 90 },
                    { label: "Machine Learning & AI", pct: 85 },
                    { label: "Database Optimization", pct: 80 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{item.label}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.pct}%</span>
                      </div>
                      <div style={{ height: "2px", background: "var(--border)", borderRadius: "1px", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ height: "100%", background: "var(--red)", borderRadius: "1px" }}
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
