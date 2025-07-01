
"use client";

import * as React from "react";
import { Palette, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getContrastingTextColor } from "@/lib/utils";

const colors = [
  "#ffffff",
  "#f8fafc", // slate-50
  "#f1f5f9", // slate-100
  "#e2e8f0", // slate-200
  "#94a3b8", // slate-400
  "#475569", // slate-600
  "#1e293b", // slate-800
  "#0f172a", // slate-900
  "#fca5a5", // red-300
  "#ef4444", // red-500
  "#b91c1c", // red-700
  "#fb923c", // orange-400
  "#f97316", // orange-500
  "#c2410c", // orange-700
  "#a3e635", // lime-400
  "#84cc16", // lime-500
  "#4d7c0f", // lime-700
  "#4ade80", // green-400
  "#22c55e", // green-500
  "#15803d", // green-700
  "#2dd4bf", // teal-400
  "#14b8a6", // teal-500
  "#0f766e", // teal-700
  "#38bdf8", // sky-400
  "#0ea5e9", // sky-500
  "#0369a1", // sky-700
  "#818cf8", // indigo-400
  "#6366f1", // indigo-500
  "#4338ca", // indigo-700
  "#c084fc", // purple-400
  "#a855f7", // purple-500
  "#7e22ce", // purple-700
  "#f472b6", // pink-400
  "#ec4899", // pink-500
  "#be185d", // pink-700
];

interface ColorPickerProps {
  selectedColor: string | null;
  onColorChange: (color: string) => void;
  onClear: () => void;
}

export function ColorPicker({
  selectedColor,
  onColorChange,
  onClear,
}: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Choose card color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant="outline"
                className={cn(
                  "h-9 w-9 rounded-full border-2 p-0",
                  selectedColor === color && "ring-2 ring-ring ring-offset-2"
                )}
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              >
                {selectedColor === color && (
                  <Check
                    className="h-4 w-4"
                    style={{ color: getContrastingTextColor(color) }}
                  />
                )}
                <span className="sr-only">{color}</span>
              </Button>
            ))}
          </div>
          {selectedColor && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center"
              onClick={onClear}
            >
              <X className="mr-2 h-4 w-4" />
              Reset Color
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
