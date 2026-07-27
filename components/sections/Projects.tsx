"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, Trophy, Medal, ChevronDown } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import type { Project } from "@/lib/types";
import { STATUS_CONFIG } from "@/lib/types";

const LOAD_MORE_COUNT = 4;
const TOP_POSITION = 5;

export default function Projects({ projects }: { projects: Project[] }) {
  const sorted = [...projects].sort((a, b) => a.position - b.position);
  const topProjects = sorted.filter((p) => p.position <= TOP_POSITION);
  const restProjects = sorted.filter((p) => p.position > TOP_POSITION);
  const [showCount, setShowCount] = useState(0);
  const visibleRest = restProjects.slice(0, showCount);
  const hasMore = showCount < restProjects.length;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;
    import("@/lib/gsap").then(({ gsap }) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll("[data-project-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="projects" className="section-py" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <AnimatedSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(2rem, 5vw, 3rem)", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <SectionLabel>Race Results</SectionLabel>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", letterSpacing: "0.03em", textTransform: "uppercase" }}>
                Selected work
              </h2>
            </div>
          </div>
        </AnimatedSection>

        {/* Top podium — always visible */}
        <div
          ref={gridRef}
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", marginBottom: restProjects.length > 0 ? "1px" : "0" }}
          className="md:grid-cols-2"
        >
          {topProjects.map((project, i) => (
            <div key={project.slug} data-project-card>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* Load More — rest projects */}
        <AnimatePresence>
          {visibleRest.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", marginTop: "1px" }}
              className="md:grid-cols-2"
            >
              {visibleRest.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} index={i + topProjects.length} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More button */}
        {hasMore && (
          <AnimatedSection>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowCount((prev) => prev + LOAD_MORE_COUNT)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  padding: "0.7rem 1.5rem",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  fontSize: "clamp(0.6rem, 1.1vw, 0.7rem)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-red)";
                  el.style.boxShadow = "0 0 20px rgba(225,29,72,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Checkered icon */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="0" y="0" width="3.5" height="3.5" fill="var(--red)" />
                  <rect x="3.5" y="3.5" width="3.5" height="3.5" fill="var(--red)" />
                  <rect x="7" y="0" width="3.5" height="3.5" fill="var(--text-muted)" />
                  <rect x="10.5" y="3.5" width="3.5" height="3.5" fill="var(--text-muted)" />
                  <rect x="0" y="7" width="3.5" height="3.5" fill="var(--text-muted)" />
                  <rect x="3.5" y="10.5" width="3.5" height="3.5" fill="var(--text-muted)" />
                  <rect x="7" y="7" width="3.5" height="3.5" fill="var(--red)" />
                  <rect x="10.5" y="10.5" width="3.5" height="3.5" fill="var(--red)" />
                </svg>
                Show More
                <ChevronDown size={14} />
              </motion.button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const podiumColors: Record<number, string> = { 1: "#fbbf24", 2: "#c0c0c0", 3: "#cd7f32" };
  const podiumColor = podiumColors[project.position] || "var(--text-muted)";
  const statusCfg = STATUS_CONFIG[project.status];
  const isTop3 = project.position <= 3;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        padding: "clamp(1.2rem, 3vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        height: "100%",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(225,29,72,0.35)";
        el.style.boxShadow = "0 0 40px rgba(225,29,72,0.06)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Top stripe — podium color for top 3 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: isTop3 ? `linear-gradient(90deg, ${podiumColor}, transparent)` : "linear-gradient(90deg, var(--red), transparent)",
        }}
      />

      {/* Status badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          background: statusCfg.bg,
          border: `1px solid ${statusCfg.border}`,
          borderRadius: "2px",
          padding: "0.2rem 0.55rem",
          alignSelf: "flex-start",
          marginBottom: "0.15rem",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: statusCfg.color,
            boxShadow: `0 0 6px ${statusCfg.color}66`,
            animation: project.status === "ongoing" ? "pulse 2s infinite" : undefined,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
            fontSize: "clamp(0.4rem, 0.8vw, 0.5rem)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: statusCfg.color,
          }}
        >
          {statusCfg.label}
        </span>
      </div>

      {/* Project image */}
      {project.image && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isTop3 ? "clamp(120px, 25vw, 180px)" : "clamp(80px, 18vw, 120px)",
            borderRadius: "2px",
            overflow: "hidden",
            background: "var(--bg-secondary)",
            marginBottom: "0.5rem",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {isTop3 && (
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "2px",
                background: `${podiumColor}15`,
                border: `1px solid ${podiumColor}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: podiumColor,
                flexShrink: 0,
              }}
            >
              {project.position === 1 ? <Trophy size={14} /> : <Medal size={14} />}
            </div>
          )}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  fontSize: "clamp(0.45rem, 1vw, 0.55rem)",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                }}
              >
                {project.year}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  fontSize: "clamp(0.4rem, 0.9vw, 0.5rem)",
                  color: podiumColor,
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                }}
              >
                P{project.position}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontWeight: 800,
                fontSize: isTop3 ? "clamp(0.85rem, 1.8vw, 1rem)" : "clamp(0.75rem, 1.5vw, 0.88rem)",
                marginTop: "0.15rem",
                letterSpacing: "0.04em",
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ color: "var(--text-muted)", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <GithubIcon size={14} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ color: "var(--text-muted)", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--red-light)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.75rem, 1.3vw, 0.82rem)", lineHeight: 1.6, flex: 1 }}>
        {project.shortDesc}
      </p>

      {/* Tech badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              background: "var(--red-dim)",
              border: "1px solid var(--border-red)",
              color: "var(--red-light)",
              fontSize: "clamp(0.5rem, 1vw, 0.6rem)",
              fontFamily: 'var(--font-orbitron), sans-serif',
              fontWeight: 500,
              letterSpacing: "0.04em",
              padding: "0.15rem 0.45rem",
              borderRadius: "2px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* View detail */}
      <Link
        href={`/projects/${project.slug}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          color: "var(--red-light)",
          fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)",
          fontFamily: 'var(--font-orbitron), sans-serif',
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Read more <ArrowRight size={12} />
      </Link>
    </motion.div>
  );
}
