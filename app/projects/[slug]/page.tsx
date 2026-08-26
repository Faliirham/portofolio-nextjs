import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjects, getConfig } from "@/lib/content";
import { sortProjectsForDisplay } from "@/lib/projects";
import Navbar from "@/components/sections/Navbar";
import { STATUS_CONFIG, type Project } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://faliirham.pages.dev";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  const name = getConfig().name;
  return {
    title: `${project.title} — ${name}`,
    description: project.shortDesc,
    alternates: {
      canonical: `${SITE_URL}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — ${name}`,
      description: project.shortDesc,
      url: `${SITE_URL}/projects/${project.slug}`,
      siteName: name,
      type: "article",
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
  };
}

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <span className="tape-line" style={{ width: "1.25rem", height: "5px", display: "inline-block" }} />
      {children}
    </h2>
  );
}

function NeighborLink({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-brutal"
      style={{
        padding: "clamp(0.9rem, 2vw, 1.15rem)",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        alignItems: isPrev ? "flex-start" : "flex-end",
        textAlign: isPrev ? "left" : "right",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          fontFamily: "var(--font-ui)",
          fontSize: "0.62rem",
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--red-light)",
        }}
      >
        {isPrev && <ArrowLeft size={12} />}
        {isPrev ? "Previous corner" : "Next corner"}
        {!isPrev && <ArrowRight size={12} />}
      </span>
      <span
        style={{
          fontFamily: "var(--font-orbitron), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
          letterSpacing: "0.02em",
        }}
      >
        {project.title}
      </span>
      <span className="tabular-nums" style={{ fontSize: "0.66rem", color: "var(--text-muted)", fontFamily: "var(--font-ui)", letterSpacing: "0.08em" }}>
        {project.year}
      </span>
    </Link>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const sorted = sortProjectsForDisplay(getProjects());
  const project = sorted.find((p) => p.slug === slug);
  if (!project) notFound();

  const config = getConfig();
  const index = sorted.findIndex((p) => p.slug === slug);
  const prev = sorted[(index - 1 + sorted.length) % sorted.length];
  const next = sorted[(index + 1) % sorted.length];
  const sc = STATUS_CONFIG[project.status];

  return (
    <>
      <Navbar config={config} anchorBase="/" />
      <main id="main" style={{ minHeight: "100dvh", background: "var(--bg-primary)", color: "var(--text-primary)", padding: "calc(64px + clamp(2rem, 5vw, 3.5rem)) 0 clamp(2.5rem, 6vw, 4rem)" }}>
        <div className="container-custom" style={{ maxWidth: "760px" }}>
          <Link href="/#projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.82rem", marginBottom: "2rem", transition: "color 0.2s" }}>
            <ArrowLeft size={14} /> Back to projects
          </Link>

          <div style={{ marginBottom: "2.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span className="tabular-nums" style={{ fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
                T{index + 1} · {project.year}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  borderRadius: "2px",
                  padding: "0.25rem 0.65rem",
                }}
              >
                <span style={{ width: "7px", height: "7px", background: sc.color, boxShadow: `0 0 6px ${sc.color}66`, animation: project.status === "ongoing" ? "pulse 2s infinite" : undefined }} />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", color: sc.color }}>
                  {sc.label}
                </span>
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-orbitron), sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "0.01em", marginTop: "0.25rem", marginBottom: "1rem", textTransform: "uppercase" }}>
              {project.title}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.65 }}>{project.shortDesc}</p>
          </div>

          {project.image && (
            <div style={{ position: "relative", marginBottom: "2.5rem" }}>
              {/* Offset frame */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "translate(clamp(10px, 1.5vw, 14px), clamp(10px, 1.5vw, 14px))",
                  border: "1px solid var(--red)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="img-zoom"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  background: "var(--bg-secondary)",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 760px"
                />
                <span
                  className="sticker"
                  style={{
                    position: "absolute",
                    bottom: "0.6rem",
                    left: "0.6rem",
                    background: "var(--yellow)",
                    color: "#0a0a0a",
                    fontSize: "0.62rem",
                    padding: "0.28rem 0.6rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-ui)",
                    letterSpacing: "0.14em",
                  }}
                >
                  T{index + 1} · {project.year}
                </span>
              </div>
              <div className="tape-line" style={{ height: "6px" }} />
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              GitHub
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Live Demo
            </a>
          </div>

          <div style={{ height: "1px", background: "var(--border)", marginBottom: "2.5rem" }} />

          <div>
            <SectionLabel>Overview</SectionLabel>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.75rem" }}>{project.description}</p>

            <SectionLabel>Role</SectionLabel>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.75rem", fontWeight: 500 }}>{project.role}</p>

            {project.contributions?.length > 0 && (
              <>
                <SectionLabel>Key Contributions</SectionLabel>
                <ul style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.75rem", paddingLeft: "1.2rem", listStyleType: "disc" }}>
                  {project.contributions.map((c, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem" }}>{c}</li>
                  ))}
                </ul>
              </>
            )}

            {project.impact && (
              <>
                <SectionLabel>Impact</SectionLabel>
                <div style={{ padding: "1rem", background: "var(--red-dim)", borderLeft: "4px solid var(--red)", color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "1.75rem" }}>
                  {project.impact}
                </div>
              </>
            )}

            <SectionLabel>Tech Stack</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tech.map((t) => (
                <span key={t} className="chip-square" style={{ background: "var(--red-dim)", border: "1px solid var(--border-red)", color: "#fca5a5", fontSize: "0.78rem", fontWeight: 500, padding: "0.35rem 0.75rem" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Prev / next project */}
          <nav aria-label="Project navigation" className="grid grid-cols-1 gap-4 md:grid-cols-2" style={{ marginTop: "2.5rem" }}>
            <NeighborLink project={prev} direction="prev" />
            <NeighborLink project={next} direction="next" />
          </nav>

          {/* Footer strip */}
          <footer style={{ marginTop: "clamp(3rem, 6vw, 4rem)" }}>
            <div className="checker-big" style={{ width: "100%", height: "14px", opacity: 0.45, marginBottom: "1px" }} />
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em", fontWeight: 600 }}>
                © {new Date().getFullYear()} {config.name.toUpperCase()}
              </p>
              <Link href="/#contact" style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em", fontWeight: 600, textDecoration: "none" }}>
                MALANG, INDONESIA · RIDER #{config.riderNumber.replace("#", "")}
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
