"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function FloatingSpheresExercise() {
  const [horizontalSeparation, setHorizontalSeparation] = useState(0);
  const [verticalSeparation, setVerticalSeparation] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const MAX_HORIZONTAL_SEPARATION = 250;
  const MAX_VERTICAL_SEPARATION = 180;
  const STEP_SIZE = 6;

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        setHorizontalSeparation((prev) =>
          Math.max(prev - STEP_SIZE, -MAX_HORIZONTAL_SEPARATION)
        );
        break;
      case "ArrowRight":
        event.preventDefault();
        setHorizontalSeparation((prev) =>
          Math.min(prev + STEP_SIZE, MAX_HORIZONTAL_SEPARATION)
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setVerticalSeparation((prev) =>
          Math.max(prev - STEP_SIZE, -MAX_VERTICAL_SEPARATION)
        );
        break;
      case "ArrowDown":
        event.preventDefault();
        setVerticalSeparation((prev) =>
          Math.min(prev + STEP_SIZE, MAX_VERTICAL_SEPARATION)
        );
        break;
      case "Escape":
        event.preventDefault();
        setShowInstructions((prev) => !prev);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const FloatingSphere = ({
    color,
    offsetX,
    offsetY,
    shadowColor,
  }: {
    color: string;
    offsetX: number;
    offsetY: number;
    shadowColor: string;
  }) => (
    <div
      className="absolute animate-pulse"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
      }}
    >
      {/* Sphere with 3D gradient effect */}
      <div
        className="w-32 h-32 rounded-full animate-bounce"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}ff, ${color}cc 40%, ${color}66 70%, ${color}33)`,
          boxShadow: `
            0 8px 32px ${shadowColor}66,
            inset -8px -8px 16px ${shadowColor}33,
            inset 8px 8px 16px ${color}44,
            0 0 40px ${shadowColor}44
          `,
          animation: "float 3s ease-in-out infinite",
        }}
      />

      {/* Floating particles around sphere */}
      <div className="absolute -inset-16 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-60"
            style={{
              background: color,
              boxShadow: `0 0 8px ${color}`,
              left: `${Math.cos((i * Math.PI) / 3) * 60 + 50}%`,
              top: `${Math.sin((i * Math.PI) / 3) * 60 + 50}%`,
              animation: `orbit 4s linear infinite ${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }
      `}</style>

      {/* Red Sphere */}
      <FloatingSphere
        color="#FF0040"
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        shadowColor="#FF0040"
      />

      {/* Green Sphere */}
      <FloatingSphere
        color="#00FF80"
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        shadowColor="#00FF80"
      />

      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`bg-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s linear infinite ${
                Math.random() * 2
              }s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
      `}</style>

      {showInstructions && (
        <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-95 text-white p-4 rounded-xl max-w-sm backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-2 text-purple-300">
            Floating Spheres
          </h3>
          <div className="text-sm space-y-1">
            <p>
              <strong className="text-blue-300">← →</strong> Horizontal
              separation
            </p>
            <p>
              <strong className="text-green-300">↑ ↓</strong> Vertical
              separation
            </p>
            <p>
              <strong className="text-yellow-300">ESC</strong> Toggle
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
        className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
      >
        Home
      </Link>
    </div>
  );
}
