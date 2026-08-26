"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/icons";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Marquee from "@/components/ui/Marquee";
import ProfileCard from "@/components/ProfileCard";
import SplitText from "@/components/reactbits/SplitText";
import Magnet from "@/components/reactbits/Magnet";
import CountUp from "@/components/reactbits/CountUp";
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

/* Lightning-bolt pattern revealed through the card's holographic shine */
const PROFILE_ICON_PATTERN = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><path fill="#ffffff" d="M70 6 L26 66 L50 66 L42 114 L94 48 L64 48 Z"/></svg>'
)
  .replace(/'/g, "%27")
  .replace(/\(/g, "%28")
  .replace(/\)/g, "%29")}`;

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

      <div className="container-custom" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{ display: "grid", gap: "clamp(2rem, 5vw, 3rem)", alignItems: "center" }}
          className="grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_380px]"
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
              style={{ marginBottom: "var(--gap-lg)" }}
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
              style={{ marginBottom: "var(--gap-md)" }}
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
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "var(--gap-lg)", flexWrap: "wrap" }}
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
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ marginBottom: "2rem" }}
            >
              <SplitText
                text={config.tagline}
                tag="p"
                delay={12}
                duration={0.9}
                threshold={0.2}
                textAlign="left"
                className="hero-tagline"
              />
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "clamp(2rem, 4vw, 2.5rem)" }}
            >
              <Magnet padding={60} magnetStrength={3} activeTransition="transform 0.2s ease-out">
                <a href="#projects" className="btn btn-primary">
                  VIEW PROJECTS
                </a>
              </Magnet>
              <Magnet padding={60} magnetStrength={3} activeTransition="transform 0.2s ease-out">
                <a href="#contact" className="btn btn-outline">
                  GET IN TOUCH
                </a>
              </Magnet>
            </motion.div>

            {/* Stats — decal tiles */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "var(--gap-lg)" }}
            >
              {config.stats.map((s, i) => {
                const match = s.value.match(/^(\d+(?:\.\d+)?)(.*)$/);
                const num = match ? parseFloat(match[1]) : 0;
                const suffix = match ? match[2] : "";
                return (
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
                      style={{
                        fontFamily: 'var(--font-orbitron), sans-serif',
                        fontWeight: 800,
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        letterSpacing: "0.03em",
                        color: i === 1 ? "#0a0a0a" : "var(--red-light)",
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.15rem",
                      }}
                    >
                      <CountUp to={num} duration={1.4} className="tabular-nums" />
                      {suffix && <span style={{ fontSize: "0.55em" }}>{suffix}</span>}
                    </span>
                  </div>
                );
              })}
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
              <Magnet key={s.label} padding={70} magnetStrength={4} activeTransition="transform 0.2s ease-out">
                <a
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
              </Magnet>
            ))}
            </motion.div>
          </motion.div>

          {/* Right — interactive profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hero-profile-col"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}
          >
            <ProfileCard
              avatarUrl={config.avatar}
              miniAvatarUrl={config.avatar}
              iconUrl={PROFILE_ICON_PATTERN}
              name={config.name}
              title={config.role}
              handle={config.social.github.split("/").filter(Boolean).pop() || config.name}
              status={config.availableForWork ? "Open to Work" : "Busy"}
              contactText="GET IN TOUCH"
              showUserInfo
              enableTilt
              innerGradient="linear-gradient(145deg, rgba(225,29,72,0.55) 0%, rgba(17,17,17,0.92) 55%, rgba(251,191,36,0.22) 100%)"
              behindGlowColor="rgba(225, 29, 72, 0.45)"
              behindGlowSize="55%"
              className="hero-profile-card"
              onContactClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom red marquee band */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Marquee items={[...TICKER, config.riderNumber]} variant="red" />
      </div>
    </section>
  );
}