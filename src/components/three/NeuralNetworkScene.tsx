import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  position: [number, number, number];
  connections: number[];
  pulseOffset: number;
  color: string;
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo<NodeData[]>(() => {
    const nodeData: NodeData[] = [];
    const layers = [8, 12, 16, 12, 8];

    layers.forEach((count, layerIndex) => {
      for (let i = 0; i < count; i++) {
        const x = (layerIndex - 2) * 1.2;
        const y = ((i / (count - 1)) - 0.5) * 4;
        const z = (Math.random() - 0.5) * 1;

        const connections: number[] = [];
        if (layerIndex < layers.length - 1) {
          const nextLayerStart = layers.slice(0, layerIndex + 1).reduce((a, b) => a + b, 0);
          const nextLayerCount = layers[layerIndex + 1];
          for (let j = 0; j < Math.min(3, nextLayerCount); j++) {
            connections.push(nextLayerStart + Math.floor(Math.random() * nextLayerCount));
          }
        }

        nodeData.push({
          position: [x, y, z],
          connections,
          pulseOffset: Math.random() * Math.PI * 2,
          color: layerIndex === 0 ? '#00d4ff' : layerIndex === layers.length - 1 ? '#f59e0b' : '#7c3aed',
        });
      }
    });

    return nodeData;
  }, []);

  const edges = useMemo(() => {
    const edgeData: { start: [number, number, number]; end: [number, number, number] }[] = [];
    nodes.forEach((node) => {
      node.connections.forEach((targetIdx) => {
        if (nodes[targetIdx]) {
          edgeData.push({ start: node.position, end: nodes[targetIdx].position });
        }
      });
    });
    return edgeData;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Node key={i} node={node} />
      ))}
      {edges.map((edge, i) => (
        <EdgeLine key={i} edge={edge} />
      ))}
    </group>
  );
}

function Node({ node }: { node: NodeData }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + node.pulseOffset) * 0.5 + 0.5;
      meshRef.current.scale.setScalar(0.08 + pulse * 0.04);
    }
  });
  return (
    <mesh ref={meshRef} position={node.position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={node.color} transparent opacity={0.9} />
    </mesh>
  );
}

function EdgeLine({ edge }: { edge: { start: [number, number, number]; end: [number, number, number] } }) {
  const midPoint: [number, number, number] = [
    (edge.start[0] + edge.end[0]) / 2,
    (edge.start[1] + edge.end[1]) / 2 + 0.5,
    (edge.start[2] + edge.end[2]) / 2,
  ];

  const curve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...edge.start),
      new THREE.Vector3(...midPoint),
      new THREE.Vector3(...edge.end)
    );
  }, [edge, midPoint]);

  const points = curve.getPoints(20).map(p => [p.x, p.y, p.z] as [number, number, number]);

  return <Line points={points} color="#7c3aed" lineWidth={1} transparent opacity={0.3} />;
}

export function NeuralNetworkScene() {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
