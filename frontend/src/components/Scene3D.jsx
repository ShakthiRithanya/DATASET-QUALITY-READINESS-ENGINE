import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Center } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function DataParticles() {
  const ref = useRef();
  
  const stride = 3;
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * stride);
    for (let i = 0; i < count; i++) {
      pos[i * stride] = (Math.random() - 0.5) * 15;
      pos[i * stride + 1] = (Math.random() - 0.5) * 15;
      pos[i * stride + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    ref.current.rotation.y += 0.001;
    ref.current.rotation.x += 0.0005;
  });

  return (
    <Points ref={ref} positions={positions} stride={stride}>
      <PointMaterial
        transparent
        color="#a5f3fc"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function FloatingCube({ position, color, size }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t / 4) / 2;
    mesh.current.rotation.y = Math.sin(t / 2) / 2;
    mesh.current.position.y = position[1] + Math.sin(t / 2) / 2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} roughness={0.1} metalness={0.1} />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <DataParticles />
        <FloatingCube position={[-4, 2, -2]} color="#d1fae5" size={1} />
        <FloatingCube position={[4, -2, -5]} color="#f3e8ff" size={1.5} />
        <FloatingCube position={[2, 3, -3]} color="#e0f2fe" size={0.8} />
      </Canvas>
    </div>
  );
}
