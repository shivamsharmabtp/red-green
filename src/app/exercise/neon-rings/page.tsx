"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function NeonRingsExercise() {
  const [horizontalSeparation, setHorizontalSeparation] = useState(0);
  const [verticalSeparation, setVerticalSeparation] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const MAX_HORIZONTAL_SEPARATION = 500;
  const MAX_VERTICAL_SEPARATION = 500;
  const STEP_SIZE = 8;

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

  const NeonRing = ({
    color,
    offsetX,
    offsetY,
    direction,
  }: {
    color: string;
    offsetX: number;
    offsetY: number;
    direction: string;
  }) => (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
      }}
    >
      {/* Outer ring layers */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${120 + i * 20}px`,
            height: `${120 + i * 20}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            border: `${4 - i * 0.5}px solid ${color}`,
            boxShadow: `
              0 0 ${20 + i * 10}px ${color},
              inset 0 0 ${15 + i * 5}px ${color}80,
              0 0 ${40 + i * 20}px ${color}40
            `,
            opacity: 0.8 - i * 0.1,
            animation: `${direction} ${4 + i * 0.5}s linear infinite`,
          }}
        />
      ))}

      {/* Inner pulsing core */}
      <div
        className="absolute rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "60px",
          height: "60px",
          background: `radial-gradient(circle, ${color}ff, ${color}80, transparent)`,
          boxShadow: `
            0 0 30px ${color},
            0 0 60px ${color}60,
            inset 0 0 20px ${color}40
          `,
          animation: "corePulse 2s ease-in-out infinite",
        }}
      />

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: "8px",
            height: "8px",
            background: color,
            boxShadow: `0 0 15px ${color}`,
            left: "50%",
            top: "50%",
            transformOrigin: `0 ${80 + i * 15}px`,
            transform: "translate(-50%, -50%)",
            animation: `orbit ${3 + i * 0.2}s linear infinite ${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <style jsx>{`
        @keyframes rotateClockwise {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes rotateCounterClockwise {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
        @keyframes corePulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 1;
          }
        }
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg)
              translateY(-var(--radius)) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg)
              translateY(-var(--radius)) rotate(-360deg);
          }
        }
        @keyframes electricFlow {
          0% {
            stroke-dashoffset: 0;
            opacity: 0.8;
          }
          100% {
            stroke-dashoffset: -628;
            opacity: 0.4;
          }
        }
      `}</style>

      {/* Red Neon Ring */}
      <NeonRing
        color="#FF0099"
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        direction="rotateClockwise"
      />

      {/* Green Neon Ring */}
      <NeonRing
        color="#00FF99"
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        direction="rotateCounterClockwise"
      />

      {/* Electric connections between rings */}
      {horizontalSeparation !== 0 || verticalSeparation !== 0 ? (
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient
              id="electricGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF0099" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#00FF99" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <line
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${horizontalSeparation / 2}px)`}
            y2={`calc(50% + ${verticalSeparation / 2}px)`}
            stroke="url(#electricGradient)"
            strokeWidth="2"
            strokeDasharray="10 5"
            opacity="0.6"
            style={{ animation: "electricFlow 2s linear infinite" }}
          />
        </svg>
      ) : null}

      {/* Background neon grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(6)].map((_, row) =>
          [...Array(8)].map((_, col) => (
            <div
              key={`grid-${row}-${col}`}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${12.5 * (col + 1)}%`,
                top: `${16.67 * (row + 1)}%`,
                boxShadow: "0 0 4px #00FFFF",
                animation: `twinkle ${
                  2 + Math.random() * 3
                }s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))
        )}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>

      {showInstructions && (
        <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-95 text-white p-4 rounded-xl max-w-sm backdrop-blur-sm border-2 border-cyan-500 shadow-lg shadow-cyan-500/20">
          <h3 className="text-lg font-bold mb-2 text-cyan-400">Neon Rings</h3>
          <div className="text-sm space-y-1">
            <p>
              <strong className="text-pink-400">← →</strong> Horizontal
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
        className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 transition-all shadow-lg"
      >
        Home
      </Link>
    </div>
  );
}
