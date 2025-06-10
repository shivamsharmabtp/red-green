export interface ExerciseSettings {
  objectSize: number; // Size multiplier for primary objects (0.5 to 2.0)
  redIntensity: number; // Red color intensity/opacity (0.3 to 1.0)
  greenIntensity: number; // Green color intensity/opacity (0.3 to 1.0)
}

export const DEFAULT_SETTINGS: ExerciseSettings = {
  objectSize: 1.0,
  redIntensity: 0.8,
  greenIntensity: 0.8,
};

const SETTINGS_KEY = "red-green-exercise-settings";

export function getSettings(): ExerciseSettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        objectSize: parsed.objectSize ?? DEFAULT_SETTINGS.objectSize,
        redIntensity:
          parsed.redIntensity ??
          parsed.colorIntensity ??
          DEFAULT_SETTINGS.redIntensity,
        greenIntensity:
          parsed.greenIntensity ??
          parsed.colorIntensity ??
          DEFAULT_SETTINGS.greenIntensity,
      };
    }
  } catch (error) {
    console.error("Error loading settings:", error);
  }

  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: ExerciseSettings): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings:", error);
  }
}

// Helper functions to get pure red/green colors with transparency
export function getPureRedColor(intensity: number): string {
  return `rgba(255, 0, 0, ${intensity})`;
}

export function getPureGreenColor(intensity: number): string {
  return `rgba(0, 255, 0, ${intensity})`;
}
