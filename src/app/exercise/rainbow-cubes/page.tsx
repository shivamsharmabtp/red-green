"use client";

import { getPureRedColor, getPureGreenColor } from "../../lib/settings";
import { useExerciseControls } from "../../hooks/useExerciseControls";
import ExerciseLayout from "../../components/ExerciseLayout";

export default function RainbowCubesExercise() {
  const {
    horizontalSeparation,
    verticalSeparation,
    showInstructions,
    isFullscreen,
    settings,
  } = useExerciseControls({ stepSize: 4 });

  const RainbowCube = ({
    primaryColor,
    offsetX,
    offsetY,
    rotationAxis,
  }: {
    primaryColor: string;
    offsetX: number;
    offsetY: number;
    rotationAxis: string;
  }) => {
    const size = 120 * settings.objectSize;

    // Generate rainbow variations of the primary color
    const getRainbowVariation = (baseColor: string, hueShift: number) => {
      // Extract the alpha from the base color
      const alpha = baseColor.match(/[\d.]+(?=\))/g)?.[3] || "1";

      // Create rainbow variations by shifting hue
      if (baseColor.includes("255, 0, 0")) {
        // Red base - shift through spectrum
        const variations = [
          `rgba(255, ${Math.round(127 * hueShift)}, 0, ${alpha})`, // Red to Orange
          `rgba(${Math.round(255 - 127 * hueShift)}, 255, 0, ${alpha})`, // Orange to Yellow
          `rgba(0, 255, ${Math.round(127 * hueShift)}, ${alpha})`, // Yellow to Green
          `rgba(0, ${Math.round(255 - 127 * hueShift)}, 255, ${alpha})`, // Green to Cyan
          `rgba(${Math.round(127 * hueShift)}, 0, 255, ${alpha})`, // Cyan to Blue
          `rgba(255, 0, ${Math.round(255 - 127 * hueShift)}, ${alpha})`, // Blue to Magenta
        ];
        return variations[Math.floor(hueShift * 5)];
      } else {
        // Green base - different rainbow pattern
        const variations = [
          `rgba(0, 255, ${Math.round(127 * hueShift)}, ${alpha})`, // Green to Cyan
          `rgba(0, ${Math.round(255 - 127 * hueShift)}, 255, ${alpha})`, // Cyan to Blue
          `rgba(${Math.round(127 * hueShift)}, 0, 255, ${alpha})`, // Blue to Magenta
          `rgba(255, 0, ${Math.round(255 - 127 * hueShift)}, ${alpha})`, // Magenta to Red
          `rgba(255, ${Math.round(127 * hueShift)}, 0, ${alpha})`, // Red to Orange
          `rgba(${Math.round(255 - 127 * hueShift)}, 255, 0, ${alpha})`, // Orange to Yellow
        ];
        return variations[Math.floor(hueShift * 5)];
      }
    };

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
            animation: `${rotationAxis} 12s linear infinite`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Six faces of the cube with rainbow colors */}
          {[
            {
              name: "front",
              transform: `translateZ(${size / 2}px)`,
              colorShift: 0,
            },
            {
              name: "back",
              transform: `rotateY(180deg) translateZ(${size / 2}px)`,
              colorShift: 0.5,
            },
            {
              name: "right",
              transform: `rotateY(90deg) translateZ(${size / 2}px)`,
              colorShift: 0.2,
            },
            {
              name: "left",
              transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
              colorShift: 0.8,
            },
            {
              name: "top",
              transform: `rotateX(90deg) translateZ(${size / 2}px)`,
              colorShift: 0.3,
            },
            {
              name: "bottom",
              transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
              colorShift: 0.7,
            },
          ].map((face) => (
            <div
              key={face.name}
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `linear-gradient(45deg, ${getRainbowVariation(
                  primaryColor,
                  face.colorShift
                )}, ${getRainbowVariation(
                  primaryColor,
                  (face.colorShift + 0.2) % 1
                )})`,
                transform: face.transform,
                border: `2px solid ${getRainbowVariation(
                  primaryColor,
                  face.colorShift
                )}`,
                boxShadow: `
                  inset 0 0 20px ${getRainbowVariation(
                    primaryColor,
                    face.colorShift
                  )}40,
                  0 0 20px ${getRainbowVariation(
                    primaryColor,
                    face.colorShift
                  )}60
                `,
                opacity: 0.9,
              }}
            >
              {/* Inner geometric pattern */}
              <div
                className="absolute inset-2"
                style={{
                  background: `conic-gradient(from 0deg, ${getRainbowVariation(
                    primaryColor,
                    face.colorShift
                  )}, ${getRainbowVariation(
                    primaryColor,
                    (face.colorShift + 0.3) % 1
                  )}, ${getRainbowVariation(
                    primaryColor,
                    (face.colorShift + 0.6) % 1
                  )}, ${getRainbowVariation(primaryColor, face.colorShift)})`,
                  clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
                }}
              />

              {/* Center dot */}
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: getRainbowVariation(
                    primaryColor,
                    (face.colorShift + 0.5) % 1
                  ),
                  boxShadow: `0 0 10px ${getRainbowVariation(
                    primaryColor,
                    (face.colorShift + 0.5) % 1
                  )}`,
                }}
              />
            </div>
          ))}

          {/* Trailing rainbow effect */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`trail-${i}`}
              className="absolute inset-0 rounded-sm opacity-30"
              style={{
                transform: `scale(${1 + i * 0.1}) translateZ(${-i * 10}px)`,
                background: `linear-gradient(45deg, ${getRainbowVariation(
                  primaryColor,
                  i * 0.2
                )}, transparent)`,
                animation: `trailFade 2s ease-out infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Surrounding rainbow particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${50 + Math.cos((i * Math.PI) / 6) * 150}%`,
              top: `${50 + Math.sin((i * Math.PI) / 6) * 150}%`,
              transform: "translate(-50%, -50%)",
              background: getRainbowVariation(primaryColor, i / 12),
              boxShadow: `0 0 8px ${getRainbowVariation(primaryColor, i / 12)}`,
              animation: `rainbowOrbit 8s linear infinite ${i * 0.5}s`,
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
        title: "Rainbow Cubes",
        titleColor: "text-rainbow-400",
        borderColor: "border-purple-500",
        className: "rainbow-gradient-border",
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
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rainbow-gradient-border {
          border: 2px solid;
          border-image: linear-gradient(
              45deg,
              #ff0000,
              #ff8000,
              #ffff00,
              #80ff00,
              #00ff00,
              #00ff80,
              #00ffff,
              #0080ff,
              #0000ff,
              #8000ff,
              #ff00ff,
              #ff0080
            )
            1;
        }
        @keyframes rotateX {
          from {
            transform: rotateX(0deg);
          }
          to {
            transform: rotateX(360deg);
          }
        }
        @keyframes rotateY {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        @keyframes rotateXY {
          from {
            transform: rotateX(0deg) rotateY(0deg);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
        @keyframes trailFade {
          0% {
            opacity: 0.5;
            transform: scale(var(--scale)) translateZ(var(--z));
          }
          100% {
            opacity: 0;
            transform: scale(calc(var(--scale) * 1.5)) translateZ(var(--z));
          }
        }
        @keyframes rainbowOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(120px)
              rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(120px)
              rotate(-360deg);
          }
        }
      `}</style>

      {/* Red Rainbow Cube */}
      <RainbowCube
        primaryColor={getPureRedColor(settings.redIntensity)}
        offsetX={-horizontalSeparation / 2}
        offsetY={-verticalSeparation / 2}
        rotationAxis="rotateXY"
      />

      {/* Green Rainbow Cube */}
      <RainbowCube
        primaryColor={getPureGreenColor(settings.greenIntensity)}
        offsetX={horizontalSeparation / 2}
        offsetY={verticalSeparation / 2}
        rotationAxis="rotateY"
      />

      {/* Rainbow prism background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              boxShadow: `0 0 6px hsl(${Math.random() * 360}, 70%, 60%)`,
              animation: `prismTwinkle ${
                1 + Math.random() * 2
              }s linear infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes prismTwinkle {
          0%,
          80%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          40% {
            opacity: 1;
            transform: scale(1.8);
          }
        }
      `}</style>
    </ExerciseLayout>
  );
}
