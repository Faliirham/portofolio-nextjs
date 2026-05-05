"use client";
import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import { Briefcase, Users } from "lucide-react";

export default function Experience() {
  const work = experiences.filter((e) => e.type === "work");
  const org = experiences.filter((e) => e.type === "org");

  return (
    <section
      id="experience"
      style={{
        padding: "7rem 0",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container-custom">
        <AnimatedSection>
          <SectionLabel>Journey</SectionLabel>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", marginBottom: "3.5rem" }}>
            Experience & Organizations
          </h2>
        </AnimatedSection>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}
          className="lg:grid-cols-2"
        >
          <TimelineCol items={work} label="Work Experience" icon={<Briefcase size={13} />} />
          <TimelineCol items={org} label="Organizations" icon={<Users size={13} />} />
        </div>
      </div>
    </section>
  );
}

function TimelineCol({
  items,
  label,
  icon,
}: {
  items: typeof experiences;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <AnimatedSection delay={0.1}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
          color: "var(--text-muted)",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "var(--red-light)" }}>{icon}</span>
        {label}
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: "8px",
            bottom: "8px",
            width: "1px",
            background: "var(--border)",
          }}
        />

        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              gap: "1.25rem",
              paddingBottom: i < items.length - 1 ? "2.25rem" : "0",
            }}
          >
            {/* Dot */}
            <div style={{ paddingTop: "4px", flexShrink: 0 }}>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  background: i === 0 ? "var(--red)" : "var(--bg-card)",
                  border: `1px solid ${i === 0 ? "var(--red)" : "var(--border)"}`,
                  boxShadow: i === 0 ? "0 0 12px var(--red-glow)" : "none",
                  transition: "all 0.2s",
                }}
              />
            </div>

            {/* Content */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "1.25rem",
                flex: 1,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-red)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.25rem" }}>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{item.period}</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--red-light)", marginBottom: "0.6rem" }}>
                {item.org} · {item.location}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                {item.desc}
              </p>
              {item.bullets && item.bullets.length > 0 && (
                <ul style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, paddingLeft: "1.2rem", marginBottom: "0.75rem", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {item.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
              {item.impact && (
                <div style={{ marginTop: "0.75rem", padding: "0.75rem", background: "var(--red-dim)", borderLeft: "2px solid var(--red)", color: "var(--text-primary)", fontSize: "0.82rem", lineHeight: 1.5, borderRadius: "0 4px 4px 0" }}>
                  <strong>Impact:</strong> {item.impact}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
