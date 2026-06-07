import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00d4ff" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function GlowingOrbs() {
  const orbsRef = useRef<THREE.Group>(null);
  const orbPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 8; i++) {
      positions.push([(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6]);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.children.forEach((orb, i) => {
        orb.position.y += Math.sin(state.clock.elapsedTime + i) * 0.002;
      });
    }
  });

  return (
    <group ref={orbsRef}>
      {orbPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#7c3aed' : '#00d4ff'} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export function DataParticles() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ParticleField />
        <GlowingOrbs />
      </Canvas>
    </div>
  );
}
