"use client";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/icons";

const contacts = [
  { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: <Mail size={18} />, desc: "Best for project inquiries" },
  { label: "GitHub", value: "fali.irham", href: personalInfo.github, icon: <GithubIcon size={18} />, desc: "Browse my open source work" },
  { label: "LinkedIn", value: "in/fali.irham", href: personalInfo.linkedin, icon: <LinkedinIcon size={18} />, desc: "Professional background" },
  { label: "WhatsApp", value: "+62 812-3456-7890", href: personalInfo.whatsapp, icon: <WhatsappIcon size={18} />, desc: "Quick chat" },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "7rem 0 5rem", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="lg:grid-cols-[1fr_1.2fr]">
          {/* Left */}
          <AnimatedSection>
            <SectionLabel>Contact</SectionLabel>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem", letterSpacing: "-0.03em" }}>
              Let's build something<br />
              <span style={{ color: "var(--red)" }}>together.</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "340px", lineHeight: 1.7 }}>
              I'm open to freelance projects, full-time roles, and collaborations. Reach out through any of the channels below.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "100px", padding: "0.4rem 1rem", fontSize: "0.75rem", color: "#86efac", marginTop: "2rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "block", animation: "pulse 2s infinite" }} />
              Available for new projects
            </div>
          </AnimatedSection>

          {/* Right */}
          <AnimatedSection delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {contacts.map((c, i) => (
                <motion.a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ x: 4 }}
                  style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "1.25rem 1.5rem", textDecoration: "none", color: "inherit", transition: "border-color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-red)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  <div style={{ width: "42px", height: "42px", borderRadius: "4px", background: "var(--red-dim)", border: "1px solid var(--border-red)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red-light)", flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.05em", marginBottom: "0.1rem" }}>{c.label}</p>
                    <p style={{ fontSize: "0.88rem", fontWeight: 500 }}>{c.value}</p>
                  </div>
                  <div style={{ color: "var(--text-muted)" }}><ArrowUpRight size={15} /></div>
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid var(--border)", marginTop: "5rem", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>© {new Date().getFullYear()} {personalInfo.name}. Built with Next.js & Tailwind.</p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Malang, Indonesia 🇮🇩</p>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
}
