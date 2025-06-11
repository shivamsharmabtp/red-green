"use client";

import { ReactNode } from "react";
import InstructionsPanel from "./InstructionsPanel";
import HomeButton from "./HomeButton";
import type { ExerciseSettings } from "../lib/settings";

interface ExerciseLayoutProps {
  children: ReactNode;
  showInstructions: boolean;
  instructionsConfig: {
    title: string;
    titleColor: string;
    borderColor?: string;
    className?: string;
  };
  homeButtonConfig: {
    gradientFrom: string;
    gradientTo: string;
    gradientVia?: string;
  };
  horizontalSeparation: number;
  verticalSeparation: number;
  settings: ExerciseSettings;
  isFullscreen: boolean;
}

export default function ExerciseLayout({
  children,
  showInstructions,
  instructionsConfig,
  homeButtonConfig,
  horizontalSeparation,
  verticalSeparation,
  settings,
  isFullscreen,
}: ExerciseLayoutProps) {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {children}

      {/* Instructions Panel */}
      {showInstructions && (
        <InstructionsPanel
          title={instructionsConfig.title}
          titleColor={instructionsConfig.titleColor}
          borderColor={instructionsConfig.borderColor}
          horizontalSeparation={horizontalSeparation}
          verticalSeparation={verticalSeparation}
          settings={settings}
          isFullscreen={isFullscreen}
          className={instructionsConfig.className}
        />
      )}

      {/* Home Button */}
      <HomeButton
        gradientFrom={homeButtonConfig.gradientFrom}
        gradientTo={homeButtonConfig.gradientTo}
        gradientVia={homeButtonConfig.gradientVia}
      />
    </div>
  );
}
