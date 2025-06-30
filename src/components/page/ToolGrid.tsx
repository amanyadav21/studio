
"use client";

import { BookOpen } from "lucide-react";
import type { Tool } from "@/lib/types";
import { ToolCard } from "@/components/tool-card";

interface ToolGridProps {
  tools: Tool[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  bundle: string[];
  onToggleBundle: (id: string) => void;
}

export function ToolGrid({
  tools,
  favorites,
  onToggleFavorite,
  bundle,
  onToggleBundle,
}: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No Tools Found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your search or selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-auto-rows-[1fr]">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          isFavorite={favorites.includes(tool.id)}
          onToggleFavorite={onToggleFavorite}
          isInBundle={bundle.includes(tool.id)}
          onToggleBundle={onToggleBundle}
        />
      ))}
    </div>
  );
}
