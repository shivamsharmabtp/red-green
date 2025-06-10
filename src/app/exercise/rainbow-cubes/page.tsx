"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function RainbowCubesExercise() {
  const [horizontalSeparation, setHorizontalSeparation] = useState(0);
  const [verticalSeparation, setVerticalSeparation] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const MAX_HORIZONTAL_SEPARATION = 280;
  const MAX_VERTICAL_SEPARATION = 200;
  const STEP_SIZE = 7;

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        setHorizontalSeparation((prev) =>
          Math.max(prev - STEP_SIZE, -MAX_HORIZONTAL_SEPARATION)
        );
        break;
      case "ArrowRight":
        setHorizontalSeparation((prev) =>
          Math.min(prev + STEP_SIZE, MAX_HORIZONTAL_SEPARATION)
        );
        break;
      case "ArrowUp":
        setVerticalSeparation((prev) =>
          Math.max(prev - STEP_SIZE, -MAX_VERTICAL_SEPARATION)
        );
        break;
      case "ArrowDown":
        setVerticalSeparation((prev) =>
          Math.min(prev + STEP_SIZE, MAX_VERTICAL_SEPARATION)
        );
        break;
      case "Escape":
        setShowInstructions((prev) => !prev);
        break;
    }
    event.preventDefault();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const RainbowCube = ({
    colors,
    offsetX,
    offsetY,
    rotation,
  }: {
    colors: string[];
    offsetX: number;
    offsetY: number;
    rotation: string;
  }) => (
    <div
      className="absolute preserve-3d"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) perspective(400px)`,
      }}
    >
      <div
        className="relative w-28 h-28 preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          animation: `${rotation} 8s linear infinite`,
        }}
      >
        {/* Front face */}
        <div
          className="absolute w-28 h-28 border-2 border-white border-opacity-30"
          style={{
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            transform: "translateZ(56px)",
            boxShadow: `0 0 30px ${colors[0]}80, inset 0 0 20px ${colors[1]}40`,
          }}
        />

        {/* Back face */}
        <div
          className="absolute w-28 h-28 border-2 border-white border-opacity-30"
          style={{
            background: `linear-gradient(135deg, ${colors[1]}, ${colors[2]})`,
            transform: "translateZ(-56px) rotateY(180deg)",
            boxShadow: `0 0 30px ${colors[1]}80, inset 0 0 20px ${colors[2]}40`,
          }}
        />

        {/* Right face */}
        <div
          className="absolute w-28 h-28 border-2 border-white border-opacity-30"
          style={{
            background: `linear-gradient(135deg, ${colors[2]}, ${colors[3]})`,
            transform: "rotateY(90deg) translateZ(56px)",
            boxShadow: `0 0 30px ${colors[2]}80, inset 0 0 20px ${colors[3]}40`,
          }}
        />

        {/* Left face */}
        <div
          className="absolute w-28 h-28 border-2 border-white border-opacity-30"
          style={{
            background: `linear-gradient(135deg, ${colors[3]}, ${colors[4]})`,
            transform: "rotateY(-90deg) translateZ(56px)",
            boxShadow: `0 0 30px ${colors[3]}80, inset 0 0 20px ${colors[4]}40`,
          }}
        />

        {/* Top face */}
        <div
          className="absolute w-28 h-28 border-2 border-white border-opacity-30"
          style={{
            background: `linear-gradient(135deg, ${colors[4]}, ${colors[5]})`,
            transform: "rotateX(90deg) translateZ(56px)",
            boxShadow: `0 0 30px ${colors[4]}80, inset 0 0 20px ${colors[5]}40`,
          }}
        />

        {/* Bottom face */}
        <div
          className="absolute w-28 h-28 border-2 border-white border-opacity-30"
          style={{
            background: `linear-gradient(135deg, ${colors[5]}, ${colors[0]})`,
            transform: "rotateX(-90deg) translateZ(56px)",
            boxShadow: `0 0 30px ${colors[5]}80, inset 0 0 20px ${colors[0]}40`,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        @keyframes rotateRed {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg);
          }
        }
        @keyframes rotateGreen {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(180deg) rotateY(360deg) rotateZ(270deg);
          }
        }
      `}</style>

      {/* Red Rainbow Cube */}
      <RainbowCube
        colors={[
          "#FF0080",
          "#FF4000",
          "#FF8000",
          "#FFB000",
          "#FF0040",
          "#FF6060",
        ]}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        rotation="rotateRed"
      />

      {/* Green Rainbow Cube */}
      <RainbowCube
        colors={[
          "#00FF80",
          "#40FF00",
          "#80FF00",
          "#B0FF00",
          "#00FF40",
          "#60FF60",
        ]}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        rotation="rotateGreen"
      />

      {/* Colorful particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => {
          const colors = [
            "#FF0080",
            "#00FF80",
            "#8000FF",
            "#FF8000",
            "#00FFFF",
          ];
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 10px ${color}`,
                animation: `float ${
                  3 + Math.random() * 4
                }s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>

      {showInstructions && (
        <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-95 text-white p-4 rounded-xl max-w-sm backdrop-blur-sm border-2 border-pink-500 shadow-lg shadow-pink-500/20">
          <h3 className="text-lg font-bold mb-2 text-pink-400">
            Rainbow Cubes
          </h3>
          <div className="text-sm space-y-1">
            <p>
              <strong className="text-red-400">← →</strong> Horizontal
              separation
            </p>
            <p>
              <strong className="text-green-400">↑ ↓</strong> Vertical
              separation
            </p>
            <p>
              <strong className="text-yellow-400">ESC</strong> Toggle
              instructions
            </p>
          </div>
          <div className="mt-3 text-xs text-gray-300">
            <p>
              H: {horizontalSeparation}px | V: {verticalSeparation}px
            </p>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="absolute top-4 right-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 transition-all shadow-lg"
      >
        Home
      </Link>
    </div>
  );
}
