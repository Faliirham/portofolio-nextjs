"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Config } from "@/lib/types";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ config }: { config: Config }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="container-custom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontWeight: 900,
                fontSize: "1.05rem",
                color: "#f5f5f5",
                letterSpacing: "0.05em",
              }}
            >
              {config.name.split(" ")[0].toUpperCase()}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontWeight: 700,
                fontSize: "0.6rem",
                color: "var(--red)",
                border: "1px solid var(--border-red)",
                padding: "0.1rem 0.35rem",
                borderRadius: "2px",
                letterSpacing: "0.08em",
              }}
            >
              {config.riderNumber}
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="hidden md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize: "0.72rem",
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: active === l.href ? "var(--text-primary)" : "var(--text-secondary)",
                  textDecoration: "none",
                  position: "relative",
                  transition: "color 0.2s",
                  textTransform: "uppercase",
                }}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "var(--red)",
                    }}
                  />
                )}
                {l.label}
              </a>
            ))}

            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                background: "var(--red)",
                color: "#fff",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "0.45rem 1rem",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "background 0.2s",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "var(--red-light)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--red)")}
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile burger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: "0.25rem",
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              background: "rgba(10,10,10,0.97)",
              borderBottom: "1px solid var(--border)",
              zIndex: 99,
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  fontFamily: 'var(--font-orbitron), sans-serif',
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                background: "var(--red)",
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "0.6rem 1.2rem",
                borderRadius: "2px",
                textDecoration: "none",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
