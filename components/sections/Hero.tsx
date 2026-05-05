"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Mail } from "lucide-react";

export default function Hero() {
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
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Red glow blob */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "45vw",
          height: "45vw",
          background: "radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{ display: "grid", gap: "3rem", alignItems: "center" }}
          className="grid-cols-1 lg:grid-cols-[1fr_380px]"
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
                  color: "#fca5a5",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                }}
              >
                <span
                  style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#22c55e", display: "block",
                    boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite",
                  }}
                />
                Available for work
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                marginBottom: "1rem",
              }}
            >
              {personalInfo.name.split(" ")[0]}
              <br />
              <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
                {personalInfo.name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            {/* Role line */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}
            >
              <span style={{ width: "2rem", height: "2px", background: "var(--red)", display: "block", flexShrink: 0 }} />
              <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {personalInfo.role} · Surabaya, ID
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--text-secondary)", fontWeight: 300, maxWidth: "480px", marginBottom: "2.5rem", lineHeight: 1.5 }}
            >
              {personalInfo.tagline}
              <br />
              <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Clean code. Thoughtful UX. Real impact.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3rem" }}
            >
              <a href="#projects" style={{ background: "var(--red)", color: "#fff", padding: "0.75rem 1.75rem", fontSize: "0.85rem", fontWeight: 500, borderRadius: "2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red-light)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red)"; }}
              >View Projects</a>
              <a href="#contact" style={{ border: "1px solid var(--border-red)", color: "#fca5a5", padding: "0.75rem 1.75rem", fontSize: "0.85rem", fontWeight: 400, borderRadius: "2px", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red-dim)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >Get in Touch</a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              {[
                { href: personalInfo.github, icon: <GithubIcon size={16} /> },
                { href: personalInfo.linkedin, icon: <LinkedinIcon size={16} /> },
                { href: `mailto:${personalInfo.email}`, icon: <Mail size={16} /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-muted)", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--red-light)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-red)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >{s.icon}</a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hidden lg:flex"
            style={{ flexDirection: "column", alignItems: "center" }}
          >
            <div style={{ width: "340px", height: "400px", borderRadius: "4px", background: "var(--bg-card)", border: "1px solid var(--border)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(220,38,38,0.08) 0%, transparent 60%)" }} />
              <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "linear-gradient(135deg, var(--red) 0%, #7f1d1d 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", border: "3px solid rgba(220,38,38,0.3)", boxShadow: "0 0 40px var(--red-glow)", position: "relative", zIndex: 1 }}>FI</div>
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem" }}>{personalInfo.name}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{personalInfo.role}</p>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, var(--red), transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", width: "340px", marginTop: "1px", border: "1px solid var(--border)", borderRadius: "2px", overflow: "hidden" }}>
              {[{ val: "D-IV", label: "Degree" }, { val: "4+", label: "Projects" }, { val: "2", label: "Organizations" }].map((s) => (
                <div key={s.label} style={{ background: "var(--bg-card)", padding: "1rem", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "var(--red-light)" }}>{s.val}</p>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: "-3rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", color: "var(--text-muted)" }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
}
