import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface BarData {
  label: string;
  value: number;
  color: string;
}

function Bar({ data, position, maxValue, delay }: { data: BarData; position: [number, number, number]; maxValue: number; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const normalizedHeight = (data.value / maxValue) * 3;

  useFrame((state) => {
    if (meshRef.current) {
      const progress = Math.min(1, Math.max(0, (state.clock.elapsedTime - delay) * 2));
      const eased = 1 - Math.pow(1 - progress, 3);
      meshRef.current.scale.y = eased * normalizedHeight / 3;
      meshRef.current.position.y = position[1] + (eased * normalizedHeight) / 2;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 3, 0.6]} />
        <meshPhongMaterial color={data.color} transparent opacity={0.9} />
      </mesh>
      <Text position={[0, -0.3, 0]} fontSize={0.25} color="#94a3b8" anchorX="center" anchorY="top">
        {data.label}
      </Text>
    </group>
  );
}

function BarChart3DInner({ data }: { data: BarData[] }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 4]} />
        <meshBasicMaterial color="#1a1a2e" transparent opacity={0.5} />
      </mesh>
      {data.map((d, i) => (
        <Bar key={i} data={d} position={[i * 1.2 - (data.length * 0.6), 0, 0] as [number, number, number]} maxValue={maxValue} delay={i * 0.1} />
      ))}
    </group>
  );
}

interface BarChart3DProps {
  data: BarData[];
  className?: string;
}

export function BarChart3D({ data, className }: BarChart3DProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`w-full h-[350px] rounded-xl overflow-hidden ${className || ''}`}>
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }} shadows>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} castShadow />
        <pointLight position={[-10, 5, -10]} intensity={0.3} color="#7c3aed" />
        <BarChart3DInner data={data} />
      </Canvas>
    </motion.div>
  );
}
