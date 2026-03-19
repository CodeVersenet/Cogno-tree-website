import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, ScrollControls, Scroll, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { HeroTree, FloatingNodes, ParticleField } from './FloatingTech';
import * as THREE from 'three';

const SceneContent = () => {
  const scroll = useScroll();
  const treeRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    // --- Animation Logic based on Scroll ---
    const scrollOffset = scroll.offset;

    // 1. Hero Tree (Visible at start, moves away)
    if (treeRef.current) {
        // Initial state
        if (scrollOffset < 0.25) {
             // Positioned on the right, slightly angled
             treeRef.current.position.set(3, -0.5, 0); 
             treeRef.current.rotation.y = -0.5 + (scrollOffset * 2); // Slight turn interaction
             treeRef.current.scale.setScalar(1 - scrollOffset * 2);
        } else {
             // Move away/hide
             treeRef.current.position.y = 10; 
        }
    }

    // 2. Nodes (Features -> Mission -> AI)
    if (nodesRef.current) {
        // Appears in section 2 
        if (scrollOffset > 0.15 && scrollOffset < 0.85) {
             const enterProgress = Math.min(1, (scrollOffset - 0.15) * 5);
             nodesRef.current.scale.setScalar(enterProgress);
             
             // Rotation continues
             nodesRef.current.rotation.y = scrollOffset * 4;

             // Position logic
             if (scrollOffset < 0.4) {
                 // Center for Features
                 nodesRef.current.position.set(0, 0, 0);
             } else if (scrollOffset < 0.6) {
                 // Move Right for Mission
                 nodesRef.current.position.set(3, 0, -1);
             } else {
                 // Move Left for AI
                 nodesRef.current.position.set(-3, 0, -1);
             }
        } else {
             nodesRef.current.scale.setScalar(0);
        }
    }
  });

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      {/* Softer Fog for infinite white look */}
      <fog attach="fog" args={['#ffffff', 5, 20]} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      
      {/* Premium Studio Lighting Setup */}
      {/* Main Key Light */}
      <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} color="#ffffff" />
      {/* Fill Light (Cool) */}
      <pointLight position={[-10, 0, -5]} intensity={0.8} color="#e0f2fe" />
      {/* Rim Light (Warm/Purple accent) */}
      <pointLight position={[5, -5, -5]} intensity={0.5} color="#c084fc" />
      {/* Ambient for base visibility */}
      <ambientLight intensity={1.2} />

      {/* Clean Studio Reflections */}
      <Environment preset="city" blur={1} />
      
      <group ref={treeRef} position={[3, -0.5, 0]}>
        <HeroTree />
      </group>

      <group ref={nodesRef} position={[0, 0, 0]} scale={0}>
        <FloatingNodes />
      </group>

      <ParticleField />
      
      {/* Soft Ground Shadow */}
      <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={20} blur={2.5} far={4} color="#64748b" />
    </>
  );
};

interface ExperienceProps {
  children: React.ReactNode;
}

const Experience: React.FC<ExperienceProps> = ({ children }) => {
  return (
    <ScrollControls pages={5} damping={0.2}>
      <SceneContent />
      <Scroll html style={{ width: '100%', height: '100%' }}>
        {children}
      </Scroll>
    </ScrollControls>
  );
};

export default Experience;