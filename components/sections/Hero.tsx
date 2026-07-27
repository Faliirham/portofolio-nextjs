"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/icons";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import TiltCard from "@/components/ui/TiltCard";
import type { Config } from "@/lib/types";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
  loading: () => null,
});

export default function Hero({ config }: { config: Config }) {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("gsap").then(({ gsap }) => {
      if (nameRef.current) {
        gsap.from(nameRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
        });
      }
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* 3D Particle field background */}
      <ParticleField />

      {/* Speed lines background */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="speed-line"
          style={{
            top: `${15 + i * 18}%`,
            left: 0,
            right: 0,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      {/* Carbon fiber subtle overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Red glow blob */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(225,29,72,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

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
              style={{ marginBottom: "1.5rem" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--red-dim)",
                  border: "1px solid var(--border-red)",
                  borderRadius: "100px",
                  padding: "0.3rem 0.9rem",
                  fontSize: "0.72rem",
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  color: "#fca5a5",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                }}
              >
                <span
                  style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#22c55e", display: "block",
                    boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite",
                  }}
                />
                AVAILABLE FOR WORK
              </span>
            </motion.div>

            {/* Name — Rider plate style */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ marginBottom: "1.5rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                <h1
                  ref={nameRef}
                  style={{
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    fontSize: "clamp(2.2rem, 7vw, 5rem)",
                    fontWeight: 900,
                    lineHeight: 1.0,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {config.name.split(" ")[0]}
                </h1>
                <span
                  style={{
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    fontWeight: 900,
                    fontSize: "clamp(1.2rem, 4vw, 3rem)",
                    color: "var(--yellow)",
                    opacity: 0.3,
                    letterSpacing: "0.05em",
                  }}
                >
                  {config.riderNumber}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  fontSize: "clamp(0.75rem, 2vw, 1.3rem)",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {config.name.split(" ").slice(1).join(" ")}
              </p>
            </motion.div>

            {/* Role line */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}
            >
              <span style={{ width: "2rem", height: "2px", background: "var(--red)", display: "block", flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {config.role} · {config.location}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)", color: "var(--text-secondary)", fontWeight: 300, maxWidth: "480px", marginBottom: "2.5rem", lineHeight: 1.6 }}
            >
              {config.tagline}
              <br />
              <span style={{ color: "var(--text-muted)", fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)" }}>Clean code. Thoughtful UX. Real impact.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "clamp(2rem, 5vw, 3rem)" }}
            >
              <a
                href="#projects"
                style={{
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  background: "var(--red)",
                  color: "#fff",
                  padding: "clamp(0.6rem, 2vw, 0.75rem) clamp(1.2rem, 3vw, 1.75rem)",
                  fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
                  fontWeight: 700,
                  borderRadius: "2px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background 0.2s",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red-light)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red)"; }}
              >
                VIEW PROJECTS
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  border: "1px solid var(--border-red)",
                  color: "#fca5a5",
                  padding: "clamp(0.6rem, 2vw, 0.75rem) clamp(1.2rem, 3vw, 1.75rem)",
                  fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
                  fontWeight: 500,
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red-dim)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                GET IN TOUCH
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}
            >
              {[
                { href: config.social.github, icon: <GithubIcon size={15} />, label: "GitHub" },
                { href: config.social.linkedin, icon: <LinkedinIcon size={15} />, label: "LinkedIn" },
                { href: config.social.instagram, icon: <InstagramIcon size={15} />, label: "Instagram" },
                { href: `mailto:${config.email}`, icon: <Mail size={15} />, label: "Email" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    color: "var(--text-muted)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--red-light)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-red)";
                    (e.currentTarget as HTMLElement).style.background = "var(--red-dim)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Rider profile card with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <TiltCard
              style={{
                width: "100%",
                maxWidth: "340px",
              }}
            >
              {/* Main card */}
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
                {/* Rider number big */}
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
                {/* Avatar */}
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
                    {config.name.split(" ")[0].toUpperCase()}
                  </p>
                  <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)", color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: "0.25rem" }}>
                    {config.role.toUpperCase()}
                  </p>
                </div>
                {/* Bottom stripe */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, var(--red), var(--yellow), var(--red))",
                  }}
                />
              </div>
            </TiltCard>

            {/* Race stats grid */}
            <div
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1px",
                width: "100%",
                maxWidth: "340px",
                marginTop: "1px",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              {config.stats.map((s) => (
                <div key={s.label} style={{ background: "var(--bg-card)", padding: "clamp(0.5rem, 2vw, 0.8rem)", textAlign: "center" }}>
                  <p style={{ fontSize: "clamp(0.8rem, 2vw, 0.9rem)", marginBottom: "0.15rem" }}>{s.icon}</p>
                  <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontWeight: 800, fontSize: "clamp(0.8rem, 2vw, 1rem)", color: "var(--red-light)" }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: 'var(--font-orbitron), sans-serif', fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: "absolute",
            bottom: "clamp(-1rem, -3vw, -3rem)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "var(--text-muted)",
          }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
}
