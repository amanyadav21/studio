
"use client";

import * as React from "react";
import { Palette, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getContrastingTextColor } from "@/lib/utils";

const colors = [
  "#ffffff",
  "#0f172a", // slate-900
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#eab308", // yellow-500
  "#84cc16", // lime-500
  "#22c55e", // green-500
  "#14b8a6", // teal-500
  "#06b6d4", // cyan-500
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
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
      <PopoverContent className="w-auto p-4" align="end">
        <div className="space-y-4">
            <div>
                <h4 className="font-medium leading-none">Card Color</h4>
                <p className="text-sm text-muted-foreground">
                Personalize the look of your tool cards.
                </p>
            </div>
            <Separator />
            <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
                <Button
                key={color}
                variant="outline"
                className={cn(
                    "h-8 w-8 rounded-full border-2 p-0",
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
