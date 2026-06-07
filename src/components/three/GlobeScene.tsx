import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { cityCoordinates } from '../../data/mockData';

function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [-(radius * Math.sin(phi) * Math.cos(theta)), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)];
}

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    if (glowRef.current) glowRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group>
      <Sphere ref={globeRef} args={[1.5, 64, 64]}>
        <meshPhongMaterial color="#0a0a1a" transparent opacity={0.9} />
      </Sphere>
      <Sphere args={[1.52, 32, 32]}>
        <meshBasicMaterial color="#1a1a3a" transparent opacity={0.3} wireframe={true} />
      </Sphere>
      <Sphere ref={glowRef} args={[1.7, 32, 32]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
}

function CityMarkers() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
          child.scale.setScalar(scale * 0.08);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cityCoordinates.map((city, i) => (
        <mesh key={i} position={latLngToVector3(city.lat, city.lng, 1.55)}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={city.color} />
        </mesh>
      ))}
    </group>
  );
}

export function GlobeScene() {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7c3aed" />
        <Globe />
        <CityMarkers />
      </Canvas>
    </div>
  );
}
