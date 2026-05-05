"use client";
import { motion } from "framer-motion";
import React from "react";

// ── Button ──────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
  href?: string;
}

export function Button({ variant = "primary", children, href, className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer";
  const variants = {
    primary:
      "bg-red-600 text-white px-6 py-3 rounded-sm hover:bg-red-500 active:scale-95",
    outline:
      "border border-red-600/60 text-red-400 px-6 py-3 rounded-sm hover:bg-red-600/10 hover:border-red-500 active:scale-95",
    ghost:
      "text-neutral-400 px-4 py-2 hover:text-white active:scale-95",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

// ── Badge ───────────────────────────────────────────────────────────────────
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "var(--red-dim)",
        border: "1px solid var(--border-red)",
        color: "#fca5a5",
        fontSize: "0.72rem",
        fontWeight: 500,
        letterSpacing: "0.04em",
        padding: "0.25rem 0.6rem",
        borderRadius: "2px",
        display: "inline-block",
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
}

// ── SectionLabel ─────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <span
        style={{
          width: "1.5rem",
          height: "1px",
          background: "var(--red)",
          display: "block",
        }}
      />
      <span
        style={{
          color: "var(--red-light)",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ── AnimatedSection ─────────────────────────────────────────────────────────
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────
export function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        margin: "0",
      }}
    />
  );
}
