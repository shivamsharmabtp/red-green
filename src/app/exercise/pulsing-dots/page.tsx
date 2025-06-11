"use client";

import { getPureRedColor, getPureGreenColor } from "../../lib/settings";
import { useExerciseControls } from "../../hooks/useExerciseControls";
import ExerciseLayout from "../../components/ExerciseLayout";

export default function PulsingDotsExercise() {
  const {
    horizontalSeparation,
    verticalSeparation,
    showInstructions,
    isFullscreen,
    settings,
  } = useExerciseControls({ stepSize: 4 });

  const PulsingDot = ({
    color,
    offsetX,
    offsetY,
    delay,
  }: {
    color: string;
    offsetX: number;
    offsetY: number;
    delay: number;
  }) => {
    const size = 96 * settings.objectSize; // 96px is the base size (w-24)
    return (
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
        }}
      >
        {/* Main pulsing dot */}
        <div
          className="rounded-full relative"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, ${color}, ${color}80)`,
            boxShadow: `
              0 0 20px ${color},
              0 0 40px ${color}80,
              0 0 60px ${color}40,
              inset 0 0 20px ${color}20
            `,
            animation: `pulse 2s ease-in-out infinite ${delay}s`,
          }}
        >
          {/* Inner glowing core */}
          <div
            className="absolute top-1/2 left-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${size / 3}px`,
              height: `${size / 3}px`,
              background: `radial-gradient(circle, ${color}ff, ${color}00)`,
              animation: `innerPulse 1.5s ease-in-out infinite ${delay + 0.5}s`,
            }}
          />

          {/* Ripple effect */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                borderColor: `${color}60`,
                width: `${size + i * 20}px`,
                height: `${size + i * 20}px`,
                animation: `ripple 3s linear infinite ${delay + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <ExerciseLayout
      showInstructions={showInstructions}
      instructionsConfig={{
        title: "Pulsing Dots",
        titleColor: "text-green-400",
        borderColor: "border-green-500",
      }}
      homeButtonConfig={{
        gradientFrom: "green-600",
        gradientTo: "blue-600",
      }}
      horizontalSeparation={horizontalSeparation}
      verticalSeparation={verticalSeparation}
      settings={settings}
      isFullscreen={isFullscreen}
    >
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
            filter: brightness(1);
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
            filter: brightness(1.5);
          }
        }
        @keyframes innerPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
        }
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Red Pulsing Dot */}
      <PulsingDot
        color={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        delay={0}
      />

      {/* Green Pulsing Dot */}
      <PulsingDot
        color={getPureGreenColor(settings.greenIntensity)}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        delay={1}
      />

      {/* Dynamic background grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, row) =>
          [...Array(12)].map((_, col) => (
            <div
              key={`${row}-${col}`}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${(col + 1) * 8.33}%`,
                top: `${(row + 1) * 12.5}%`,
                animation: `twinkle ${3 + Math.random() * 2}s linear infinite ${
                  Math.random() * 3
                }s`,
              }}
            />
          ))
        )}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          80%,
          100% {
            opacity: 0.1;
          }
          40% {
            opacity: 0.5;
          }
        }
      `}</style>
    </ExerciseLayout>
  );
}
