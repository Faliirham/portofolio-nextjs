"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, Trophy, Medal } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import type { Project } from "@/lib/types";

export default function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

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

        {/* Featured — podium style */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", marginBottom: "1px" }}
          className="md:grid-cols-2"
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} large />
          ))}
        </div>

        {/* Others */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px" }}
          className="md:grid-cols-2"
        >
          {others.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + featured.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  const podiumColors: Record<number, string> = { 1: "#fbbf24", 2: "#c0c0c0", 3: "#cd7f32" };
  const podiumColor = podiumColors[project.position] || "var(--text-muted)";

  return (
    <AnimatedSection delay={index * 0.07}>
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
        {/* Top stripe — checkered for featured */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: large ? `linear-gradient(90deg, ${podiumColor}, transparent)` : "linear-gradient(90deg, var(--red), transparent)",
          }}
        />

        {/* Project image */}
        {project.image && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: large ? "clamp(120px, 25vw, 180px)" : "clamp(80px, 18vw, 120px)",
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
            {large && project.position === 1 && (
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
                <Trophy size={14} />
              </div>
            )}
            {large && project.position === 2 && (
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
                <Medal size={14} />
              </div>
            )}
            {large && project.position === 3 && (
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
                <Medal size={14} />
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
                {large && (
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
                )}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  fontWeight: 800,
                  fontSize: large ? "clamp(0.85rem, 1.8vw, 1rem)" : "clamp(0.75rem, 1.5vw, 0.88rem)",
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
    </AnimatedSection>
  );
}
