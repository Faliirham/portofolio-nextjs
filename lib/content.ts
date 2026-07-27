import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Config,
  AboutSection,
  SkillsSection,
  Project,
  ProjectStatus,
  ExperienceSection,
  CertificationsSection,
  ContactSection,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMdx(fileName: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(CONTENT_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content: content.trim() };
}

function readProjectMdx(slug: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(CONTENT_DIR, "projects", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content: content.trim() };
}

function resolveImage(section: string, filename?: string): string {
  if (!filename) return "";
  if (filename.startsWith("/")) return filename;
  return `/images/${section}/${filename}`;
}

export function getConfig(): Config {
  const { data, content } = readMdx("_config.mdx");
  const d = data as Record<string, unknown>;
  return {
    name: d.name as string,
    riderNumber: d.riderNumber as string,
    role: d.role as string,
    tagline: d.tagline as string,
    location: d.location as string,
    email: d.email as string,
    availableForWork: d.availableForWork as boolean,
    social: d.social as Config["social"],
    stats: d.stats as Config["stats"],
    bio: content,
    avatar: resolveImage("config", d.avatar as string | undefined),
  };
}

export function getAboutSection(): AboutSection {
  const { data, content } = readMdx("about.mdx");
  const d = data as Record<string, unknown>;
  return {
    title: d.title as string,
    subtitle: d.subtitle as string,
    quote: d.quote as string,
    quoteAuthor: d.quoteAuthor as string,
    traits: d.traits as string[],
    skillMeters: d.skillMeters as AboutSection["skillMeters"],
    content,
    image: resolveImage("about", d.image as string | undefined),
  };
}

export function getSkillsSection(): SkillsSection {
  const { data } = readMdx("skills.mdx");
  const d = data as Record<string, unknown>;
  return {
    title: d.title as string,
    subtitle: d.subtitle as string,
    categories: d.categories as SkillCategory[],
  };
}

import type { SkillCategory } from "./types";

export function getProjects(): Project[] {
  const slugs = fs
    .readdirSync(path.join(CONTENT_DIR, "projects"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));

  return slugs.map((slug) => {
    const { data, content } = readProjectMdx(slug);
    const d = data as Record<string, unknown>;
    const sections = parseSections(content);

    return {
      title: d.title as string,
      slug: d.slug as string,
      position: d.position as number,
      year: d.year as string,
      featured: d.featured as boolean,
      status: (d.status as ProjectStatus) || "finished",
      tech: d.tech as string[],
      github: d.github as string,
      live: d.live as string,
      image: resolveImage("projects", d.image as string | undefined),
      role: d.role as string,
      shortDesc: d.shortDesc as string,
      description: sections["Description"] || content.split("##")[0]?.trim() || "",
      contributions: sections["Contributions"]
        ? sections["Contributions"]
            .split("\n")
            .filter((l) => l.startsWith("- "))
            .map((l) => l.slice(2))
        : [],
      impact: sections["Impact"] || "",
    };
  });
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export function getExperienceSection(): ExperienceSection {
  const { data } = readMdx("experience.mdx");
  const d = data as Record<string, unknown>;
  const entries = d.entries as ExperienceSection["entries"];
  return {
    title: d.title as string,
    subtitle: d.subtitle as string,
    entries: entries.map((entry) => ({
      ...entry,
      image: resolveImage("experience", entry.image),
    })),
  };
}

export function getCertificationsSection(): CertificationsSection {
  const { data } = readMdx("certifications.mdx");
  const d = data as Record<string, unknown>;
  return {
    title: d.title as string,
    subtitle: d.subtitle as string,
    certifications: (d.certifications as CertificationsSection["certifications"]).map(
      (c) => ({
        ...c,
        image: resolveImage("certifications", c.image),
      })
    ),
  };
}

export function getContactSection(): ContactSection {
  const { data, content } = readMdx("contact.mdx");
  const d = data as Record<string, unknown>;
  return {
    title: d.title as string,
    subtitle: d.subtitle as string,
    availabilityBadge: d.availabilityBadge as string,
    contactLinks: d.contactLinks as ContactSection["contactLinks"],
    content,
    image: resolveImage("contact", d.image as string | undefined),
  };
}

function parseSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const parts = content.split(/^## /m).filter(Boolean);
  for (const part of parts) {
    const lines = part.split("\n");
    const title = lines[0]?.trim();
    if (title) {
      sections[title] = lines.slice(1).join("\n").trim();
    }
  }
  return sections;
}
