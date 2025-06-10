"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  getSettings,
  getPureRedColor,
  getPureGreenColor,
} from "../../lib/settings";

export default function TriangleExercise() {
  // Triangle positions and separations
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

  // Limits for separation
  const MAX_HORIZONTAL_SEPARATION = 200;
  const MAX_VERTICAL_SEPARATION = 150;
  const STEP_SIZE = 5;

  // Handle keyboard controls
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

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // Triangle SVG component
  const Triangle = ({
    color,
    offsetX,
    offsetY,
  }: {
    color: string;
    offsetX: number;
    offsetY: number;
  }) => {
    const size = 120 * settings.objectSize;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
        }}
      >
        <polygon points="60,10 20,90 100,90" fill={color} />
      </svg>
    );
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Red Triangle */}
      <Triangle
        color={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
      />

      {/* Green Triangle */}
      <Triangle
        color={getPureGreenColor(settings.greenIntensity)}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
      />

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-90 text-white p-4 rounded-lg max-w-sm">
          <h3 className="text-lg font-semibold mb-2">Triangle Exercise</h3>
          <div className="text-sm space-y-1">
            <p>
              <strong>← →</strong> Horizontal separation
            </p>
            <p>
              <strong>↑ ↓</strong> Vertical separation
            </p>
            <p>
              <strong>ESC</strong> Toggle instructions
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

      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-4 right-4 bg-gray-900 bg-opacity-90 text-white px-4 py-2 rounded-lg hover:bg-opacity-100 transition-opacity"
      >
        Home
      </Link>

      {/* Center crosshair (optional helper) */}
      <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-gray-600 opacity-50 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute w-8 h-px bg-gray-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-px h-8 bg-gray-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}
