"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function DiamondPrismsExercise() {
  const [horizontalSeparation, setHorizontalSeparation] = useState(0);
  const [verticalSeparation, setVerticalSeparation] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const MAX_HORIZONTAL_SEPARATION = 220;
  const MAX_VERTICAL_SEPARATION = 160;
  const STEP_SIZE = 5;

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

  const DiamondPrism = ({
    baseColor,
    offsetX,
    offsetY,
    rotation,
  }: {
    baseColor: string;
    offsetX: number;
    offsetY: number;
    rotation: string;
  }) => (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
      }}
    >
      <div
        className="relative w-32 h-32"
        style={{ animation: `${rotation} 6s linear infinite` }}
      >
        {/* Diamond shape using clip-path */}
        <div
          className="absolute w-32 h-32"
          style={{
            background: `conic-gradient(from 0deg, ${baseColor}ff, #FFD700, ${baseColor}cc, #FF69B4, ${baseColor}ff)`,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            boxShadow: `
              0 0 40px ${baseColor}80,
              inset 0 0 20px rgba(255, 255, 255, 0.3),
              0 0 80px ${baseColor}40
            `,
            filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))",
          }}
        />

        {/* Inner prismatic facets */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 top-8 left-8"
            style={{
              background: `linear-gradient(${
                i * 45
              }deg, transparent, rgba(255, 255, 255, 0.4), transparent)`,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              transform: `rotate(${i * 22.5}deg) scale(${0.3 + i * 0.08})`,
              animation: `shimmer 3s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}

        {/* Outer light rays */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute w-1 h-20 bg-gradient-to-t from-transparent via-white to-transparent opacity-60"
            style={{
              left: "50%",
              top: "-10px",
              transformOrigin: "bottom center",
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              animation: `rays 4s linear infinite ${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <style jsx>{`
        @keyframes rotateClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes rotateCounterClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.3;
            transform: rotate(var(--rotate)) scale(var(--scale));
          }
          50% {
            opacity: 0.8;
            transform: rotate(var(--rotate)) scale(calc(var(--scale) * 1.2));
          }
        }
        @keyframes rays {
          0%,
          100% {
            opacity: 0.2;
            transform: translateX(-50%) rotate(var(--rotate)) scaleY(1);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-50%) rotate(var(--rotate)) scaleY(1.5);
          }
        }
      `}</style>

      {/* Red Diamond Prism */}
      <DiamondPrism
        baseColor="#FF0066"
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        rotation="rotateClockwise"
      />

      {/* Green Diamond Prism */}
      <DiamondPrism
        baseColor="#00FF66"
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        rotation="rotateCounterClockwise"
      />

      {/* Prismatic light effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const colors = [
            "#FF0066",
            "#00FF66",
            "#6600FF",
            "#FF6600",
            "#0066FF",
          ];
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className="absolute w-2 h-8 opacity-70"
              style={{
                background: `linear-gradient(to bottom, ${color}, transparent)`,
                left: `${10 + i * 6}%`,
                top: `${Math.sin(i * 0.5) * 20 + 50}%`,
                transform: `rotate(${i * 15}deg)`,
                boxShadow: `0 0 15px ${color}`,
                animation: `prismLight 5s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes prismLight {
          0%,
          100% {
            opacity: 0.3;
            transform: rotate(var(--rotate)) translateY(0px);
          }
          50% {
            opacity: 0.9;
            transform: rotate(var(--rotate)) translateY(-30px);
          }
        }
      `}</style>

      {showInstructions && (
        <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-95 text-white p-4 rounded-xl max-w-sm backdrop-blur-sm border-2 border-yellow-500 shadow-lg shadow-yellow-500/20">
          <h3 className="text-lg font-bold mb-2 text-yellow-400">
            Diamond Prisms
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
        className="absolute top-4 right-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white px-4 py-2 rounded-xl hover:from-yellow-700 hover:via-orange-700 hover:to-red-700 transition-all shadow-lg"
      >
        Home
      </Link>
    </div>
  );
}
