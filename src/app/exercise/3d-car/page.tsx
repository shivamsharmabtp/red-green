"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useExerciseControls } from "../../hooks/useExerciseControls";
import ExerciseLayout from "../../components/ExerciseLayout";

// Global rotation state to ensure both cars rotate identically
let globalRotationY = 0;
let globalRotationX = 0;

function Car3D({
  color,
  intensity,
  offsetX,
  offsetY,
  objectSize,
}: {
  color: string;
  intensity: number;
  offsetX: number;
  offsetY: number;
  objectSize: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Synchronized rotation for both cars using shared global state
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      globalRotationY = time * 0.3;
      globalRotationX = Math.sin(time * 0.5) * 0.1;

      groupRef.current.rotation.y = globalRotationY;
      groupRef.current.rotation.x = globalRotationX;
    }
  });

  const scale = objectSize;

  return (
    <group
      ref={groupRef}
      position={[offsetX / 50, -offsetY / 50, 0]}
      scale={scale}
    >
      {/* Car Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshPhongMaterial color={color} transparent opacity={intensity} />
      </mesh>

      {/* Car Roof */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.2, 0.6, 0.9]} />
        <meshPhongMaterial color={color} transparent opacity={intensity} />
      </mesh>

      {/* Front Wheels - Now same color as car */}
      <mesh position={[0.7, -0.6, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshPhongMaterial color={color} transparent opacity={intensity} />
      </mesh>
      <mesh position={[0.7, -0.6, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshPhongMaterial color={color} transparent opacity={intensity} />
      </mesh>

      {/* Back Wheels - Now same color as car */}
      <mesh position={[-0.7, -0.6, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshPhongMaterial color={color} transparent opacity={intensity} />
      </mesh>
      <mesh position={[-0.7, -0.6, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshPhongMaterial color={color} transparent opacity={intensity} />
      </mesh>

      {/* Headlights - Now same color as car */}
      <mesh position={[1.1, 0.1, 0.3]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2 * intensity}
          transparent
          opacity={intensity}
        />
      </mesh>
      <mesh position={[1.1, 0.1, -0.3]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2 * intensity}
          transparent
          opacity={intensity}
        />
      </mesh>

      {/* Windshield - Now same color as car but transparent */}
      <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, 0.1]}>
        <planeGeometry args={[1, 0.6]} />
        <meshPhongMaterial
          color={color}
          transparent
          opacity={0.3 * intensity}
        />
      </mesh>
    </group>
  );
}

export default function Car3DExercise() {
  const {
    horizontalSeparation,
    verticalSeparation,
    showInstructions,
    isFullscreen,
    settings,
  } = useExerciseControls({ stepSize: 4 });

  return (
    <ExerciseLayout
      showInstructions={showInstructions}
      instructionsConfig={{
        title: "3D Car Exercise",
        titleColor: "text-white",
        borderColor: "border-gray-500",
      }}
      homeButtonConfig={{
        gradientFrom: "gray-600",
        gradientTo: "gray-800",
      }}
      horizontalSeparation={horizontalSeparation}
      verticalSeparation={verticalSeparation}
      settings={settings}
      isFullscreen={isFullscreen}
    >
      <div className="absolute inset-0 bg-black">
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} />

          {/* Red Car */}
          <Car3D
            color="#ff0000"
            intensity={settings.redIntensity}
            offsetX={-horizontalSeparation / 2}
            offsetY={-verticalSeparation / 2}
            objectSize={settings.objectSize}
          />

          {/* Green Car */}
          <Car3D
            color="#00ff00"
            intensity={settings.greenIntensity}
            offsetX={horizontalSeparation / 2}
            offsetY={verticalSeparation / 2}
            objectSize={settings.objectSize}
          />
        </Canvas>
      </div>
    </ExerciseLayout>
  );
}
