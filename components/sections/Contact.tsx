"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedSection, SectionHeading } from "@/components/ui";
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
            <SectionHeading num="06" label="Pit Box" title={<>Let&apos;s build <span className="text-outline-red" style={{ display: "block" }}>together.</span></>} />

            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.8rem, 1.5vw, 0.88rem)", maxWidth: "340px", lineHeight: 1.7 }}>
              I&apos;m open to freelance projects, full-time roles, and collaborations. Reach out through any of the channels below.
            </p>

            {section.image && (
              <div
                ref={photoRef}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "280px",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  marginTop: "1.5rem",
                }}
              >
                <Image src={section.image} alt="Contact me" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 280px" />
                <div className="checker-big" style={{ position: "absolute", top: 0, right: 0, width: "56px", height: "56px", opacity: 0.85 }} />
              </div>
            )}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.25)",
                padding: "0.45rem 1rem",
                fontSize: "clamp(0.6rem, 1.1vw, 0.7rem)",
                color: "#86efac",
                marginTop: section.image ? "1.5rem" : "2rem",
                fontFamily: 'var(--font-ui)',
                letterSpacing: "0.08em",
                fontWeight: 700,
              }}
            >
              <span style={{ width: "7px", height: "7px", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "block", animation: "pulse 2s infinite" }} />
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
                  className="card-brutal"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(0.7rem, 2vw, 1rem)",
                    padding: "clamp(0.85rem, 2vw, 1.15rem) clamp(0.9rem, 2vw, 1.25rem)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div style={{
                    width: "42px",
                    height: "42px",
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
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: "clamp(0.52rem, 1vw, 0.62rem)", color: "var(--text-muted)", letterSpacing: "0.12em", marginBottom: "0.1rem", textTransform: "uppercase", fontWeight: 700 }}>{c.label}</p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: "clamp(0.72rem, 1.4vw, 0.85rem)", fontWeight: 600, letterSpacing: "0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</p>
                  </div>
                  <div style={{ color: "var(--text-muted)", flexShrink: 0, transition: "color 0.2s" }}><ArrowUpRight size={16} /></div>
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          <div className="checker-big" style={{ width: "100%", height: "14px", opacity: 0.45, marginBottom: "1px" }} />
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "1.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: "clamp(0.58rem, 1vw, 0.68rem)", color: "var(--text-muted)", letterSpacing: "0.08em", fontWeight: 600 }}>
              © {new Date().getFullYear()} {config.name.toUpperCase()}. BUILT WITH NEXT.JS & TAILWIND.
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: "clamp(0.58rem, 1vw, 0.68rem)", color: "var(--text-muted)", letterSpacing: "0.08em", fontWeight: 600 }}>
              MALANG, INDONESIA 🇮🇩 · RIDER #{config.riderNumber.replace("#", "")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}