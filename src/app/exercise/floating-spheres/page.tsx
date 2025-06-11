"use client";

import { getPureRedColor, getPureGreenColor } from "../../lib/settings";
import { useExerciseControls } from "../../hooks/useExerciseControls";
import ExerciseLayout from "../../components/ExerciseLayout";

export default function FloatingSpheresExercise() {
  const {
    horizontalSeparation,
    verticalSeparation,
    showInstructions,
    isFullscreen,
    settings,
  } = useExerciseControls({ stepSize: 6 });

  const FloatingSphere = ({
    color,
    offsetX,
    offsetY,
    floatDirection,
  }: {
    color: string;
    offsetX: number;
    offsetY: number;
    floatDirection: "up" | "down";
  }) => {
    const size = 144 * settings.objectSize;

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
            animation: `float${floatDirection} 5s ease-in-out infinite`,
          }}
        >
          {/* Main sphere with 3D gradient */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color}ff, ${color}cc 40%, ${color}88 70%, ${color}44)`,
              boxShadow: `
                0 0 40px ${color}80,
                inset -20px -20px 40px ${color}40,
                inset 20px 20px 40px rgba(255, 255, 255, 0.2),
                0 0 100px ${color}30
              `,
            }}
          />

          {/* Highlight for 3D effect */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${size * 0.3}px`,
              height: `${size * 0.3}px`,
              top: `${size * 0.2}px`,
              left: `${size * 0.25}px`,
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent 70%)",
              animation: "highlight 3s ease-in-out infinite",
            }}
          />

          {/* Orbital rings */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`ring-${i}`}
              className="absolute border-2 rounded-full opacity-40"
              style={{
                width: `${size + i * 30}px`,
                height: `${size + i * 30}px`,
                top: `${-i * 15}px`,
                left: `${-i * 15}px`,
                borderColor: color,
                transform: "rotateX(70deg)",
                animation: `orbit 8s linear infinite ${i * 2}s`,
              }}
            />
          ))}

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: color,
                left: `${50 + Math.cos((i * Math.PI) / 6) * 120}%`,
                top: `${50 + Math.sin((i * Math.PI) / 6) * 120}%`,
                transform: "translate(-50%, -50%)",
                opacity: 0.6,
                animation: `particleOrbit 6s linear infinite ${i * 0.5}s`,
              }}
            />
          ))}

          {/* Energy waves */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`wave-${i}`}
              className="absolute inset-0 rounded-full border opacity-30"
              style={{
                borderColor: color,
                animation: `energyWave 4s ease-out infinite ${i * 1}s`,
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
        title: "Floating Spheres",
        titleColor: "text-cyan-400",
        borderColor: "border-cyan-500",
      }}
      homeButtonConfig={{
        gradientFrom: "cyan-600",
        gradientTo: "blue-700",
        gradientVia: "teal-600",
      }}
      horizontalSeparation={horizontalSeparation}
      verticalSeparation={verticalSeparation}
      settings={settings}
      isFullscreen={isFullscreen}
    >
      <style jsx>{`
        @keyframes floatup {
          0%,
          100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-30px) rotateX(15deg);
          }
        }
        @keyframes floatdown {
          0%,
          100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(30px) rotateX(-15deg);
          }
        }
        @keyframes highlight {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes orbit {
          from {
            transform: rotateX(70deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(70deg) rotateZ(360deg);
          }
        }
        @keyframes particleOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(100px)
              rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(100px)
              rotate(-360deg);
          }
        }
        @keyframes energyWave {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>

      {/* Red Floating Sphere */}
      <FloatingSphere
        color={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        floatDirection="up"
      />

      {/* Green Floating Sphere */}
      <FloatingSphere
        color={getPureGreenColor(settings.greenIntensity)}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        floatDirection="down"
      />

      {/* Cosmic background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `starTwinkle ${
                1 + Math.random() * 3
              }s linear infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes starTwinkle {
          0%,
          80%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          40% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </ExerciseLayout>
  );
}
