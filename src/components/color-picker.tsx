
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
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#94a3b8",
  "#475569",
  "#1e293b",
  "#0f172a",
  "#000000",
  "#fca5a5",
  "#ef4444",
  "#b91c1c",
  "#fb923c",
  "#f97316",
  "#c2410c",
  "#a3e635",
  "#84cc16",
  "#4d7c0f",
  "#4ade80",
  "#22c55e",
  "#15803d",
  "#2dd4bf",
  "#14b8a6",
  "#0f766e",
  "#38bdf8",
  "#0ea5e9",
  "#0369a1",
  "#818cf8",
  "#6366f1",
  "#4338ca",
  "#c084fc",
  "#a855f7",
  "#7e22ce",
  "#f472b6",
  "#ec4899",
  "#be185d",
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
          <Palette className="h-4 w-4" />
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
