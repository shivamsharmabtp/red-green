"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getSettings,
  increaseSize,
  decreaseSize,
  cycleRedIntensity,
  cycleGreenIntensity,
  type ExerciseSettings,
} from "../lib/settings";

interface UseExerciseControlsOptions {
  stepSize?: number;
  maxHorizontalSeparation?: number;
  maxVerticalSeparation?: number;
}

export function useExerciseControls(options: UseExerciseControlsOptions = {}) {
  const {
    stepSize = 5,
    maxHorizontalSeparation = 1000,
    maxVerticalSeparation = 1000,
  } = options;

  // State management
  const [horizontalSeparation, setHorizontalSeparation] = useState(0);
  const [verticalSeparation, setVerticalSeparation] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settings, setSettings] = useState<ExerciseSettings>({
    objectSize: 1.0,
    redIntensity: 0.8,
    greenIntensity: 0.8,
  });

  // Load settings on component mount
  useEffect(() => {
    setSettings(getSettings());
  }, []);

  // Fullscreen toggle function
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        console.log("Fullscreen request failed");
      });
    } else {
      document.exitFullscreen().catch(() => {
        console.log("Exit fullscreen failed");
      });
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle keyboard controls
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          setHorizontalSeparation((prev) =>
            Math.max(prev - stepSize, -maxHorizontalSeparation)
          );
          break;
        case "ArrowRight":
          event.preventDefault();
          setHorizontalSeparation((prev) =>
            Math.min(prev + stepSize, maxHorizontalSeparation)
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setVerticalSeparation((prev) =>
            Math.max(prev - stepSize, -maxVerticalSeparation)
          );
          break;
        case "ArrowDown":
          event.preventDefault();
          setVerticalSeparation((prev) =>
            Math.min(prev + stepSize, maxVerticalSeparation)
          );
          break;
        case "Escape":
          event.preventDefault();
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
        case "f":
        case "F":
          event.preventDefault();
          toggleFullscreen();
          break;
      }
    },
    [stepSize, maxHorizontalSeparation, maxVerticalSeparation, toggleFullscreen]
  );

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return {
    // State
    horizontalSeparation,
    verticalSeparation,
    showInstructions,
    isFullscreen,
    settings,
    // Actions
    setShowInstructions,
    toggleFullscreen,
  };
}
