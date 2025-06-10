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

export default function FloatingSpheresExercise() {
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
  }) => {
    const size = 96 * settings.objectSize; // 96px base size
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
          className="relative rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle at 30% 30%, ${color}ff, ${color}cc, ${color}88)`,
            boxShadow: `
              0 0 30px ${shadowColor}60,
              inset -10px -10px 20px rgba(0, 0, 0, 0.3),
              inset 10px 10px 20px rgba(255, 255, 255, 0.2),
              0 20px 40px rgba(0, 0, 0, 0.5)
            `,
            animation: "float 4s ease-in-out infinite",
          }}
        >
          {/* Highlight */}
          <div
            className="absolute rounded-full bg-gradient-to-br from-white to-transparent opacity-40"
            style={{
              width: `${size * 0.3}px`,
              height: `${size * 0.3}px`,
              top: `${size * 0.15}px`,
              left: `${size * 0.2}px`,
            }}
          />

          {/* Orbiting particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size * 0.08}px`,
                height: `${size * 0.08}px`,
                background: `radial-gradient(circle, ${shadowColor}, transparent)`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                animation: `orbit ${3 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
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
        color={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        shadowColor={getPureRedColor(settings.redIntensity)}
      />

      {/* Green Sphere */}
      <FloatingSphere
        color={getPureGreenColor(settings.greenIntensity)}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        shadowColor={getPureGreenColor(settings.greenIntensity)}
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
              <strong className="text-yellow-300">ESC</strong> Toggle
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
        className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
      >
        Home
      </Link>
    </div>
  );
}
