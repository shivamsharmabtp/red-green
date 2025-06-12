"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getSettings,
  increaseSize,
  decreaseSize,
  increaseRedIntensity,
  decreaseRedIntensity,
  increaseGreenIntensity,
  decreaseGreenIntensity,
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

  // Progressive movement acceleration
  const keysPressed = useRef<Set<string>>(new Set());
  const keyStartTimes = useRef<Map<string, number>>(new Map());
  const movementIntervals = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Load settings on component mount
  useEffect(() => {
    setSettings(getSettings());
  }, []);

  // Auto-hide instructions when entering fullscreen
  useEffect(() => {
    if (isFullscreen) {
      setShowInstructions(false);
    }
  }, [isFullscreen]);

  // Calculate progressive step size based on how long key has been held
  const getProgressiveStepSize = useCallback(
    (key: string): number => {
      const startTime = keyStartTimes.current.get(key);
      if (!startTime) return stepSize;

      const duration = Date.now() - startTime;

      // Aggressive acceleration curve with higher top speed
      // 0-100ms: base speed (1x) - brief precise control
      // 100ms-1s: slowly ramps to 3x speed (gentle acceleration)
      // 1-3s: moderate ramp to 5x speed
      // 3-7s: faster ramp to 10x speed
      // 7s+: cap at 12x (very fast for rapid navigation)
      let multiplier = 1;

      if (duration > 100) {
        if (duration < 1000) {
          // Quick ramp from 1x to 3x over 0.9 seconds
          multiplier = 1 + ((duration - 100) / 900) * 2; // 1x to 3x
        } else if (duration < 3000) {
          // Moderate ramp from 3x to 5x over 2 seconds
          multiplier = 3 + ((duration - 1000) / 2000) * 2; // 3x to 5x
        } else if (duration < 7000) {
          // Faster ramp from 5x to 10x over 4 seconds
          multiplier = 5 + ((duration - 3000) / 4000) * 5; // 5x to 10x
        } else {
          // Final boost to 12x for very long holds
          multiplier = Math.min(12, 10 + ((duration - 7000) / 2000) * 2); // 10x to 12x (capped)
        }
      }

      return Math.round(stepSize * multiplier);
    },
    [stepSize]
  );

  // Progressive movement function
  const performMovement = useCallback(
    (key: string) => {
      const currentStepSize = getProgressiveStepSize(key);

      switch (key) {
        case "ArrowLeft":
          setHorizontalSeparation((prev) =>
            Math.max(prev - currentStepSize, -maxHorizontalSeparation)
          );
          break;
        case "ArrowRight":
          setHorizontalSeparation((prev) =>
            Math.min(prev + currentStepSize, maxHorizontalSeparation)
          );
          break;
        case "ArrowUp":
          setVerticalSeparation((prev) =>
            Math.max(prev - currentStepSize, -maxVerticalSeparation)
          );
          break;
        case "ArrowDown":
          setVerticalSeparation((prev) =>
            Math.min(prev + currentStepSize, maxVerticalSeparation)
          );
          break;
      }
    },
    [getProgressiveStepSize, maxHorizontalSeparation, maxVerticalSeparation]
  );

  // Start continuous movement for arrow keys
  const startContinuousMovement = useCallback(
    (key: string) => {
      if (movementIntervals.current.has(key)) return;

      // Initial movement
      performMovement(key);

      // Set up continuous movement with faster intervals for smoother acceleration
      const interval = setInterval(() => {
        performMovement(key);
      }, 50); // 20fps for smooth movement

      movementIntervals.current.set(key, interval);
    },
    [performMovement]
  );

  // Stop continuous movement
  const stopContinuousMovement = useCallback((key: string) => {
    const interval = movementIntervals.current.get(key);
    if (interval) {
      clearInterval(interval);
      movementIntervals.current.delete(key);
    }
    keysPressed.current.delete(key);
    keyStartTimes.current.delete(key);
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

  // Handle key down (start movement)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      // Prevent default for all our handled keys
      if (
        [
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Escape",
          "+",
          "=",
          "-",
          "_",
          "r",
          "R",
          "g",
          "G",
          "f",
          "F",
        ].includes(key)
      ) {
        event.preventDefault();
      }

      // Handle arrow keys with progressive movement
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key)) {
        if (!keysPressed.current.has(key)) {
          keysPressed.current.add(key);
          keyStartTimes.current.set(key, Date.now());
          startContinuousMovement(key);
        }
        return;
      }

      // Handle other keys (single press)
      switch (key) {
        case "Escape":
          setShowInstructions((prev) => !prev);
          break;
        case "+":
        case "=":
          setSettings(increaseSize());
          break;
        case "-":
        case "_":
          setSettings(decreaseSize());
          break;
        case "r":
          setSettings(increaseRedIntensity());
          break;
        case "R":
          setSettings(decreaseRedIntensity());
          break;
        case "g":
          setSettings(increaseGreenIntensity());
          break;
        case "G":
          setSettings(decreaseGreenIntensity());
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    },
    [startContinuousMovement, toggleFullscreen]
  );

  // Handle key up (stop movement)
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key)) {
        stopContinuousMovement(key);
      }
    },
    [stopContinuousMovement]
  );

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);

      // Clean up all intervals
      movementIntervals.current.forEach((interval) => {
        clearInterval(interval);
      });
      movementIntervals.current.clear();
      keysPressed.current.clear();
      keyStartTimes.current.clear();
    };
  }, [handleKeyDown, handleKeyUp]);

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
