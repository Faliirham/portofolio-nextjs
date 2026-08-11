"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { STATUS_CONFIG } from "@/lib/types";

const VIEW_X = 44;
const VIEW_Y = 106;
const VIEW_W = 628;
const VIEW_H = 370;

const PLANE_TILT_X = 26;
const PLANE_TILT_Z = -7;

const CIRCUIT_PATH =
  "M 80 160 H 320 Q 380 160 380 220 L 380 280 Q 380 320 430 320 H 520 Q 580 320 580 380 L 580 400 Q 580 430 530 430 H 320 Q 260 430 260 380 L 260 320 Q 260 280 200 280 H 150 C 140 280 60 160 80 160 Z";

interface Mark {
  x: number;
  y: number;
}

export default function CircuitMap({ projects }: { projects: Project[] }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [startFinish, setStartFinish] = useState<Mark>({ x: 200, y: 160 });
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  useEffect(() => {
    const p = pathRef.current;
    if (!p || projects.length === 0) return;
    const total = p.getTotalLength();
    const step = 1 / (projects.length + 1);
    setMarks(
      projects.map((_, i) => {
        const pt = p.getPointAtLength(total * step * (i + 1));
        return { x: pt.x, y: pt.y };
      })
    );
    const s = p.getPointAtLength(total * 0.045);
    setStartFinish({ x: s.x, y: s.y });
  }, [projects]);

  const jumpTo = (slug: string) => {
    document
      .getElementById(`row-${slug}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const toPct = (coord: number, isX: boolean) =>
    `${(((coord - (isX ? VIEW_X : VIEW_Y)) / (isX ? VIEW_W : VIEW_H)) * 100).toFixed(2)}%`;

  const hoveredIndex = hoveredSlug ? projects.findIndex((p) => p.slug === hoveredSlug) : -1;
  const hoveredProject = hoveredIndex >= 0 ? projects[hoveredIndex] : null;
  const hoveredMark = hoveredIndex >= 0 ? marks[hoveredIndex] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: 48 }}
      whileInView={{ opacity: 1, y: 0, rotateX: PLANE_TILT_X }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1100, transformStyle: "preserve-3d", transformOrigin: "center" }}
    >
      <div style={{ position: "relative", transform: `rotateZ(${PLANE_TILT_Z}deg)`, transformStyle: "preserve-3d" }}>
        {/* Floor glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "58%",
            width: "78%",
            height: "46%",
            transform: "translateX(-50%) rotateX(58deg)",
            background: "radial-gradient(ellipse at center, rgba(225,29,72,0.22) 0%, transparent 65%)",
            filter: "blur(14px)",
            zIndex: 0,
          }}
        />

        <svg
          viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
          style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 1, overflow: "visible" }}
          role="img"
          aria-label="Circuit map of my projects"
        >
          <title>Circuit map of projects</title>

          {/* Track bed */}
          <path d={CIRCUIT_PATH} fill="none" stroke="#1f1f1f" strokeWidth="36" strokeLinejoin="round" strokeLinecap="round" />
          {/* Red curb glow */}
          <path d={CIRCUIT_PATH} fill="none" stroke="rgba(225,29,72,0.14)" strokeWidth="36" strokeLinejoin="round" strokeLinecap="round" />
          {/* Track inner edge */}
          <path d={CIRCUIT_PATH} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="28" strokeLinejoin="round" strokeLinecap="round" />
          {/* Racing line (static dotted) */}
          <path
            ref={pathRef}
            d={CIRCUIT_PATH}
            fill="none"
            stroke="var(--red)"
            strokeWidth="2.5"
            strokeDasharray="1 13"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Lap progress — one full lap */}
          <path
            d={CIRCUIT_PATH}
            fill="none"
            stroke="var(--yellow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            pathLength={1000}
            className="cm-lap-progress"
          />
          {/* Car */}
          <g className="cm-car">
            <rect x="-10" y="-5.5" width="20" height="11" rx="3" fill="var(--yellow)" />
            <rect x="-10" y="-5.5" width="5" height="11" rx="2" fill="var(--red)" />
            <rect x="-3" y="-3" width="5" height="6" fill="#0a0a0a" />
          </g>
        </svg>

        {/* HTML chips overlay — crisp text at any scale */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
          {/* Start / Finish */}
          <div
            style={{
              position: "absolute",
              left: toPct(startFinish.x, true),
              top: toPct(startFinish.y, false),
              transform: "translate(-50%, 8px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              cursor: "default",
              pointerEvents: "none",
            }}
          >
            <div className="checker-big" style={{ width: "44px", height: "8px", border: "1px solid rgba(255,255,255,0.35)" }} />
            <span
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontSize: "0.52rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                color: "var(--text-primary)",
                background: "var(--bg-card)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "0.15rem 0.45rem",
                whiteSpace: "nowrap",
              }}
            >
              START / FINISH
            </span>
          </div>

          {/* Corner markers */}
          {marks.map((m, i) => {
            const pr = projects[i];
            const statusCfg = STATUS_CONFIG[pr.status];
            const color = pr.status === "finished" ? "var(--yellow)" : statusCfg.color;
            return (
              <button
                key={pr.slug}
                type="button"
                aria-label={`Go to project ${pr.title} (corner T${i + 1})`}
                title={`${pr.title} — T${i + 1}`}
                onClick={() => jumpTo(pr.slug)}
                onMouseEnter={(e) => {
                  setHoveredSlug(pr.slug);
                  e.currentTarget.style.transform = "translate(-50%, -50%) rotate(45deg) scale(1.18)";
                  e.currentTarget.style.boxShadow = `0 0 20px ${statusCfg.color}88`;
                }}
                onMouseLeave={(e) => {
                  setHoveredSlug((cur) => (cur === pr.slug ? null : cur));
                  e.currentTarget.style.transform = "translate(-50%, -50%) rotate(45deg)";
                  e.currentTarget.style.boxShadow =
                    pr.status === "ongoing" ? "0 0 16px var(--red-glow)" : "2px 2px 0 rgba(0,0,0,0.55)";
                }}
                style={{
                  position: "absolute",
                  left: toPct(m.x, true),
                  top: toPct(m.y, false),
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  width: "38px",
                  height: "38px",
                  background: hoveredSlug === pr.slug ? "var(--red)" : "var(--bg-card)",
                  border: `2px solid ${hoveredSlug === pr.slug ? "#fff" : color}`,
                  boxShadow:
                    hoveredSlug === pr.slug
                      ? "0 0 22px var(--red-glow)"
                      : pr.status === "ongoing"
                        ? "0 0 16px var(--red-glow)"
                        : "2px 2px 0 rgba(0,0,0,0.55)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease",
                  animation:
                    pr.status === "ongoing" ? "pulse-race 2s ease-in-out infinite" : undefined,
                }}
              >
                <span
                  style={{
                    transform: "rotate(-45deg)",
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    fontWeight: 900,
                    fontSize: "0.68rem",
                    color: hoveredSlug === pr.slug ? "#fff" : color,
                    whiteSpace: "nowrap",
                  }}
                >
                  T{i + 1}
                </span>
              </button>
            );
          })}

          {/* Hover tooltip — project summary pops up above the corner */}
          <AnimatePresence>
            {hoveredProject && hoveredMark && (
              <motion.div
                key={hoveredProject.slug}
                initial={{ opacity: 0, y: 10, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.94 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  left: toPct(hoveredMark.x, true),
                  top: toPct(hoveredMark.y, false),
                  transform: `translate(-50%, calc(-100% - 30px)) rotateX(${-PLANE_TILT_X}deg) rotateZ(${-PLANE_TILT_Z}deg)`,
                  transformOrigin: "bottom center",
                  width: "min(240px, 72vw)",
                  zIndex: 5,
                }}
                onMouseEnter={() => setHoveredSlug(null)}
              >
                <Link
                  href={`/projects/${hoveredProject.slug}`}
                  onMouseEnter={() => setHoveredSlug(null)}
                  style={{ textDecoration: "none", display: "block", cursor: "pointer" }}
                >
                  <div
                    className="card-brutal"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-red)",
                      boxShadow: "8px 8px 0 0 rgba(225,29,72,0.4)",
                      padding: "0.9rem 1rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", marginBottom: "0.45rem" }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-orbitron), sans-serif',
                          fontWeight: 800,
                          fontSize: "0.78rem",
                          color: "var(--text-primary)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        T{hoveredIndex + 1} · {hoveredProject.title}
                      </span>
                      <span
                        style={{
                          width: "9px",
                          height: "9px",
                          background: hoveredProject.status === "finished" ? "var(--yellow)" : STATUS_CONFIG[hoveredProject.status].color,
                          boxShadow: `0 0 8px ${hoveredProject.status === "finished" ? "var(--yellow)" : STATUS_CONFIG[hoveredProject.status].color}`,
                          flexShrink: 0,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: "0.72rem",
                        lineHeight: 1.55,
                        color: "var(--text-secondary)",
                        marginBottom: "0.6rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {hoveredProject.shortDesc}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        className="tabular-nums"
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: "0.58rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "var(--text-muted)",
                        }}
                      >
                        {hoveredProject.year}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: "0.6rem",
                          fontWeight: 800,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--red-light)",
                        }}
                      >
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.75rem",
          marginTop: "clamp(0.9rem, 2.5vw, 1.5rem)",
          flexWrap: "wrap",
        }}
      >
        <span
          className="racing-stripe"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            padding: "0.35rem 0.8rem",
          }}
        >
          <span style={{ color: "var(--yellow)" }}>FULL CIRCUIT</span> · {projects.length} CORNERS · 1 LAP
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: "0.58rem",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}
        >
          Hover a corner for a summary — click to jump
        </span>
      </div>

      <style>{`
        .cm-lap-progress {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: cm-lap 12s linear infinite;
        }
        .cm-car {
          offset-path: path("${CIRCUIT_PATH}");
          offset-rotate: auto;
          offset-anchor: 50% 50%;
          transform-box: fill-box;
          animation: cm-drive 12s linear infinite;
          filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.85));
        }
        @keyframes cm-lap {
          to { stroke-dashoffset: 0; }
        }
        @keyframes cm-drive {
          to { offset-distance: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cm-lap-progress, .cm-car { animation: none; }
        }
      `}</style>
    </motion.div>
  );
}