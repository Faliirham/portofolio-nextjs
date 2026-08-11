import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects, getConfig } from "@/lib/content";
import { STATUS_CONFIG } from "@/lib/types";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return { title: `${project.title} — ${getConfig().name}`, description: project.shortDesc };
}

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main id="main" style={{ minHeight: "100dvh", background: "var(--bg-primary)", color: "var(--text-primary)", padding: "5rem 0" }}>
      <div className="container-custom" style={{ maxWidth: "720px" }}>
        <Link href="/#projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.82rem", marginBottom: "3rem", transition: "color 0.2s" }}>
          <ArrowLeft size={14} /> Back to projects
        </Link>

        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>{project.year}</span>
            {(() => {
              const sc = STATUS_CONFIG[project.status];
              return (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background: sc.bg,
                    border: `1px solid ${sc.border}`,
                    borderRadius: "2px",
                    padding: "0.2rem 0.55rem",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: sc.color, boxShadow: `0 0 6px ${sc.color}66` }} />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.1em", color: sc.color }}>
                    {sc.label}
                  </span>
                </span>
              );
            })()}
          </div>
          <h1 style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.01em", marginTop: "0.25rem", marginBottom: "1rem" }}>
            {project.title}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>{project.shortDesc}</p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "3rem" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: "0.55rem 1rem", fontSize: "0.72rem" }}>
            <GithubIcon size={14} /> GitHub
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.72rem" }}>
            <ExternalLink size={14} /> Live Demo
          </a>
        </div>

        <div style={{ height: "1px", background: "var(--border)", marginBottom: "2.5rem" }} />

        <div>
          <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: "1rem" }}>
            Overview
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem" }}>{project.description}</p>
          
          <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: "1rem" }}>
            Role
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem", fontWeight: 500 }}>{project.role}</p>

          <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: "1rem" }}>
            Key Contributions
          </h2>
          <ul style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem", paddingLeft: "1.2rem", listStyleType: "disc" }}>
            {project.contributions?.map((c, i) => (
              <li key={i} style={{ marginBottom: "0.5rem" }}>{c}</li>
            ))}
          </ul>

          <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: "1rem" }}>
            Impact
          </h2>
          <div style={{ padding: "1rem", background: "var(--red-dim)", borderLeft: "3px solid var(--red)", color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.6, borderRadius: "0 4px 4px 0" }}>
            {project.impact}
          </div>
        </div>

        <div style={{ marginTop: "2.5rem" }}>
          <h2 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: "1rem" }}>
            Tech Stack
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.tech.map((t) => (
              <span key={t} style={{ background: "var(--red-dim)", border: "1px solid var(--border-red)", color: "#fca5a5", fontSize: "0.78rem", fontWeight: 500, padding: "0.35rem 0.75rem", borderRadius: "2px" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
