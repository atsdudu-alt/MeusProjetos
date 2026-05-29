import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Icosahedron, Stars, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (innerRef.current && outerRef.current) {
      innerRef.current.rotation.y -= delta * 0.1;
      innerRef.current.rotation.x += delta * 0.05;
      
      outerRef.current.rotation.y += delta * 0.15;
      outerRef.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Inner Solid Core */}
        <Icosahedron ref={innerRef} args={[1.8, 0]}>
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.1}
            metalness={0.9}
            emissive="#1e1b4b"
            emissiveIntensity={0.5}
          />
        </Icosahedron>

        {/* Outer Wireframe Shell */}
        <Icosahedron ref={outerRef} args={[2.2, 0]}>
          <meshBasicMaterial
            color="#4f46e5"
            wireframe={true}
            transparent
            opacity={0.3}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 5, 20]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, 0, -5]} intensity={5} color="#4f46e5" />
        <pointLight position={[5, -5, 5]} intensity={2} color="#38bdf8" />

        <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.15} color="#818cf8" />

        <FloatingGeometry />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3} 
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
      
      {/* Gradient overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/90 z-0 pointer-events-none" />
    </div>
  );
}
