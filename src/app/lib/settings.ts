export interface ExerciseSettings {
  objectSize: number; // Size multiplier for primary objects (0.5 to 10.0)
  redIntensity: number; // Red color intensity/opacity (0.3 to 1.0)
  greenIntensity: number; // Green color intensity/opacity (0.3 to 1.0)
}

export const DEFAULT_SETTINGS: ExerciseSettings = {
  objectSize: 1.0,
  redIntensity: 0.8,
  greenIntensity: 0.8,
};

const SETTINGS_KEY = "red-green-exercise-settings";

// Size constraints
export const MIN_SIZE = 0.5;
export const MAX_SIZE = 10.0;
export const SIZE_STEP = 0.1;

// Intensity constraints
export const MIN_INTENSITY = 0.3;
export const MAX_INTENSITY = 1.0;
export const INTENSITY_STEP = 0.1;

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

// Update individual setting and save
export function updateSetting<K extends keyof ExerciseSettings>(
  key: K,
  value: ExerciseSettings[K]
): ExerciseSettings {
  const currentSettings = getSettings();
  const newSettings = { ...currentSettings, [key]: value };
  saveSettings(newSettings);
  return newSettings;
}

// Increase object size
export function increaseSize(): ExerciseSettings {
  const current = getSettings();
  const newSize = Math.min(current.objectSize + SIZE_STEP, MAX_SIZE);
  return updateSetting("objectSize", parseFloat(newSize.toFixed(1)));
}

// Decrease object size
export function decreaseSize(): ExerciseSettings {
  const current = getSettings();
  const newSize = Math.max(current.objectSize - SIZE_STEP, MIN_SIZE);
  return updateSetting("objectSize", parseFloat(newSize.toFixed(1)));
}

// Increase red intensity
export function increaseRedIntensity(): ExerciseSettings {
  const current = getSettings();
  const newIntensity = Math.min(
    current.redIntensity + INTENSITY_STEP,
    MAX_INTENSITY
  );
  return updateSetting("redIntensity", parseFloat(newIntensity.toFixed(1)));
}

// Decrease red intensity
export function decreaseRedIntensity(): ExerciseSettings {
  const current = getSettings();
  const newIntensity = Math.max(
    current.redIntensity - INTENSITY_STEP,
    MIN_INTENSITY
  );
  return updateSetting("redIntensity", parseFloat(newIntensity.toFixed(1)));
}

// Increase green intensity
export function increaseGreenIntensity(): ExerciseSettings {
  const current = getSettings();
  const newIntensity = Math.min(
    current.greenIntensity + INTENSITY_STEP,
    MAX_INTENSITY
  );
  return updateSetting("greenIntensity", parseFloat(newIntensity.toFixed(1)));
}

// Decrease green intensity
export function decreaseGreenIntensity(): ExerciseSettings {
  const current = getSettings();
  const newIntensity = Math.max(
    current.greenIntensity - INTENSITY_STEP,
    MIN_INTENSITY
  );
  return updateSetting("greenIntensity", parseFloat(newIntensity.toFixed(1)));
}

// Cycle red intensity (min -> max -> min)
export function cycleRedIntensity(): ExerciseSettings {
  const current = getSettings();
  let newIntensity = current.redIntensity + INTENSITY_STEP;

  if (newIntensity > MAX_INTENSITY) {
    newIntensity = MIN_INTENSITY;
  }

  return updateSetting("redIntensity", parseFloat(newIntensity.toFixed(1)));
}

// Cycle green intensity (min -> max -> min)
export function cycleGreenIntensity(): ExerciseSettings {
  const current = getSettings();
  let newIntensity = current.greenIntensity + INTENSITY_STEP;

  if (newIntensity > MAX_INTENSITY) {
    newIntensity = MIN_INTENSITY;
  }

  return updateSetting("greenIntensity", parseFloat(newIntensity.toFixed(1)));
}

// Helper functions to get pure red/green colors with transparency
export function getPureRedColor(intensity: number): string {
  return `rgba(255, 0, 0, ${intensity})`;
}

export function getPureGreenColor(intensity: number): string {
  return `rgba(0, 255, 0, ${intensity})`;
}
