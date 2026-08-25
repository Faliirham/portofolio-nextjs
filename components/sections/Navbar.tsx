"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
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
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Lock body scroll while the mobile menu is open */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  /* Escape key closes the menu */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  /* Tap outside the panel closes it */
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-mobile-menu]")) closeMenu();
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen, closeMenu]);

  /* Reset when resizing up to desktop */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
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
          <a
            href="#hero"
            onClick={closeMenu}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", minWidth: 0 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontWeight: 900,
                fontSize: "clamp(0.9rem, 4vw, 1.05rem)",
                color: "#f5f5f5",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
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
                flexShrink: 0,
              }}
            >
              {config.riderNumber}
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ alignItems: "center", gap: "1.25rem" }} className="hidden lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link${active === l.href ? " is-active" : ""}`}
                style={{
                  fontSize: "0.74rem",
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  position: "relative",
                  textTransform: "uppercase",
                }}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      left: 0,
                      right: 0,
                      height: "6px",
                      background: "var(--yellow)",
                      boxShadow: "0 0 12px rgba(251, 191, 36, 0.4)",
                    }}
                  />
                )}
                {l.label}
              </a>
            ))}

            <a
              href="#contact"
              className="btn btn-primary btn-sm"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile burger */}
          <div style={{ alignItems: "center", gap: "0.5rem" }} className="flex lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: "0.75rem",
                margin: "-0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "44px",
                minHeight: "44px",
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            data-mobile-menu
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              maxHeight: "calc(100dvh - 64px)",
              overflowY: "auto",
              background: "rgba(10,10,10,0.98)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid var(--border)",
              zIndex: 99,
              padding: "1.25rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom))",
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={`nav-link${active === l.href ? " is-active" : ""}`}
                style={{
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0.8rem 0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {l.label}
                <span style={{ color: "var(--red)", fontSize: "0.7rem" }}>◆</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="btn btn-primary btn-block"
              style={{ marginTop: "1rem", minHeight: "44px" }}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
