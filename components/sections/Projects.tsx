"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, ChevronDown } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { AnimatedSection, SectionHeading } from "@/components/ui";
import CircuitMap from "@/components/ui/CircuitMap";
import type { Project } from "@/lib/types";
import { STATUS_CONFIG } from "@/lib/types";
import { sortProjectsForDisplay } from "@/lib/projects";

const LOAD_MORE_COUNT = 4;

export default function Projects({ projects }: { projects: Project[] }) {
  const sorted = sortProjectsForDisplay(projects);
  const [showCount, setShowCount] = useState(3);
  const initial = sorted.slice(0, 3);
  const appended = sorted.slice(3, showCount);
  const hasMore = showCount < sorted.length;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;
    import("@/lib/gsap").then(({ gsap }) => {
      if (!gridRef.current) return;
      const rows = gridRef.current.querySelectorAll("[data-circuit-row]");
      gsap.fromTo(
        rows,
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
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
          <SectionHeading num="03" label="Race Results" title="The circuit so far" />
        </AnimatedSection>

        {/* 3D circuit map — one full lap */}
        <div style={{ marginBottom: "clamp(1.25rem, 3vw, 2rem)" }}>
          <CircuitMap projects={sorted} />
        </div>

        {/* Start grid */}
        <AnimatedSection>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(1.5rem, 3vw, 2.25rem)" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                border: "1px solid var(--border-red)",
                background: "var(--red-dim)",
                padding: "0.45rem 1.1rem",
                fontFamily: 'var(--font-ui)',
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#fca5a5",
              }}
            >
              <span style={{ width: "8px", height: "8px", background: "#22c55e", display: "block" }} />
              Start — grid position
            </div>
          </div>
        </AnimatedSection>

        {/* Circuit: vertical racing line + corner nodes */}
        <div ref={gridRef} style={{ position: "relative" }}>
          {/* Racing line spine */}
          <div
            aria-hidden="true"
            className="circuit-spine"
            style={{
              position: "absolute",
              top: "-8px",
              bottom: "-8px",
              width: "3px",
              background: "repeating-linear-gradient(180deg, var(--red) 0 10px, transparent 10px 18px)",
              opacity: 0.55,
            }}
          />

          {initial.map((project, i) => {
            const even = i % 2 === 0;
            const statusCfg = STATUS_CONFIG[project.status];
            return (
              <div key={project.slug} data-circuit-row id={`row-${project.slug}`} style={{ scrollMarginTop: "90px" }}>
                {/* Corner label (between corners) */}
                {i > 0 && (
                  <div className="sector-label">
                    <span style={{ flex: 1, borderTop: "1px dashed rgba(225,29,72,0.4)" }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontSize: "0.58rem",
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        color: "var(--yellow)",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Corner {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ flex: 1, borderTop: "1px dashed rgba(225,29,72,0.4)" }} />
                  </div>
                )}

                {/* Corner row */}
                <div className="circuit-row-grid">
                  {/* Corner node */}
                  <div className="circuit-node">
                    <div style={{ position: "relative", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          transform: "rotate(45deg)",
                          background: "var(--bg-card)",
                          border: `2px solid ${project.status === "finished" ? "var(--yellow)" : statusCfg.color}`,
                          boxShadow: project.status === "ongoing" ? "0 0 18px var(--red-glow)" : "none",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      <span
                        style={{
                          position: "relative",
                          fontFamily: 'var(--font-orbitron), sans-serif',
                          fontWeight: 900,
                          fontSize: "0.8rem",
                          color: statusCfg.color,
                          letterSpacing: "0.02em",
                        }}
                      >
                        T{i + 1}
                      </span>
                    </div>
                    <p
                      className="tabular-nums"
                      style={{
                        textAlign: "center",
                        marginTop: "0.4rem",
                        fontFamily: 'var(--font-ui)',
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                      }}
                    >
                      {project.year}
                    </p>
                  </div>

                  {/* Corner card */}
                  <div className={even ? "circuit-card circuit-card--even" : "circuit-card circuit-card--odd"}>
                    <div
                      className="card-brutal"
                      style={{ padding: "clamp(1.1rem, 2.5vw, 1.5rem)", display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative", overflow: "hidden" }}
                    >
                      <div className="tape-line" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: statusCfg.color }} />

                      {/* Corner sticker on image */}
                      {project.image && (
                        <div className="img-zoom" style={{ position: "relative", width: "100%", height: "clamp(140px, 26vw, 200px)", background: "var(--bg-secondary)", marginBottom: "0.25rem" }}>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <span
                            className="sticker"
                            style={{
                              position: "absolute",
                              bottom: "0.5rem",
                              left: "0.5rem",
                              background: "var(--yellow)",
                              color: "#0a0a0a",
                              fontSize: "0.56rem",
                              padding: "0.25rem 0.55rem",
                              fontWeight: 800,
                              fontFamily: 'var(--font-ui)',
                              letterSpacing: "0.14em",
                              transform: "rotate(0deg)",
                            }}
                          >
                            T{i + 1} · {project.year}
                          </span>
                        </div>
                      )}

                      {/* Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem" }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-orbitron), sans-serif',
                            fontWeight: 800,
                            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {project.title}
                        </h3>
                        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} source code on GitHub`}
                            title="GitHub"
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
                            aria-label={`Open ${project.title} live demo`}
                            title="Live demo"
                            onClick={(e) => e.stopPropagation()}
                            style={{ color: "var(--text-muted)", transition: "color 0.2s", display: "flex" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--red-light)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>

                      {/* Status badge — hard square */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          background: statusCfg.bg,
                          border: `1px solid ${statusCfg.border}`,
                          padding: "0.3rem 0.65rem",
                          alignSelf: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            width: "7px",
                            height: "7px",
                            background: statusCfg.color,
                            boxShadow: `0 0 6px ${statusCfg.color}66`,
                            animation: project.status === "ongoing" ? "pulse 2s infinite" : undefined,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: "clamp(0.6rem, 0.9vw, 0.68rem)",
                            fontWeight: 800,
                            letterSpacing: "0.12em",
                            color: statusCfg.color,
                          }}
                        >
                          {statusCfg.label}
                        </span>
                      </div>

                      <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.75rem, 1.3vw, 0.84rem)", lineHeight: 1.6, flex: 1 }}>
                        {project.shortDesc}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-xs)" }}>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="chip-square"
                            style={{
                              background: "var(--red-dim)",
                              border: "1px solid var(--border-red)",
                              color: "var(--red-light)",
                              fontSize: "clamp(0.62rem, 1vw, 0.7rem)",
                              fontFamily: 'var(--font-ui)',
                              fontWeight: 500,
                              letterSpacing: "0.04em",
                              padding: "0.28rem 0.6rem",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          color: "var(--red-light)",
                          fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          textDecoration: "none",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Read more <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loaded rows (appended via Continue the lap) */}
        <AnimatePresence>
          {appended.map((project, offset) => (
            <CircuitRow key={project.slug} project={project} corner={4 + offset} delay={offset * 0.08} />
          ))}
        </AnimatePresence>

        {/* Load More button */}
        {hasMore && (
          <AnimatedSection>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(2rem, 4vw, 2.75rem)" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCount((prev) => prev + LOAD_MORE_COUNT)}
                className="load-more"
              >
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
                Continue the lap
                <ChevronDown size={14} />
              </motion.button>
            </div>
          </AnimatedSection>
        )}

        {/* Finish line */}
        {!hasMore && (
          <AnimatedSection>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                marginTop: "clamp(2.5rem, 6vw, 4rem)",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                textAlign: "center",
              }}
            >
              <div className="checker-big" style={{ width: "clamp(120px, 20vw, 180px)", height: "22px" }} />
              <p
                className="stamp"
                style={{ color: "var(--yellow)", borderColor: "rgba(251, 191, 36, 0.5)", fontSize: "0.7rem", transform: "rotate(-1.5deg)" }}
              >
                Finish line
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)", maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
                Every corner counts. The next lap starts when you&apos;re ready to build together.
              </p>
              <Link href="/#contact" className="btn btn-primary">
                Start the next lap
              </Link>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

function CircuitRow({
  project,
  corner,
  delay,
}: {
  project: Project;
  corner: number;
  delay: number;
}) {
  const even = (corner - 1) % 2 === 0;
  const statusCfg = STATUS_CONFIG[project.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      data-circuit-row
      id={`row-${project.slug}`}
      style={{ scrollMarginTop: "90px" }}
    >
      <div className="sector-label">
        <span style={{ flex: 1, borderTop: "1px dashed rgba(225,29,72,0.4)" }} />
        <span
          style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.18em",
            color: "var(--yellow)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Corner {String(corner).padStart(2, "0")}
        </span>
        <span style={{ flex: 1, borderTop: "1px dashed rgba(225,29,72,0.4)" }} />
      </div>

      <div className="circuit-row-grid">
        <div className="circuit-node">
          <div style={{ position: "relative", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: "rotate(45deg)",
                background: "var(--bg-card)",
                border: `2px solid ${project.status === "finished" ? "var(--yellow)" : statusCfg.color}`,
                boxShadow: project.status === "ongoing" ? "0 0 18px var(--red-glow)" : "none",
              }}
            />
            <span
              style={{
                position: "relative",
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontWeight: 900,
                fontSize: "0.8rem",
                color: statusCfg.color,
                letterSpacing: "0.02em",
              }}
            >
              T{corner}
            </span>
          </div>
          <p
            className="tabular-nums"
            style={{
              textAlign: "center",
              marginTop: "0.4rem",
              fontFamily: 'var(--font-ui)',
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
            }}
          >
            {project.year}
          </p>
        </div>

        <div className={even ? "circuit-card circuit-card--even" : "circuit-card circuit-card--odd"}>
          <div
            className="card-brutal"
            style={{ padding: "clamp(1.1rem, 2.5vw, 1.5rem)", display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative", overflow: "hidden" }}
          >
            <div className="tape-line" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: statusCfg.color }} />
            {project.image && (
              <div className="img-zoom" style={{ position: "relative", width: "100%", height: "clamp(140px, 26vw, 200px)", background: "var(--bg-secondary)", marginBottom: "0.25rem" }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span
                  className="sticker"
                  style={{
                    position: "absolute",
                    bottom: "0.5rem",
                    left: "0.5rem",
                    background: "var(--yellow)",
                    color: "#0a0a0a",
                    fontSize: "0.56rem",
                    padding: "0.25rem 0.55rem",
                    fontWeight: 800,
                    fontFamily: 'var(--font-ui)',
                    letterSpacing: "0.14em",
                    transform: "rotate(0deg)",
                  }}
                >
                  T{corner} · {project.year}
                </span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem" }}>
              <h3 style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontWeight: 800, fontSize: "clamp(0.9rem, 2vw, 1.15rem)", letterSpacing: "0.02em" }}>
                {project.title}
              </h3>
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`} title="GitHub" onClick={(e) => e.stopPropagation()} style={{ color: "var(--text-muted)", transition: "color 0.2s", display: "flex" }}>
                  <GithubIcon size={14} />
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`} title="Live demo" onClick={(e) => e.stopPropagation()} style={{ color: "var(--text-muted)", transition: "color 0.2s", display: "flex" }}>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: statusCfg.bg,
                border: `1px solid ${statusCfg.border}`,
                padding: "0.3rem 0.65rem",
                alignSelf: "flex-start",
              }}
            >
              <span style={{ width: "7px", height: "7px", background: statusCfg.color, boxShadow: `0 0 6px ${statusCfg.color}66` }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: "clamp(0.6rem, 0.9vw, 0.68rem)", fontWeight: 800, letterSpacing: "0.12em", color: statusCfg.color }}>
                {statusCfg.label}
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.75rem, 1.3vw, 0.84rem)", lineHeight: 1.6, flex: 1 }}>
              {project.shortDesc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-xs)" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="chip-square"
                  style={{
                    background: "var(--red-dim)",
                    border: "1px solid var(--border-red)",
                    color: "var(--red-light)",
                    fontSize: "clamp(0.62rem, 1vw, 0.7rem)",
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    padding: "0.28rem 0.6rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--red-light)",
                fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Read more <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}