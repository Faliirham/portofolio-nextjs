"use client";
import { useEffect, useRef, useState } from "react";

interface TrailDot {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

export default function CursorTrail() {
  const [dots, setDots] = useState<TrailDot[]>([]);
  const [isMobile, setIsMobile] = useState(true);
  const idCounter = useRef(Date.now());
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none)").matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 8) return;

      lastPos.current = { x: e.clientX, y: e.clientY };
      idCounter.current += 1;

      setDots((prev) => {
        const newDots = [
          ...prev,
          {
            x: e.clientX,
            y: e.clientY,
            id: idCounter.current,
            opacity: 1,
          },
        ];
        return newDots.slice(-20);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    if (dots.length === 0) return;

    const interval = setInterval(() => {
      setDots((prev) =>
        prev
          .map((d) => ({ ...d, opacity: d.opacity - 0.05 }))
          .filter((d) => d.opacity > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [dots.length]);

  if (isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          style={{
            position: "absolute",
            left: dot.x - 3,
            top: dot.y - 3,
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: `rgba(225, 29, 72, ${dot.opacity * 0.6})`,
            boxShadow: `0 0 ${8 * dot.opacity}px rgba(225, 29, 72, ${dot.opacity * 0.4})`,
            transition: "opacity 0.1s",
          }}
        />
      ))}
    </div>
  );
}
