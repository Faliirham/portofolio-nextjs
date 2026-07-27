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
}

export interface AboutSection {
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor: string;
  traits: string[];
  skillMeters: { label: string; value: number }[];
  content: string;
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

export interface Project {
  title: string;
  slug: string;
  position: number;
  year: string;
  featured: boolean;
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
  spotifyEmbed: string;
  contactLinks: SocialLink[];
  content: string;
}
