"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon, InstagramIcon, SpotifyIcon } from "@/components/ui/icons";
import type { ContactSection, Config } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  email: <Mail size={18} />,
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={18} />,
  instagram: <InstagramIcon size={18} />,
  spotify: <SpotifyIcon size={18} />,
  whatsapp: <WhatsappIcon size={18} />,
};

export default function Contact({ section, config }: { section: ContactSection; config: Config }) {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !section.image || !photoRef.current) return;
    import("@/lib/gsap").then(({ gsap }) => {
      gsap.to(photoRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: photoRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, [section.image]);

  const contacts = section.contactLinks.map((c) => ({
    ...c,
    icon: iconMap[c.icon] || <Mail size={18} />,
  }));
  return (
    <section id="contact" className="section-py" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", paddingBottom: "clamp(2rem, 5vw, 5rem)" }}>
      <div className="container-custom">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(2rem, 5vw, 4rem)" }} className="lg:grid-cols-[1fr_1.2fr]">
          {/* Left */}
          <AnimatedSection>
            <SectionLabel>Pit Box</SectionLabel>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", marginBottom: "1rem", letterSpacing: "0.03em", textTransform: "uppercase" }}>
              Let&apos;s build something<br />
              <span style={{ color: "var(--red)" }}>together.</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.8rem, 1.5vw, 0.88rem)", maxWidth: "340px", lineHeight: 1.7 }}>
              I&apos;m open to freelance projects, full-time roles, and collaborations. Reach out through any of the channels below.
            </p>

            {/* Photo */}
            {section.image && (
              <div
                ref={photoRef}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "280px",
                  aspectRatio: "3 / 4",
                  borderRadius: "2px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  marginTop: "1.5rem",
                }}
              >
                <Image src={section.image} alt="Contact me" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 280px" />
              </div>
            )}

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "100px", padding: "0.4rem 1rem", fontSize: "clamp(0.6rem, 1.1vw, 0.7rem)", color: "#86efac", marginTop: section.image ? "1.5rem" : "2rem", fontFamily: 'var(--font-orbitron), sans-serif', letterSpacing: "0.06em" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "block", animation: "pulse 2s infinite" }} />
              AVAILABLE FOR NEW PROJECTS
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(0.7rem, 2vw, 1rem)",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    padding: "clamp(0.8rem, 2vw, 1.1rem) clamp(0.9rem, 2vw, 1.25rem)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-red)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "2px",
                    background: "var(--red-dim)",
                    border: "1px solid var(--border-red)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--red-light)",
                    flexShrink: 0,
                  }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.5rem, 1vw, 0.6rem)", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "0.1rem", textTransform: "uppercase" }}>{c.label}</p>
                    <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.7rem, 1.4vw, 0.82rem)", fontWeight: 600, letterSpacing: "0.03em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</p>
                  </div>
                  <div style={{ color: "var(--text-muted)", flexShrink: 0 }}><ArrowUpRight size={14} /></div>
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid var(--border)", marginTop: "clamp(3rem, 6vw, 5rem)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.55rem, 1vw, 0.65rem)", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} {config.name.toUpperCase()}. BUILT WITH NEXT.JS & TAILWIND.
          </p>
          <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.55rem, 1vw, 0.65rem)", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
            MALANG, INDONESIA 🇮🇩
          </p>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
}
