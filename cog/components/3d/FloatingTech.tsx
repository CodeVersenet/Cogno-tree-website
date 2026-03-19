import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, useCursor } from '@react-three/drei';
import * as THREE from 'three';

// A sophisticated "Digital Spiral" tree
export const HeroTree = (props: any) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    if (group.current) {
        const t = state.clock.elapsedTime;
        
        // Gentle idle rotation
        group.current.rotation.y = t * 0.1;
        
        // Interactive "Look At" feel based on mouse
        // We gently interpolate current rotation to target rotation for smooth feel
        const targetX = (state.pointer.y * viewport.height) * 0.05;
        const targetZ = (state.pointer.x * viewport.width) * 0.05;

        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -targetZ, 0.05);

        // Floating motion
        group.current.position.y = Math.sin(t * 0.5) * 0.1 - 0.5; 
    }
  });

  return (
    <group 
        ref={group} 
        {...props}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
    >
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        
        {/* CENTRAL CORE: Glassy Trunk */}
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.4, 3, 16]} />
            <MeshTransmissionMaterial 
                backside
                samples={8}
                thickness={0.8}
                chromaticAberration={0.5}
                anisotropy={0.5}
                distortion={0.2}
                color="#e0f2fe"
                resolution={1024}
                roughness={0.1}
            />
        </mesh>

        {/* DATA LEAVES: Spiraling Cubes */}
        <SpiralLeaves hovered={hovered} />

        {/* BASE: Digital Grid */}
        <group position={[0, -1.5, 0]}>
             <mesh rotation={[-Math.PI / 2, 0, 0]}>
                 <ringGeometry args={[0.5, 2, 32]} />
                 <meshBasicMaterial color="#38bdf8" transparent opacity={0.1} side={THREE.DoubleSide} />
             </mesh>
             <mesh rotation={[-Math.PI / 2, 0, 0]}>
                 <ringGeometry args={[0.5, 2.1, 32]} />
                 <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.1} />
             </mesh>
        </group>

      </Float>
    </group>
  );
};

const SpiralLeaves = ({ hovered }: { hovered: boolean }) => {
    // Create a spiral of data blocks
    const count = 40;
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    const blocks = useMemo(() => {
        const temp = [];
        for(let i=0; i<count; i++) {
            const t = i / count;
            // Golden angle approximation for organic spiral
            const angle = t * Math.PI * 12; 
            const radius = 0.2 + (t * 1.5); // Wider at top
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (t * 3) - 1.5; // Spread along height

            temp.push({ 
                pos: [x, y, z] as [number, number, number], 
                scale: 1 - (t * 0.5), // Smaller at top
                color: t > 0.8 ? "#06b6d4" : (t > 0.4 ? "#3b82f6" : "#6366f1") 
            });
        }
        return temp;
    }, []);

    return (
        <group>
            {blocks.map((block, i) => (
                <Float 
                    key={i} 
                    speed={1 + Math.random()} 
                    rotationIntensity={0.5} 
                    floatIntensity={0.5} 
                    position={block.pos}
                >
                    <mesh scale={block.scale * 0.25}>
                        <boxGeometry />
                        <meshStandardMaterial 
                            color={block.color}
                            emissive={block.color}
                            emissiveIntensity={hovered ? 0.8 : 0.4}
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </mesh>
                    {/* Thin connecting lines to core */}
                    <mesh position={[-block.pos[0]/2, 0, -block.pos[2]/2]} rotation={[0, Math.atan2(block.pos[2], block.pos[0]), Math.PI/2]} scale={[0.02, Math.sqrt(block.pos[0]**2 + block.pos[2]**2), 0.02]}>
                        <cylinderGeometry args={[1, 1, 1, 4]} />
                         <meshBasicMaterial color={block.color} transparent opacity={0.1} />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

// Keep existing components used in other sections
export const FloatingNodes = (props: any) => {
    const group = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    const nodes = [
        { pos: [-2, 1, 0], color: '#3b82f6' }, // Blue
        { pos: [2, 1.5, -1], color: '#a855f7' }, // Purple
        { pos: [0, -1.5, 1], color: '#10b981' }, // Green
    ];

    useFrame((state) => {
        if (group.current) {
            const rotationSpeed = hovered ? 0.02 : 0.005; 
            group.current.rotation.y += rotationSpeed;
            group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <group 
            ref={group} 
            {...props}
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
            onPointerOut={() => setHover(false)}
        >
            {nodes.map((node, i) => (
                <group key={i} position={new THREE.Vector3(...node.pos)}>
                    <mesh>
                        <icosahedronGeometry args={[0.4, 0]} />
                        <MeshTransmissionMaterial 
                            color={hovered ? "#0f172a" : node.color} 
                            resolution={512}
                            thickness={0.5}
                            roughness={0.1}
                            transmission={0.9}
                            backside
                        />
                    </mesh>
                    <mesh scale={1.2}>
                         <icosahedronGeometry args={[0.4, 0]} />
                         <meshBasicMaterial color={node.color} wireframe transparent opacity={0.5} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

export const ParticleField = () => {
    const count = 200;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = new THREE.Object3D();
    const particles = useRef(new Array(count).fill(0).map(() => ({
        position: [
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 15
        ],
        speed: Math.random() * 0.01,
        factor: Math.random() * 10 + 5,
        color: Math.random() > 0.5 ? "#bae6fd" : "#e9d5ff"
    })));

    useFrame((state) => {
        if (!mesh.current) return;
        
        particles.current.forEach((particle, i) => {
            let { position, speed, factor } = particle;
            const t = state.clock.elapsedTime;
            position[1] += Math.sin(t * speed + factor) * 0.005;
            
            dummy.position.set(position[0] as number, position[1] as number, position[2] as number);
            dummy.scale.setScalar(Math.max(0.02, Math.sin(t * speed + factor) * 0.05 + 0.02));
            dummy.rotation.x = t * speed;
            dummy.rotation.z = t * speed;
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
            mesh.current!.setColorAt(i, new THREE.Color(particle.color));
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.15, 0]} />
            <meshBasicMaterial transparent opacity={0.4} />
        </instancedMesh>
    );
};