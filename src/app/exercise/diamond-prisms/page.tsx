"use client";

import { getPureRedColor, getPureGreenColor } from "../../lib/settings";
import { useExerciseControls } from "../../hooks/useExerciseControls";
import ExerciseLayout from "../../components/ExerciseLayout";

export default function DiamondPrismsExercise() {
  const {
    horizontalSeparation,
    verticalSeparation,
    showInstructions,
    isFullscreen,
    settings,
  } = useExerciseControls({ stepSize: 3 });

  const DiamondPrism = ({
    color,
    offsetX,
    offsetY,
    rotationDelay,
  }: {
    color: string;
    offsetX: number;
    offsetY: number;
    rotationDelay: number;
  }) => {
    const size = 160 * settings.objectSize;

    return (
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
        }}
      >
        {/* Outer rotating ring */}
        <div
          className="absolute inset-0 rounded-full border-4 opacity-30"
          style={{
            width: `${size * 1.5}px`,
            height: `${size * 1.5}px`,
            borderColor: color,
            animation: `spin 10s linear infinite ${rotationDelay}s`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Main diamond prism */}
        <div
          className="relative"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animation: `float 4s ease-in-out infinite ${rotationDelay}s`,
          }}
        >
          {/* Diamond faces creating 3D effect */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${
                  45 + i * 60
                }deg, ${color}ff, ${color}80, ${color}20)`,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                transform: `rotate(${i * 60}deg) scale(${1 - i * 0.1})`,
                opacity: 0.8 - i * 0.1,
                animation: `prismRotate 8s linear infinite ${
                  rotationDelay + i * 0.2
                }s`,
              }}
            />
          ))}

          {/* Central crystalline core */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${color}ff, ${color}40, transparent)`,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              animation: `pulse 3s ease-in-out infinite ${rotationDelay}s`,
            }}
          />

          {/* Light reflections */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`light-${i}`}
              className="absolute"
              style={{
                width: "2px",
                height: `${size * 0.8}px`,
                background: `linear-gradient(to bottom, ${color}ff, transparent)`,
                left: "50%",
                top: "10%",
                transform: `translateX(-50%) rotate(${i * 120}deg)`,
                opacity: 0.6,
                animation: `shimmer 2s ease-in-out infinite ${
                  rotationDelay + i * 0.5
                }s`,
              }}
            />
          ))}

          {/* Prism edges for 3D effect */}
          <div
            className="absolute inset-0 border-2 opacity-40"
            style={{
              borderColor: color,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              background: "transparent",
            }}
          />
        </div>

        {/* Floating particles around the prism */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: color,
              left: `${50 + Math.cos((i * Math.PI) / 4) * 100}%`,
              top: `${50 + Math.sin((i * Math.PI) / 4) * 100}%`,
              transform: "translate(-50%, -50%)",
              animation: `orbit 6s linear infinite ${
                rotationDelay + i * 0.25
              }s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <ExerciseLayout
      showInstructions={showInstructions}
      instructionsConfig={{
        title: "Diamond Prisms",
        titleColor: "text-purple-400",
        borderColor: "border-purple-500",
      }}
      homeButtonConfig={{
        gradientFrom: "purple-600",
        gradientTo: "pink-600",
        gradientVia: "indigo-600",
      }}
      horizontalSeparation={horizontalSeparation}
      verticalSeparation={verticalSeparation}
      settings={settings}
      isFullscreen={isFullscreen}
    >
      <style jsx>{`
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        @keyframes prismRotate {
          from {
            transform: rotate(0deg) scale(var(--scale));
          }
          to {
            transform: rotate(360deg) scale(var(--scale));
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(80px)
              rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(80px)
              rotate(-360deg);
          }
        }
      `}</style>

      {/* Red Diamond Prism */}
      <DiamondPrism
        color={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        rotationDelay={0}
      />

      {/* Green Diamond Prism */}
      <DiamondPrism
        color={getPureGreenColor(settings.greenIntensity)}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        rotationDelay={2}
      />

      {/* Mystical background pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
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
          80%,
          100% {
            opacity: 0.1;
          }
          40% {
            opacity: 0.6;
          }
        }
      `}</style>
    </ExerciseLayout>
  );
}
