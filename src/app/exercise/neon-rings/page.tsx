"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  getSettings,
  getPureRedColor,
  getPureGreenColor,
  increaseSize,
  decreaseSize,
  cycleRedIntensity,
  cycleGreenIntensity,
} from "../../lib/settings";

export default function NeonRingsExercise() {
  const [horizontalSeparation, setHorizontalSeparation] = useState(0);
  const [verticalSeparation, setVerticalSeparation] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  // Settings
  const [settings, setSettings] = useState({
    objectSize: 1.0,
    redIntensity: 0.8,
    greenIntensity: 0.8,
  });

  // Load settings on component mount
  useEffect(() => {
    setSettings(getSettings());
  }, []);

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
      case "+":
      case "=":
        event.preventDefault();
        setSettings(increaseSize());
        break;
      case "-":
      case "_":
        event.preventDefault();
        setSettings(decreaseSize());
        break;
      case "r":
      case "R":
        event.preventDefault();
        setSettings(cycleRedIntensity());
        break;
      case "g":
      case "G":
        event.preventDefault();
        setSettings(cycleGreenIntensity());
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
  }) => {
    const size = 120 * settings.objectSize; // 120px base size
    return (
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
        }}
      >
        <div
          className="relative"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animation: `${direction} 8s linear infinite`,
          }}
        >
          {/* Main neon ring */}
          <div
            className="absolute rounded-full border-4"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderColor: color,
              boxShadow: `
                0 0 20px ${color},
                0 0 40px ${color},
                0 0 60px ${color},
                inset 0 0 20px ${color}
              `,
            }}
          />

          {/* Inner ring */}
          <div
            className="absolute rounded-full border-2"
            style={{
              width: `${size * 0.7}px`,
              height: `${size * 0.7}px`,
              top: `${size * 0.15}px`,
              left: `${size * 0.15}px`,
              borderColor: color,
              opacity: 0.7,
              boxShadow: `
                0 0 15px ${color},
                inset 0 0 15px ${color}
              `,
            }}
          />

          {/* Outer ring */}
          <div
            className="absolute rounded-full border-2"
            style={{
              width: `${size * 1.3}px`,
              height: `${size * 1.3}px`,
              top: `${-size * 0.15}px`,
              left: `${-size * 0.15}px`,
              borderColor: color,
              opacity: 0.5,
              boxShadow: `0 0 30px ${color}`,
            }}
          />

          {/* Rotating elements */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size * 0.1}px`,
                height: `${size * 0.1}px`,
                background: color,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                transformOrigin: `0 ${size * 0.35}px`,
                animation: `ringOrbit 3s linear infinite ${i * 0.125}s`,
                boxShadow: `0 0 10px ${color}`,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

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
        @keyframes ringOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes electricFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -20;
          }
        }
      `}</style>

      {/* Red Neon Ring */}
      <NeonRing
        color={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        direction="rotateClockwise"
      />

      {/* Green Neon Ring */}
      <NeonRing
        color={getPureGreenColor(settings.greenIntensity)}
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
              <stop
                offset="0%"
                stopColor={getPureRedColor(settings.redIntensity)}
                stopOpacity="0.8"
              />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop
                offset="100%"
                stopColor={getPureGreenColor(settings.greenIntensity)}
                stopOpacity="0.8"
              />
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
              <strong className="text-blue-400">+ -</strong> Increase/decrease
              size
            </p>
            <p>
              <strong className="text-red-400">R</strong> Cycle red intensity
            </p>
            <p>
              <strong className="text-green-400">G</strong> Cycle green
              intensity
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
            <p>
              Size: {settings.objectSize.toFixed(1)}x | Red:{" "}
              {Math.round(settings.redIntensity * 100)}% | Green:{" "}
              {Math.round(settings.greenIntensity * 100)}%
            </p>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-cyan-700 hover:to-purple-700 transition-all shadow-lg"
      >
        Home
      </Link>
    </div>
  );
}
