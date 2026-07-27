"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 150 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const [geometry] = useState(() => new THREE.BufferGeometry());
  const velocitiesRef = useRef<Float32Array>(new Float32Array(count * 3));

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const velocities = velocitiesRef.current;

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      velocities[i * 3] = 0.01 + Math.random() * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [count, geometry]);

  useFrame(() => {
    if (!mesh.current) return;
    const attr = mesh.current.geometry.attributes.position;
    if (!attr) return;
    const positions = attr.array as Float32Array;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];

      if (positions[i * 3] > 10) {
        positions[i * 3] = -10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#e11d48"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  const [particleCount, setParticleCount] = useState(120);

  useEffect(() => {
    const updateCount = () => {
      setParticleCount(window.innerWidth < 768 ? 40 : 120);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
}
