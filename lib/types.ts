export interface SocialLink {
  label: string;
  value: string;
  href: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface Config {
  name: string;
  riderNumber: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  availableForWork: boolean;
  social: {
    github: string;
    linkedin: string;
    whatsapp: string;
    instagram: string;
  };
  stats: Stat[];
  bio: string;
  avatar?: string;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor: string;
  traits: string[];
  skillMeters: { label: string; value: number }[];
  content: string;
  image?: string;
}

export interface SkillCategory {
  name: string;
  color: string;
  items: string[];
}

export interface SkillsSection {
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export type ProjectStatus = "finished" | "ongoing" | "delayed";

export const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; border: string }> = {
  finished: { label: "FINISHED", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" },
  ongoing: { label: "ONGOING", color: "#eab308", bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.3)" },
  delayed: { label: "DELAYED", color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
};

export interface Project {
  title: string;
  slug: string;
  position: number;
  year: string;
  featured: boolean;
  status: ProjectStatus;
  tech: string[];
  github: string;
  live: string;
  image: string;
  role: string;
  shortDesc: string;
  description: string;
  contributions: string[];
  impact: string;
}

export interface ExperienceEntry {
  type: "work" | "org";
  title: string;
  org: string;
  location: string;
  period: string;
  desc: string;
  bullets: string[];
  impact: string;
  image?: string;
}

export interface ExperienceSection {
  title: string;
  subtitle: string;
  entries: ExperienceEntry[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
  image?: string;
}

export interface CertificationsSection {
  title: string;
  subtitle: string;
  certifications: Certification[];
}

export interface ContactSection {
  title: string;
  subtitle: string;
  availabilityBadge: string;
  contactLinks: SocialLink[];
  content: string;
  image?: string;
}
