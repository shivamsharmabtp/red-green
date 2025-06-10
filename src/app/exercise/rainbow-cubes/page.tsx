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

export default function RainbowCubesExercise() {
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

  const RainbowCube = ({
    baseColor,
    offsetX,
    offsetY,
    rotation,
  }: {
    baseColor: string;
    offsetX: number;
    offsetY: number;
    rotation: string;
  }) => {
    const size = 100 * settings.objectSize; // 100px base size
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
          className="relative preserve-3d"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transformStyle: "preserve-3d",
            animation: `${rotation} 6s linear infinite`,
          }}
        >
          {/* Front face */}
          <div
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(45deg, ${baseColor}, #FFD700, ${baseColor})`,
              transform: `translateZ(${size / 2}px)`,
              boxShadow: `0 0 30px ${baseColor}80`,
            }}
          />

          {/* Back face */}
          <div
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(-45deg, ${baseColor}, #FF69B4, ${baseColor})`,
              transform: `rotateY(180deg) translateZ(${size / 2}px)`,
            }}
          />

          {/* Right face */}
          <div
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(90deg, ${baseColor}, #00BFFF, ${baseColor})`,
              transform: `rotateY(90deg) translateZ(${size / 2}px)`,
            }}
          />

          {/* Left face */}
          <div
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(-90deg, ${baseColor}, #32CD32, ${baseColor})`,
              transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
            }}
          />

          {/* Top face */}
          <div
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(0deg, ${baseColor}, #9370DB, ${baseColor})`,
              transform: `rotateX(90deg) translateZ(${size / 2}px)`,
            }}
          />

          {/* Bottom face */}
          <div
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(180deg, ${baseColor}, #FF4500, ${baseColor})`,
              transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        @keyframes rotateX {
          from {
            transform: rotateX(0deg) rotateY(0deg);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
        @keyframes rotateY {
          from {
            transform: rotateY(0deg) rotateX(0deg);
          }
          to {
            transform: rotateY(360deg) rotateX(360deg);
          }
        }
        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.8;
            filter: brightness(1) hue-rotate(0deg);
          }
          50% {
            opacity: 1;
            filter: brightness(1.3) hue-rotate(180deg);
          }
        }
      `}</style>

      {/* Red Rainbow Cube */}
      <RainbowCube
        baseColor={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        rotation="rotateX"
      />

      {/* Green Rainbow Cube */}
      <RainbowCube
        baseColor={getPureGreenColor(settings.greenIntensity)}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        rotation="rotateY"
      />

      {/* Floating geometric shapes background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: `linear-gradient(${Math.random() * 360}deg, 
                ${i % 2 === 0 ? getPureRedColor(0.3) : getPureGreenColor(0.3)}, 
                transparent)`,
              animation: `shimmer ${
                3 + Math.random() * 4
              }s ease-in-out infinite ${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

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
        className="absolute top-4 right-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 transition-all shadow-lg"
      >
        Home
      </Link>
    </div>
  );
}
