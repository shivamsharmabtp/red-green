"use client";

import { getPureRedColor, getPureGreenColor } from "../../lib/settings";
import { useExerciseControls } from "../../hooks/useExerciseControls";
import ExerciseLayout from "../../components/ExerciseLayout";

export default function NeonRingsExercise() {
  const {
    horizontalSeparation,
    verticalSeparation,
    showInstructions,
    isFullscreen,
    settings,
  } = useExerciseControls({ stepSize: 7 });

  const NeonRing = ({
    color,
    offsetX,
    offsetY,
    rotationSpeed,
  }: {
    color: string;
    offsetX: number;
    offsetY: number;
    rotationSpeed: string;
  }) => {
    const size = 180 * settings.objectSize;

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
            animation: `${rotationSpeed} 15s linear infinite`,
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `6px solid ${color}`,
              boxShadow: `
                0 0 30px ${color},
                inset 0 0 30px ${color}40,
                0 0 60px ${color}80,
                0 0 100px ${color}60
              `,
              background: `radial-gradient(circle, transparent 60%, ${color}10 70%, transparent 80%)`,
            }}
          />

          {/* Middle ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${size * 0.7}px`,
              height: `${size * 0.7}px`,
              top: `${size * 0.15}px`,
              left: `${size * 0.15}px`,
              border: `4px solid ${color}`,
              boxShadow: `
                0 0 20px ${color},
                inset 0 0 20px ${color}60
              `,
              animation: `${
                rotationSpeed === "rotateClockwise"
                  ? "rotateCounterClockwise"
                  : "rotateClockwise"
              } 10s linear infinite`,
            }}
          />

          {/* Inner ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${size * 0.4}px`,
              height: `${size * 0.4}px`,
              top: `${size * 0.3}px`,
              left: `${size * 0.3}px`,
              border: `3px solid ${color}`,
              boxShadow: `
                0 0 15px ${color},
                inset 0 0 15px ${color}80
              `,
              animation: `${rotationSpeed} 5s linear infinite`,
            }}
          />

          {/* Energy pulses on rings */}
          {[...Array(3)].map((_, ringIndex) => {
            const ringSize = size * (1 - ringIndex * 0.3);
            const pulseSize = 8 + ringIndex * 2;
            return [...Array(6)].map((_, pulseIndex) => (
              <div
                key={`${ringIndex}-${pulseIndex}`}
                className="absolute rounded-full"
                style={{
                  width: `${pulseSize}px`,
                  height: `${pulseSize}px`,
                  background: `radial-gradient(circle, ${color}ff, ${color}00)`,
                  left: `${
                    50 +
                    Math.cos((pulseIndex * Math.PI) / 3) *
                      (ringSize / size) *
                      45
                  }%`,
                  top: `${
                    50 +
                    Math.sin((pulseIndex * Math.PI) / 3) *
                      (ringSize / size) *
                      45
                  }%`,
                  transform: "translate(-50%, -50%)",
                  animation: `energyPulse 2s ease-in-out infinite ${
                    pulseIndex * 0.3 + ringIndex * 0.5
                  }s`,
                }}
              />
            ));
          })}

          {/* Central core */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${size * 0.15}px`,
              height: `${size * 0.15}px`,
              top: `${size * 0.425}px`,
              left: `${size * 0.425}px`,
              background: `radial-gradient(circle, ${color}ff, ${color}80, ${color}40)`,
              boxShadow: `
                0 0 20px ${color},
                0 0 40px ${color}80
              `,
              animation: "corePulse 3s ease-in-out infinite",
            }}
          />

          {/* Electricity arcs */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`arc-${i}`}
              className="absolute"
              style={{
                width: "2px",
                height: `${size * 0.3}px`,
                background: `linear-gradient(to bottom, ${color}ff, transparent, ${color}80, transparent)`,
                left: "50%",
                top: "10%",
                transformOrigin: `50% ${size * 0.4}px`,
                transform: `translateX(-50%) rotate(${i * 45}deg)`,
                opacity: 0.6,
                animation: `electricArc 1s ease-in-out infinite ${i * 0.125}s`,
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
        title: "Neon Rings",
        titleColor: "text-pink-400",
        borderColor: "border-pink-500",
      }}
      homeButtonConfig={{
        gradientFrom: "pink-600",
        gradientTo: "purple-600",
        gradientVia: "rose-600",
      }}
      horizontalSeparation={horizontalSeparation}
      verticalSeparation={verticalSeparation}
      settings={settings}
      isFullscreen={isFullscreen}
    >
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
        @keyframes energyPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }
        @keyframes corePulse {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        @keyframes electricArc {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>

      {/* Red Neon Ring */}
      <NeonRing
        color={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        rotationSpeed="rotateClockwise"
      />

      {/* Green Neon Ring */}
      <NeonRing
        color={getPureGreenColor(settings.greenIntensity)}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        rotationSpeed="rotateCounterClockwise"
      />

      {/* Electric grid background */}
      <div className="absolute inset-0 opacity-10">
        {/* Horizontal lines */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              top: `${i * 10}%`,
              animation: `gridPulse ${
                3 + Math.random()
              }s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
        {/* Vertical lines */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-white to-transparent"
            style={{
              left: `${i * 10}%`,
              animation: `gridPulse ${
                3 + Math.random()
              }s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes gridPulse {
          0%,
          80%,
          100% {
            opacity: 0.1;
          }
          40% {
            opacity: 0.3;
          }
        }
      `}</style>
    </ExerciseLayout>
  );
}
