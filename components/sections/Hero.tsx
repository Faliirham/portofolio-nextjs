"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/icons";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import TiltCard from "@/components/ui/TiltCard";
import Marquee from "@/components/ui/Marquee";
import Lanyard from "@/components/ui/Lanyard";
import type { Config } from "@/lib/types";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
  loading: () => null,
});

const TICKER = [
  "Full-Stack Developer",
  "AI Engineer",
  "Malang, Indonesia",
  "Next.js",
  "React",
  "TypeScript",
  "Laravel",
  "Go",
  "Supabase",
  "Docker",
  "AWS",
  "Cloudflare",
];

export default function Hero({ config }: { config: Config }) {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("gsap").then(({ gsap }) => {
      if (nameRef.current) {
        gsap.from(nameRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.4,
        });
      }
    });
  }, []);

  const [firstName, ...rest] = config.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
        paddingBottom: "clamp(4rem, 9vw, 7rem)",
      }}
    >
      <ParticleField />

      {/* Diagonal stripes — top right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "clamp(240px, 38vw, 520px)",
          height: "clamp(240px, 38vw, 520px)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          opacity: 0.32,
          pointerEvents: "none",
        }}
        className="stripes-diag"
      />

      {/* Checker — bottom left corner */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-64px",
          left: "-64px",
          width: "clamp(140px, 20vw, 260px)",
          height: "clamp(140px, 20vw, 260px)",
          opacity: 0.16,
          pointerEvents: "none",
        }}
        className="checker-big"
      />

      {/* Red glow blob */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "-12%",
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(circle, rgba(225,29,72,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Rider number watermark */}
      <span
        aria-hidden="true"
        className="text-outline-faint"
        style={{
          position: "absolute",
          top: "3%",
          right: "1vw",
          fontFamily: 'var(--font-orbitron), sans-serif',
          fontWeight: 900,
          fontSize: "clamp(7rem, 26vw, 19rem)",
          lineHeight: 1,
          letterSpacing: "0.02em",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {config.riderNumber.replace("#", "")}
      </span>

      {/* Hanging lanyard — pull it with the cursor */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: -40, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: "82px",
          right: "clamp(0.5rem, 3vw, 3.5rem)",
          width: 300,
          height: 280,
          zIndex: 3,
          pointerEvents: "auto",
        }}
      >
        <Lanyard config={config} />
      </motion.div>

      <div className="container-custom" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{ display: "grid", gap: "clamp(2rem, 5vw, 3rem)", alignItems: "center" }}
          className="lg:grid-cols-[1fr_380px]"
        >
          {/* Left */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            }}
          >
            {/* Status badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ marginBottom: "1.75rem" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--red-dim)",
                  border: "1px solid var(--border-red)",
                  padding: "0.3rem 0.9rem",
                  fontSize: "0.72rem",
                  fontFamily: 'var(--font-ui)',
                  color: "#fca5a5",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                }}
              >
                <span
                  style={{
                    width: "6px", height: "6px",
                    background: "#22c55e", display: "block",
                    boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite",
                  }}
                />
                AVAILABLE FOR WORK
              </span>
            </motion.div>

            {/* Name — giant brutal stack */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ marginBottom: "1.5rem" }}
            >
              <h1
                ref={nameRef}
                style={{
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  fontWeight: 900,
                  lineHeight: 0.82,
                  letterSpacing: "0.005em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ display: "block", fontSize: "clamp(3rem, 13vw, 9.5rem)" }}>
                  {firstName}
                </span>
                <span
                  className="text-outline"
                  style={{ display: "block", fontSize: "clamp(1.7rem, 7vw, 4.5rem)", marginTop: "0.12em" }}
                >
                  {lastName}
                </span>
              </h1>
            </motion.div>

            {/* Role — red tape + label */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem", flexWrap: "wrap" }}
            >
              <div className="tape-line" style={{ width: "3.5rem", flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "clamp(0.68rem, 1.6vw, 0.82rem)",
                  fontFamily: 'var(--font-ui)',
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {config.role} · {config.location}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)", color: "var(--text-secondary)", fontWeight: 400, maxWidth: "480px", marginBottom: "2rem", lineHeight: 1.6 }}
            >
              {config.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              <a href="#projects" className="btn btn-primary">
                VIEW PROJECTS
              </a>
              <a href="#contact" className="btn btn-outline">
                GET IN TOUCH
              </a>
            </motion.div>

            {/* Stats — decal tiles */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.75rem" }}
            >
              {config.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="sticker"
                  style={{
                    background: i === 1 ? "var(--yellow)" : "var(--bg-card)",
                    border: i === 1 ? "2px solid var(--yellow)" : "1px solid var(--border)",
                    color: i === 1 ? "#0a0a0a" : "var(--text-primary)",
                    padding: "0.7rem 1.1rem",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0.15rem",
                    transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.2deg)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: "0.55rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      opacity: i === 1 ? 0.75 : 0.6,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    {s.icon} {s.label}
                  </span>
                  <span
                    className="tabular-nums"
                    style={{
                      fontFamily: 'var(--font-orbitron), sans-serif',
                      fontWeight: 800,
                      fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                      letterSpacing: "0.03em",
                      color: i === 1 ? "#0a0a0a" : "var(--red-light)",
                    }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}
            >
              {[
                { href: config.social.github, icon: <GithubIcon size={17} />, label: "GitHub" },
                { href: config.social.linkedin, icon: <LinkedinIcon size={17} />, label: "LinkedIn" },
                { href: config.social.instagram, icon: <InstagramIcon size={17} />, label: "Instagram" },
                { href: `mailto:${config.email}`, icon: <Mail size={17} />, label: "Email" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="icon-btn"
                  style={{ padding: i < 3 ? "0 1.05rem" : "0 1.25rem" }}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — rider profile card with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}
          >
            {/* Checker strip above card */}
            <div className="checker-big" style={{ width: "min(340px, 100%)", height: "14px", opacity: 0.9 }} />

            <TiltCard
              style={{
                width: "100%",
                maxWidth: "340px",
              }}
            >
              <div
                className="number-plate"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "1rem",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(225,29,72,0.08) 0%, transparent 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "20px",
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    fontWeight: 900,
                    fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                    color: "rgba(255,255,255,0.03)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {config.riderNumber}
                </div>
                <div
                  style={{
                    width: "clamp(100px, 25vw, 220px)",
                    height: "clamp(100px, 25vw, 220px)",
                    borderRadius: "50%",
                    background: config.avatar ? "transparent" : "linear-gradient(135deg, var(--red) 0%, #7f1d1d 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    fontWeight: 900,
                    color: "#fff",
                    border: "3px solid rgba(225,29,72,0.3)",
                    boxShadow: "0 0 40px var(--red-glow)",
                    position: "relative",
                    zIndex: 1,
                    overflow: "hidden",
                  }}
                >
                  {config.avatar ? (
                    <Image
                      src={config.avatar}
                      alt={config.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="220px"
                    />
                  ) : (
                    "FI"
                  )}
                </div>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontWeight: 800, fontSize: "clamp(0.75rem, 2vw, 0.9rem)", letterSpacing: "0.05em" }}>
                    {firstName.toUpperCase()}
                  </p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)", color: "var(--text-muted)", letterSpacing: "0.12em", marginTop: "0.25rem" }}>
                    {config.role.toUpperCase()}
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, var(--red), var(--yellow), var(--red))",
                  }}
                />
              </div>
            </TiltCard>

            {/* Yellow tape under card */}
            <div className="stripes-gold" style={{ width: "min(340px, 100%)", height: "6px", marginTop: "2px", opacity: 0.9 }} />

            <p
              className="stamp"
              style={{ color: "var(--red-light)", borderColor: "var(--border-red)", marginTop: "1.25rem", fontSize: "0.62rem" }}
            >
              RIDER #{config.riderNumber.replace("#", "")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom red marquee band */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Marquee items={[...TICKER, config.riderNumber]} variant="red" />
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
}