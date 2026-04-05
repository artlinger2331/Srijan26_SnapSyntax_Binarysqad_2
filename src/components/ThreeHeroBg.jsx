import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingPolyhedra() {
  const group = useRef(null);
  
  useFrame(({ clock }) => {
    if(!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.15;
    group.current.position.y = Math.sin(t * 0.5) * 0.3;
    
    group.current.children.forEach((child, i) => {
      child.rotation.x = t * (0.1 + i * 0.05);
      child.rotation.z = t * (0.15 + i * 0.02);
    });
  });

  return (
    <group ref={group}>
      <mesh position={[-3, 0, -2]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh position={[4, 1.5, -4]}>
        <octahedronGeometry args={[2, 0]} />
        <meshBasicMaterial color="#e0e0e0" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh position={[2, -2, 1]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function ThreeHeroBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ alpha: true }}>
        <FloatingPolyhedra />
      </Canvas>
    </div>
  );
}
