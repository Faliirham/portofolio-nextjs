"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Node {
  position: [number, number, number];
  label: string;
  color: string;
}

const nodes: Node[] = [
  { position: [-2, 1.2, 0], label: "Backend", color: "#e11d48" },
  { position: [2, 1.2, 0], label: "Frontend", color: "#fbbf24" },
  { position: [-2, -1.2, 0], label: "AI & Data", color: "#a855f7" },
  { position: [2, -1.2, 0], label: "Database", color: "#22d3ee" },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [0, 3],
  [1, 2],
];

function NodeSphere({ node, index }: { node: Node; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = node.position[1] + Math.sin(t * 0.5 + index) * 0.08;
  });

  return (
    <group ref={ref} position={node.position}>
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <Text
        position={[0, -0.35, 0]}
        fontSize={0.15}
        color={node.color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {node.label.toUpperCase()}
      </Text>
    </group>
  );
}

function Edge({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.08 }))} />
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <NodeSphere key={node.label} node={node} index={i} />
      ))}
      {edges.map(([a, b], i) => (
        <Edge key={i} start={nodes[a].position} end={nodes[b].position} />
      ))}
    </group>
  );
}

export default function SkillGraph() {
  return (
    <div
      className="skill-graph-container"
      style={{
        width: "100%",
        height: "clamp(200px, 40vw, 300px)",
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <Scene />
      </Canvas>
    </div>
  );
}
