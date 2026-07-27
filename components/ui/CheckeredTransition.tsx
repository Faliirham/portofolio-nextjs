"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CheckeredTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const rows = 3;
  const cols = 20;

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "24px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const isBlack = (row + col) % 2 === 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.15,
                delay: col * 0.02,
              }}
              style={{
                background: isBlack ? "var(--text-primary)" : "transparent",
                opacity: isInView ? undefined : 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
