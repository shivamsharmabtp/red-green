"use client";

import { useState } from "react";
import Link from "next/link";
import SettingsModal from "./components/SettingsModal";

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);

  const exercises = [
    {
      id: "triangle",
      name: "The Triangle",
      description: "Red and green triangle separation exercise for strabismus",
      difficulty: "Beginner",
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "floating-spheres",
      name: "Floating Spheres",
      description:
        "3D-looking spheres with shadows and depth perception training",
      difficulty: "Intermediate",
      color: "bg-purple-50 border-purple-200",
    },
    {
      id: "pulsing-dots",
      name: "Pulsing Dots",
      description:
        "Animated dots that pulse and scale for dynamic focus training",
      difficulty: "Beginner",
      color: "bg-green-50 border-green-200",
    },
    {
      id: "rainbow-cubes",
      name: "Rainbow Cubes",
      description: "Vibrant 3D cubes with gradient effects and rotation",
      difficulty: "Advanced",
      color: "bg-pink-50 border-pink-200",
    },
    {
      id: "diamond-prisms",
      name: "Diamond Prisms",
      description: "Multi-faceted diamond shapes with prismatic color effects",
      difficulty: "Intermediate",
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      id: "neon-rings",
      name: "Neon Rings",
      description:
        "Glowing circular rings with neon effects and smooth animations",
      difficulty: "Advanced",
      color: "bg-cyan-50 border-cyan-200",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 relative">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Eye Exercises for Strabismus
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced visual therapy exercises with vibrant 3D shapes to help
            improve eye coordination
          </p>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            className="absolute top-0 right-0 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-xl p-3 border border-gray-200 hover:border-gray-300"
            title="Exercise Settings"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <Link
              key={exercise.id}
              href={`/exercise/${exercise.id}`}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border ${exercise.color} hover:scale-105`}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {exercise.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(
                      exercise.difficulty
                    )}`}
                  >
                    {exercise.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 flex-grow leading-relaxed">
                  {exercise.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-600 font-semibold">
                    Start Exercise
                    <svg
                      className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Use These Exercises
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Controls</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>
                    • <strong>← →</strong> Move shapes horizontally
                  </li>
                  <li>
                    • <strong>↑ ↓</strong> Move shapes vertically
                  </li>
                  <li>
                    • <strong>ESC</strong> Toggle instructions
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Tips</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Start with beginner exercises</li>
                  <li>• Practice in a dark room for best results</li>
                  <li>• Follow your eye care professional's guidance</li>
                  <li>• Adjust settings using the ⚙️ button above</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
