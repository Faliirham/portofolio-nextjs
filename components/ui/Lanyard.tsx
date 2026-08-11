"use client";
import { useEffect, useRef } from "react";
import type { Config } from "@/lib/types";

const W = 300;
const H = 280;
const SEGMENTS = 13;
const SEG_LEN = 13;
const GRAVITY = 0.9;
const DAMPING = 0.942;
const PUSH_RADIUS = 82;
const PUSH_FORCE = 1.15;
const GRAB_RADIUS = 82;
const ANCHOR = { x: 0.58, y: 0.04 };

interface Pt {
  x: number;
  y: number;
  px: number;
  py: number;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawStrap(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  if (pts.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const xc = (pts[i].x + pts[i + 1].x) / 2;
    const yc = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);

  ctx.strokeStyle = "rgba(18,18,18,0.95)";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  ctx.strokeStyle = "rgba(225,29,72,0.9)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 7]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineCap = "butt";
}

function drawCard(ctx: CanvasRenderingContext2D, tail: Pt, second: Pt, cfg: Config) {
  const w = 46;
  const h = 68;
  const angle = Math.atan2(tail.y - second.y, tail.x - second.x) + Math.PI / 2;

  ctx.save();
  ctx.translate(tail.x, tail.y);
  ctx.rotate(angle);

  ctx.fillStyle = "#0a0a0a";
  ctx.beginPath();
  ctx.arc(0, -h / 2 + 12, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  const bx = -w / 2;
  const by = -h / 2 + 8;
  roundRect(ctx, bx, by, w, h - 8, 6);
  ctx.fillStyle = "#161616";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  roundRect(ctx, bx, by, w, 15, 6);
  ctx.fillStyle = "#e11d48";
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.font = "800 8px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(cfg.riderNumber.toUpperCase(), 0, by + 7.5);

  const initials = cfg.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  ctx.fillStyle = "#f5f5f5";
  ctx.font = "900 17px system-ui";
  ctx.fillText(initials, 0, by + 15 + 13);

  ctx.fillStyle = "rgba(245,245,245,0.75)";
  ctx.font = "600 7px system-ui";
  ctx.fillText(cfg.name.split(" ")[0].toUpperCase(), 0, by + 15 + 25);

  const cells = 8;
  const cellW = (w - 8) / cells;
  for (let i = 0; i < cells; i++) {
    ctx.fillStyle = Math.floor(i / 2) % 2 === 0 ? "#f5f5f5" : "#0a0a0a";
    ctx.fillRect(bx + 4 + i * cellW, by + (h - 8) - 7, cellW, 7);
  }

  ctx.restore();
}

export default function Lanyard({ config }: { config: Config }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const ax = ANCHOR.x * W;
    const ay = ANCHOR.y * H;

    const pts: Pt[] = [];
    for (let i = 0; i < SEGMENTS + 1; i++) {
      pts.push({ x: ax, y: ay + i * 2, px: ax, py: ay + i * 2 });
    }

    let raf = 0;
    let alpha = 0;
    let sway = 0;
    let grabbed = false;
    let pointer = { x: -9999, y: -9999, active: false };
    let lastTime = performance.now();

    const toLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      pointer = { x: p.x, y: p.y, active: true };
    };
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      pointer = { x: p.x, y: p.y, active: true };
      const card = pts[pts.length - 1];
      if (Math.hypot(card.x - p.x, card.y - p.y) < GRAB_RADIUS) grabbed = true;
    };
    const onUp = () => {
      grabbed = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - lastTime) / 16.7, 3);
      lastTime = now;
      sway += 0.03 * dt;

      pts[0].x = ax;
      pts[0].y = ay;

      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY * dt * dt;
      }

      if (grabbed) {
        const c = pts[pts.length - 1];
        c.x += (pointer.x - c.x) * 0.32;
        c.y += (pointer.y - c.y) * 0.32;
      } else if (pointer.active) {
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i];
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < PUSH_RADIUS && d > 0.001) {
            const f = PUSH_FORCE * (1 - d / PUSH_RADIUS);
            p.x += (dx / d) * f * dt;
            p.y += (dy / d) * f * dt;
          }
        }
      }

      for (let iter = 0; iter < 5; iter++) {
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const diff = (dist - SEG_LEN) / dist;
          const ox = dx * diff * 0.5;
          const oy = dy * diff * 0.5;
          if (i === 1) {
            b.x -= ox * 2;
            b.y -= oy * 2;
          } else {
            a.x += ox;
            a.y += oy;
            b.x -= ox;
            b.y -= oy;
          }
        }
      }

      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        if (p.x < 6) p.x = 6;
        if (p.x > W - 6) p.x = W - 6;
        if (p.y < 6) p.y = 6;
        if (p.y > H - 6) p.y = H - 6;
        p.x += Math.sin(sway + i * 0.55) * 0.07;
      }

      alpha += (1 - alpha) * 0.08;

      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 8;
      drawStrap(ctx, pts);

      ctx.shadowBlur = 0;
      ctx.fillStyle = "#333";
      ctx.fillRect(ax - 16, ay - 2, 32, 3);
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(ax, ay, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0a0a0a";
      ctx.beginPath();
      ctx.arc(ax, ay, 1.4, 0, Math.PI * 2);
      ctx.fill();

      drawCard(ctx, pts[pts.length - 1], pts[pts.length - 2], configRef.current);
      ctx.restore();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        width: W,
        height: H,
        display: "block",
        cursor: "grab",
      }}
    />
  );
}