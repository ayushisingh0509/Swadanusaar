
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const MoodSelector = ({ value, onValueChange }: MoodSelectorProps) => {
  const moods = [
    { id: "all", name: "All Moods", emoji: "✨" },
    { id: "healthy", name: "Healthy", emoji: "🥗" },
    { id: "quick", name: "Quick & Easy", emoji: "⏱️" },
    { id: "comfort", name: "Comfort Food", emoji: "🍲" },
    { id: "spicy", name: "Spicy", emoji: "🌶️" },
  ];

  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 mb-2">What's your mood today?</p>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onValueChange(mood.id)}
            className={cn(
              "flex items-center px-3 py-1.5 rounded-full text-sm transition-colors",
              value === mood.id
                ? "bg-cuisine-green text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <span className="mr-1.5">{mood.emoji}</span>
            {mood.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
