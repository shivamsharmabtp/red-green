"use client";

import { getPureRedColor, getPureGreenColor } from "../../lib/settings";
import { useExerciseControls } from "../../hooks/useExerciseControls";
import ExerciseLayout from "../../components/ExerciseLayout";

export default function TriangleExercise() {
  const {
    horizontalSeparation,
    verticalSeparation,
    showInstructions,
    isFullscreen,
    settings,
  } = useExerciseControls({ stepSize: 5 });

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
    <ExerciseLayout
      showInstructions={showInstructions}
      instructionsConfig={{
        title: "Triangle Exercise",
        titleColor: "text-white",
      }}
      homeButtonConfig={{
        gradientFrom: "gray-600",
        gradientTo: "gray-800",
      }}
      horizontalSeparation={horizontalSeparation}
      verticalSeparation={verticalSeparation}
      settings={settings}
      isFullscreen={isFullscreen}
    >
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

      {/* Center crosshair (optional helper) */}
      <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-gray-600 opacity-50 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute w-8 h-px bg-gray-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-px h-8 bg-gray-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </ExerciseLayout>
  );
}
