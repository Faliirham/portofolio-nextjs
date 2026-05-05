"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects } from "@/lib/data";
import { AnimatedSection, SectionLabel, Badge } from "@/components/ui";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" style={{ padding: "7rem 0", borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <AnimatedSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <SectionLabel>Projects</SectionLabel>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
                Selected work
              </h2>
            </div>
            <Link
              href="#projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--red-light)",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 500,
              }}
            >
              All projects <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        {/* Featured grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
            marginBottom: "1px",
          }}
          className="md:grid-cols-2"
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} large />
          ))}
        </div>

        {/* Others grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
          }}
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
  project: (typeof projects)[0];
  index: number;
  large?: boolean;
}) {
  return (
    <AnimatedSection delay={index * 0.07}>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          padding: large ? "2.25rem" : "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
        onHoverStart={(e) => {
          (e.target as HTMLElement).closest(".project-card-inner")?.setAttribute("data-hover", "true");
        }}
        className="group"
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(220,38,38,0.35)";
          el.style.boxShadow = "0 0 40px rgba(220,38,38,0.06)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Hover glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, var(--red), transparent)",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
          className="group-hover:opacity-100"
        />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
              {project.year}
            </span>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: large ? "1.2rem" : "1rem",
                marginTop: "0.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h3>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                color: "var(--text-muted)",
                transition: "color 0.2s",
                display: "flex",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              <GithubIcon size={15} />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                color: "var(--text-muted)",
                transition: "color 0.2s",
                display: "flex",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--red-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, flex: 1 }}>
          {project.shortDesc}
        </p>

        {/* Tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
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
            fontSize: "0.78rem",
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          Read more <ArrowRight size={12} />
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}
