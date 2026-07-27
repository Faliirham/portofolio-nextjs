"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import { Briefcase, Users, Flag } from "lucide-react";
import type { ExperienceSection, ExperienceEntry } from "@/lib/types";

export default function Experience({ section }: { section: ExperienceSection }) {
  const work = section.entries.filter((e) => e.type === "work");
  const org = section.entries.filter((e) => e.type === "org");

  return (
    <section
      id="experience"
      className="section-py"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container-custom">
        <AnimatedSection>
          <SectionLabel>Race History</SectionLabel>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", marginBottom: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.03em", textTransform: "uppercase" }}>
            Experience & Organizations
          </h2>
        </AnimatedSection>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(2rem, 5vw, 3rem)" }}
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
  items: ExperienceEntry[];
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
          fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
          fontFamily: 'var(--font-orbitron), sans-serif',
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "var(--red-light)" }}>{icon}</span>
        {label}
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0" }}>
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: "8px",
            bottom: "8px",
            width: "2px",
            background: "linear-gradient(180deg, var(--red), var(--border))",
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
              gap: "clamp(0.8rem, 2vw, 1.25rem)",
              paddingBottom: i < items.length - 1 ? "clamp(1.5rem, 3vw, 2.25rem)" : "0",
            }}
          >
            <div style={{ paddingTop: "4px", flexShrink: 0 }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: i === 0 ? "var(--red)" : "var(--bg-card)",
                  border: `2px solid ${i === 0 ? "var(--red)" : "var(--border)"}`,
                  boxShadow: i === 0 ? "0 0 12px var(--red-glow)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i === 0 && <Flag size={8} color="#fff" />}
              </div>
            </div>

            <div
              className="racing-stripe"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "clamp(1rem, 2vw, 1.25rem)",
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
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {item.image && (
                    <div style={{ width: "24px", height: "24px", borderRadius: "4px", overflow: "hidden", flexShrink: 0, position: "relative", background: "var(--bg-secondary)" }}>
                      <Image src={item.image} alt={item.org} fill style={{ objectFit: "contain" }} sizes="24px" />
                    </div>
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-orbitron), sans-serif',
                      fontWeight: 700,
                      fontSize: "clamp(0.72rem, 1.4vw, 0.82rem)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.55rem, 1vw, 0.65rem)", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                  {item.period}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)", color: "var(--red-light)", marginBottom: "0.6rem", letterSpacing: "0.04em" }}>
                {item.org} · {item.location}
              </p>
              <p style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.82rem)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                {item.desc}
              </p>
              {item.bullets && item.bullets.length > 0 && (
                <ul style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.78rem)", color: "var(--text-secondary)", lineHeight: 1.6, paddingLeft: "1.2rem", marginBottom: "0.75rem", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {item.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
              {item.impact && (
                <div style={{ marginTop: "0.75rem", padding: "clamp(0.5rem, 1.5vw, 0.65rem)", background: "var(--red-dim)", borderLeft: "2px solid var(--red)", color: "var(--text-primary)", fontSize: "clamp(0.7rem, 1.2vw, 0.78rem)", lineHeight: 1.5, borderRadius: "0 2px 2px 0" }}>
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
