"use client";
import { useEffect, useMemo, useRef, useState, createRef, type RefObject, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  CapsuleCollider,
  CuboidCollider,
  useSphericalJoint,
  useRevoluteJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import type { Config } from "@/lib/types";

const LINKS_DESKTOP = 8;
const LINKS_MOBILE = 6;
const SPACING = 0.17;
const CAPSULE_R = 0.032;
const CAPSULE_HALF = 0.06;
const ANCHOR_Y = 1.25;
const CARD_W = 0.75;
const CARD_H = 1.125;
const CARD_D = 0.035;
const CARD_JOINT_OFFSET = CARD_H / 2 - 0.03;
const TEXTURE_SCALE = 1100 / 64;
const GRAVITY: [number, number, number] = [0, -9.81, 0];

function getBodyTranslation(body: RapierRigidBody | null | undefined): THREE.Vector3 | null {
  if (!body) return null;
  try {
    const t = body.translation();
    return new THREE.Vector3(t.x, t.y, t.z);
  } catch {
    return null;
  }
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

function drawIdCard(ctx: CanvasRenderingContext2D, cfg: Config, photo: HTMLImageElement | null) {
  const w = 64;
  const h = 96;

  ctx.fillStyle = "#0a0a0a";
  ctx.beginPath();
  ctx.arc(0, -h / 2 + 12, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  const bx = -w / 2;
  const by = -h / 2 + 8;
  roundRect(ctx, bx, by, w, h - 8, 6);
  ctx.fillStyle = "#161616";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.32)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  roundRect(ctx, bx, by, w, 17, 6);
  ctx.fillStyle = "#e11d48";
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.font = "800 9px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(cfg.riderNumber.toUpperCase(), bx + 24, by + 8.5);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "700 6px system-ui";
  ctx.fillText("PIT CREW", bx + w - 28, by + 8.5);

  const photoY = by + 24;
  const photoH = h - 8 - 24 - 30;
  if (photo && photo.width > 0) {
    ctx.save();
    roundRect(ctx, bx + 7, photoY, w - 14, photoH, 4);
    ctx.clip();
    const s = Math.max((w - 14) / photo.width, photoH / photo.height);
    const pw = photo.width * s;
    const ph = photo.height * s;
    ctx.drawImage(photo, bx + 7 + (w - 14 - pw) / 2, photoY + (photoH - ph) / 2, pw, ph);
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    roundRect(ctx, bx + 7, photoY, w - 14, photoH, 4);
    ctx.stroke();
  } else {
    const initials = cfg.name
      .split(" ")
      .map((s) => s[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    ctx.fillStyle = "#2a2a2a";
    roundRect(ctx, bx + 7, photoY, w - 14, photoH, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(245,245,245,0.4)";
    ctx.font = "900 22px system-ui";
    ctx.fillText(initials, 0, photoY + photoH / 2 + 7);
  }

  ctx.fillStyle = "#f5f5f5";
  ctx.font = "800 10px system-ui";
  ctx.fillText(cfg.name.toUpperCase(), 0, photoY + photoH + 13);

  ctx.fillStyle = "rgba(245,245,245,0.7)";
  ctx.font = "600 6.5px system-ui";
  ctx.fillText(cfg.role.toUpperCase(), 0, photoY + photoH + 22);

  const cells = 10;
  const cellW = (w - 8) / cells;
  for (let i = 0; i < cells; i++) {
    ctx.fillStyle = Math.floor(i / 2) % 2 === 0 ? "#f5f5f5" : "#0a0a0a";
    ctx.fillRect(bx + 4 + i * cellW, by + (h - 8) - 7, cellW, 7);
  }
}

function useCardTexture(config: Config) {
  const [texture] = useState(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1100;
    canvas.height = Math.round(96 * TEXTURE_SCALE);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.scale(TEXTURE_SCALE, TEXTURE_SCALE);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    drawIdCard(ctx, config, null);
    return { tex, ctx, canvas };
  });

  useEffect(() => {
    if (!texture) return;
    const { tex, ctx } = texture;
    if (!config.avatar) return;
    const img = new Image();
    img.src = config.avatar;
    img.decoding = "async";
    let disposed = false;
    img.onload = () => {
      if (disposed) return;
      ctx.clearRect(0, 0, 64, 96);
      drawIdCard(ctx, config, img);
      tex.needsUpdate = true;
    };
    return () => {
      disposed = true;
    };
  }, [config, texture]);

  useEffect(
    () => () => {
      texture?.tex.dispose();
    },
    [texture]
  );

  return texture?.tex ?? null;
}

function AnchorClip({ anchorRef }: { anchorRef: RefObject<RapierRigidBody | null> }) {
  return (
    <>
      <RigidBody ref={anchorRef} type="fixed" colliders={false} position={[0, ANCHOR_Y, 0]} />
      <group position={[0, ANCHOR_Y, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.34, 0.045, 0.05]} />
          <meshStandardMaterial color="#222222" metalness={0.45} roughness={0.5} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.05, 0.012, 12, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </>
  );
}

function ChainLink({
  position,
  bodyRef,
}: {
  position: [number, number, number];
  bodyRef: RefObject<RapierRigidBody | null>;
}) {
  return (
    <RigidBody
      ref={bodyRef}
      position={position}
      colliders={false}
      mass={0.14}
      linearDamping={1.1}
      angularDamping={2}
      canSleep={false}
    >
      <CapsuleCollider args={[CAPSULE_HALF, CAPSULE_R]} />
      <mesh>
        <capsuleGeometry args={[CAPSULE_R, CAPSULE_HALF * 2, 8, 16]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.5} roughness={0.35} />
      </mesh>
    </RigidBody>
  );
}

function Card({
  config,
  count,
  cardRef,
  draggingRef,
  pointerScreenRef,
}: {
  config: Config;
  count: number;
  cardRef: RefObject<RapierRigidBody | null>;
  draggingRef: MutableRefObject<boolean>;
  pointerScreenRef: MutableRefObject<{ x: number; y: number }>;
}) {
  const texture = useCardTexture(config);

  return (
    <RigidBody
      ref={cardRef}
      colliders={false}
      mass={0.4}
      linearDamping={1.4}
      angularDamping={2.2}
      canSleep={false}
      position={[0, ANCHOR_Y - count * SPACING - (CAPSULE_HALF + SPACING / 2) - CARD_JOINT_OFFSET, 0]}
    >
      <CuboidCollider args={[CARD_W / 2, CARD_H / 2, CARD_D / 2]} />
      <mesh
        onPointerDown={(e) => {
          e.stopPropagation();
          draggingRef.current = true;
          pointerScreenRef.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
        }}
      >
        <boxGeometry args={[CARD_W, CARD_H, CARD_D]} />
        <meshStandardMaterial
          map={texture ?? undefined}
          roughness={0.35}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </RigidBody>
  );
}

function SphericalLink({ a, b }: { a: RefObject<RapierRigidBody | null>; b: RefObject<RapierRigidBody | null> }) {
  useSphericalJoint(a as RefObject<RapierRigidBody>, b as RefObject<RapierRigidBody>, [
    [0, -(CAPSULE_HALF + SPACING / 2), 0],
    [0, CAPSULE_HALF + SPACING / 2, 0],
  ]);
  return null;
}

function CardJoint({
  lastLinkRef,
  cardRef,
}: {
  lastLinkRef: RefObject<RapierRigidBody | null>;
  cardRef: RefObject<RapierRigidBody | null>;
}) {
useRevoluteJoint(lastLinkRef as RefObject<RapierRigidBody>, cardRef as RefObject<RapierRigidBody>, [
    [0, -(CAPSULE_HALF + SPACING / 2), 0],
    [0, CARD_JOINT_OFFSET, 0],
    [0, 0, 1],
    [-1, 1],
  ]);
  return null;
}

function ChainJoints({
  anchorRef,
  refs,
  cardRef,
  count,
}: {
  anchorRef: RefObject<RapierRigidBody | null>;
  refs: Array<RefObject<RapierRigidBody | null>>;
  cardRef: RefObject<RapierRigidBody | null>;
  count: number;
}) {
useSphericalJoint(anchorRef as RefObject<RapierRigidBody>, refs[0] as RefObject<RapierRigidBody>, [
    [0, 0, 0],
    [0, CAPSULE_HALF + SPACING / 2, 0],
  ]);
  return (
    <>
      {Array.from({ length: count - 1 }).map((_, i) => (
        <SphericalLink key={i} a={refs[i]} b={refs[i + 1]} />
      ))}
      <CardJoint lastLinkRef={refs[count - 1]} cardRef={cardRef} />
    </>
  );
}

function Strap({
  refs,
  cardRef,
  count,
}: {
  refs: Array<RefObject<RapierRigidBody | null>>;
  cardRef: RefObject<RapierRigidBody | null>;
  count: number;
}) {
  const { size } = useThree();
const geometry = useMemo(() => new MeshLineGeometry(), []);
  const materials = useMemo(() => {
    const list = [
      new MeshLineMaterial({
        resolution: new THREE.Vector2(size.width, size.height),
        sizeAttenuation: 1,
        lineWidth: 0.055,
        color: "#161616",
        opacity: 0.95,
      }),
      new MeshLineMaterial({
        resolution: new THREE.Vector2(size.width, size.height),
        sizeAttenuation: 1,
        lineWidth: 0.026,
        color: "#e11d48",
        opacity: 0.9,
      }),
      new MeshLineMaterial({
        resolution: new THREE.Vector2(size.width, size.height),
        sizeAttenuation: 1,
        lineWidth: 0.012,
        color: "#ffffff",
        opacity: 0.35,
      }),
    ];
    list.forEach((m) => {
      m.transparent = true;
      m.depthWrite = false;
    });
    return list;
  }, [size.width, size.height]);
  const anchorPos = useMemo(() => new THREE.Vector3(0, ANCHOR_Y, 0), []);

useFrame(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const p = getBodyTranslation(refs[i]?.current);
      if (p) {
        points.push(p);
      } else {
        points.push(anchorPos.clone());
      }
    }
    const card = cardRef.current;
    if (card) {
      let t: { x: number; y: number; z: number } | null = null;
      let q: { x: number; y: number; z: number; w: number } | null = null;
      try {
        t = card.translation();
        q = card.rotation();
      } catch {
        return;
      }
      const off = new THREE.Vector3(0, CARD_JOINT_OFFSET, 0).applyQuaternion(q);
      points.push(new THREE.Vector3(t.x + off.x, t.y + off.y, t.z + off.z));
    }
    geometry.setPoints(points);
  });

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => materials.forEach((m) => m.dispose()), [materials]);

  return (
    <>
      {materials.map((m, i) => (
        <mesh key={i} geometry={geometry} material={m} />
      ))}
    </>
  );
}

function DragController({
  refs,
  cardRef,
  draggingRef,
  pointerScreenRef,
  pointerActiveRef,
}: {
  refs: Array<RefObject<RapierRigidBody | null>>;
  cardRef: RefObject<RapierRigidBody | null>;
  draggingRef: MutableRefObject<boolean>;
  pointerScreenRef: MutableRefObject<{ x: number; y: number }>;
  pointerActiveRef: MutableRefObject<boolean>;
}) {
  const { camera, gl } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const hit = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      pointerScreenRef.current = { x: e.clientX, y: e.clientY };
      pointerActiveRef.current = true;
    };
    const onLeave = () => {
      pointerActiveRef.current = false;
      draggingRef.current = false;
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl, pointerScreenRef, pointerActiveRef, draggingRef]);

useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    try {
      refs.forEach((r, i) => {
        const body = r?.current;
        if (!body) return;
        body.applyImpulse(
          { x: Math.sin(t * 1.2 + i * 0.6) * 0.003, y: 0, z: Math.cos(t * 0.9 + i * 0.4) * 0.003 },
          true
        );
      });
    } catch {
      return;
    }

    if (!pointerActiveRef.current) return;
    const rect = gl.domElement.getBoundingClientRect();
    const p = pointerScreenRef.current;
    if (p.x < rect.left || p.x > rect.right || p.y < rect.top || p.y > rect.bottom) return;

    ndc.set(((p.x - rect.left) / rect.width) * 2 - 1, -((p.y - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    if (!raycaster.ray.intersectPlane(plane, hit)) return;

    if (draggingRef.current) {
      const card = cardRef.current;
      if (!card) return;
      let pos: { x: number; y: number; z: number } | null = null;
      let v: { x: number; y: number; z: number } | null = null;
      let mass = 0;
      try {
        pos = card.translation();
        v = card.linvel();
        mass = card.mass();
      } catch {
        return;
      }
      const dx = hit.x - pos.x;
      const dy = hit.y - pos.y;
      const d = Math.hypot(dx, dy);
      if (d > 0.02) {
        const k = Math.min(40 * dt, 0.9) * mass;
        try {
          card.applyImpulse({ x: dx * k, y: dy * k, z: 0 }, true);
          card.applyImpulse({ x: -v.x * mass * 0.15, y: -v.y * mass * 0.15, z: -v.z * mass * 0.15 }, true);
        } catch {
          return;
        }
      }
    } else {
      refs.forEach((r) => {
        const body = r?.current;
        if (!body) return;
        let pos: { x: number; y: number; z: number } | null = null;
        try {
          pos = body.translation();
        } catch {
          return;
        }
        const dx = pos.x - hit.x;
        const dy = pos.y - hit.y;
        const d = Math.hypot(dx, dy);
        if (d < 0.32 && d > 0.001) {
          const f = (0.32 - d) * 0.02;
          try {
            body.applyImpulse({ x: (dx / d) * f, y: (dy / d) * f, z: 0 }, true);
          } catch {
            return;
          }
        }
      });
    }
  });

  return null;
}

function StaticLanyard({ config, count }: { config: Config; count: number }) {
  const { size } = useThree();
  const texture = useCardTexture(config);
const geometry = useMemo(() => new MeshLineGeometry(), []);
  const materials = useMemo(() => {
    const list = [
      new MeshLineMaterial({
        resolution: new THREE.Vector2(size.width, size.height),
        sizeAttenuation: 1,
        lineWidth: 0.055,
        color: "#161616",
        opacity: 0.95,
      }),
      new MeshLineMaterial({
        resolution: new THREE.Vector2(size.width, size.height),
        sizeAttenuation: 1,
        lineWidth: 0.026,
        color: "#e11d48",
        opacity: 0.9,
      }),
    ];
    list.forEach((m) => {
      m.transparent = true;
      m.depthWrite = false;
    });
    return list;
  }, [size.width, size.height]);

  const cardY =
    ANCHOR_Y - count * SPACING - (CAPSULE_HALF + SPACING / 2) - CARD_JOINT_OFFSET;

  useEffect(() => {
    const points: THREE.Vector3[] = [];
    points.push(new THREE.Vector3(0, ANCHOR_Y, 0));
    for (let i = 0; i < count; i++) {
      points.push(new THREE.Vector3(0, ANCHOR_Y - (i + 1) * SPACING, 0));
    }
    points.push(new THREE.Vector3(0, cardY + CARD_JOINT_OFFSET, 0));
    geometry.setPoints(points);
    return () => {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    };
  }, [geometry, materials, count, cardY]);

  return (
    <>
      {materials.map((m, i) => (
        <mesh key={i} geometry={geometry} material={m} />
      ))}
      <group position={[0, ANCHOR_Y, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.34, 0.045, 0.05]} />
          <meshStandardMaterial color="#222222" metalness={0.45} roughness={0.5} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.05, 0.012, 12, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
      <group position={[0, cardY, 0]}>
        <mesh>
          <boxGeometry args={[CARD_W, CARD_H, CARD_D]} />
          <meshStandardMaterial map={texture ?? undefined} roughness={0.35} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
}

export default function Lanyard({ config }: { config: Config }) {
  const [isMobile] = useState(() => window.innerWidth < 768);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const count = isMobile ? LINKS_MOBILE : LINKS_DESKTOP;
  const [linkRefs] = useState(() =>
    Array.from({ length: LINKS_DESKTOP }, () => createRef<RapierRigidBody | null>())
  );
  const anchorRef = useRef<RapierRigidBody | null>(null);
  const cardRef = useRef<RapierRigidBody | null>(null);
  const draggingRef = useRef(false);
  const pointerScreenRef = useRef({ x: 0, y: 0 });
  const pointerActiveRef = useRef(false);

  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.2, 3.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ touchAction: "none", cursor: "grab", display: "block", width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 3, 4]} intensity={1.1} />
      <pointLight position={[-2, -1, 2]} intensity={1.6} color="#e11d48" />
      {reduced ? (
        <StaticLanyard config={config} count={count} />
      ) : (
        <Physics gravity={GRAVITY}>
          <AnchorClip anchorRef={anchorRef} />
          {Array.from({ length: count }).map((_, i) => (
            <ChainLink
              key={i}
              position={[0, ANCHOR_Y - i * SPACING - (CAPSULE_HALF + SPACING / 2), 0]}
              bodyRef={linkRefs[i]}
            />
          ))}
          <Card
            config={config}
            count={count}
            cardRef={cardRef}
            draggingRef={draggingRef}
            pointerScreenRef={pointerScreenRef}
          />
          <ChainJoints anchorRef={anchorRef} refs={linkRefs} cardRef={cardRef} count={count} />
          <Strap refs={linkRefs} cardRef={cardRef} count={count} />
          <DragController
            refs={linkRefs}
            cardRef={cardRef}
            draggingRef={draggingRef}
            pointerScreenRef={pointerScreenRef}
            pointerActiveRef={pointerActiveRef}
          />
        </Physics>
      )}
    </Canvas>
  );
}



