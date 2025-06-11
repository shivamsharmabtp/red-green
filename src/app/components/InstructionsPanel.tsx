"use client";

import type { ExerciseSettings } from "../lib/settings";

interface InstructionsPanelProps {
  title: string;
  titleColor: string;
  borderColor?: string;
  horizontalSeparation: number;
  verticalSeparation: number;
  settings: ExerciseSettings;
  isFullscreen: boolean;
  className?: string;
}

export default function InstructionsPanel({
  title,
  titleColor,
  borderColor,
  horizontalSeparation,
  verticalSeparation,
  settings,
  isFullscreen,
  className = "",
}: InstructionsPanelProps) {
  const baseClasses =
    "absolute top-4 left-4 bg-gray-900 bg-opacity-95 text-white p-4 rounded-xl max-w-sm backdrop-blur-sm";
  const borderClasses = borderColor
    ? `border-2 ${borderColor} shadow-lg ${borderColor.replace(
        "border-",
        "shadow-"
      )}/20`
    : "";

  return (
    <div className={`${baseClasses} ${borderClasses} ${className}`}>
      <h3 className={`text-lg font-bold mb-2 ${titleColor}`}>{title}</h3>
      <div className="text-sm space-y-1">
        <p>
          <strong className="text-red-400">← →</strong> Horizontal separation
        </p>
        <p>
          <strong className="text-green-400">↑ ↓</strong> Vertical separation
        </p>
        <p>
          <strong className="text-blue-400">+ -</strong> Increase/decrease size
        </p>
        <p>
          <strong className="text-red-400">R</strong> Cycle red intensity
        </p>
        <p>
          <strong className="text-green-400">G</strong> Cycle green intensity
        </p>
        <p>
          <strong className="text-purple-400">F</strong> Toggle fullscreen
        </p>
        <p>
          <strong className="text-yellow-400">ESC</strong> Toggle instructions
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
        {isFullscreen && <p className="text-yellow-300">🔳 Fullscreen Mode</p>}
      </div>
    </div>
  );
}
