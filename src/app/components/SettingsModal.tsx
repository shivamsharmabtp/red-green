"use client";

import { useState, useEffect } from "react";
import {
  ExerciseSettings,
  getSettings,
  saveSettings,
  getPureRedColor,
  getPureGreenColor,
} from "../lib/settings";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState<ExerciseSettings>({
    objectSize: 1.0,
    redIntensity: 0.8,
    greenIntensity: 0.8,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  useEffect(() => {
    if (isOpen) {
      setSettings(getSettings());
      setCurrentStep(0);
    }
  }, [isOpen]);

  const handleSave = () => {
    saveSettings(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings({
      objectSize: 1.0,
      redIntensity: 0.8,
      greenIntensity: 0.8,
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Object Size
              </h3>
              <p className="text-gray-600 text-sm">
                Adjust the size of shapes in exercises
              </p>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4 text-center">
                Size: {settings.objectSize.toFixed(2)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.01"
                value={settings.objectSize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    objectSize: parseFloat(e.target.value),
                  })
                }
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0.5x (Small)</span>
                <span>1.0x (Normal)</span>
                <span>2.0x (Large)</span>
              </div>
            </div>

            {/* Size Preview */}
            <div className="flex justify-center">
              <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Preview
                </div>
                <div className="flex justify-center items-center">
                  <svg
                    width={80 * settings.objectSize}
                    height={80 * settings.objectSize}
                    viewBox="0 0 80 80"
                    className="drop-shadow-sm"
                  >
                    <polygon
                      points="40,8 15,60 65,60"
                      fill="rgba(59, 130, 246, 0.8)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Red Intensity
              </h3>
              <p className="text-gray-600 text-sm">
                Adjust the intensity of red objects
              </p>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4 text-center">
                Red: {Math.round(settings.redIntensity * 100)}%
              </label>
              <input
                type="range"
                min="0.3"
                max="1.0"
                step="0.01"
                value={settings.redIntensity}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    redIntensity: parseFloat(e.target.value),
                  })
                }
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider red-slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>30% (Light)</span>
                <span>65% (Medium)</span>
                <span>100% (Full)</span>
              </div>
            </div>

            {/* Red Preview */}
            <div className="flex justify-center">
              <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Red Preview
                </div>
                <div className="flex justify-center items-center">
                  <div
                    className="w-20 h-20 rounded-xl shadow-lg"
                    style={{
                      backgroundColor: getPureRedColor(settings.redIntensity),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Green Intensity
              </h3>
              <p className="text-gray-600 text-sm">
                Adjust the intensity of green objects
              </p>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4 text-center">
                Green: {Math.round(settings.greenIntensity * 100)}%
              </label>
              <input
                type="range"
                min="0.3"
                max="1.0"
                step="0.01"
                value={settings.greenIntensity}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    greenIntensity: parseFloat(e.target.value),
                  })
                }
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider green-slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>30% (Light)</span>
                <span>65% (Medium)</span>
                <span>100% (Full)</span>
              </div>
            </div>

            {/* Green Preview */}
            <div className="flex justify-center">
              <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Green Preview
                </div>
                <div className="flex justify-center items-center">
                  <div
                    className="w-20 h-20 rounded-xl shadow-lg"
                    style={{
                      backgroundColor: getPureGreenColor(
                        settings.greenIntensity
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Exercise Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentStep
                    ? "bg-blue-600"
                    : index < currentStep
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Settings
              </button>
            )}
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
        }
        .red-slider::-webkit-slider-thumb {
          background: #ef4444;
        }
        .red-slider::-webkit-slider-thumb:hover {
          background: #dc2626;
        }
        .green-slider::-webkit-slider-thumb {
          background: #10b981;
        }
        .green-slider::-webkit-slider-thumb:hover {
          background: #059669;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
