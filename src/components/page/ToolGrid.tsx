"use client";

import { BookOpen } from "lucide-react";
import type { Tool } from "@/lib/types";
import { ToolCard } from "@/components/tool-card";
import * as React from "react";

interface ToolGridProps {
  tools: Tool[];
  pinnedTools: string[];
  onTogglePinned: (id: string) => void;
  bundle: string[];
  onToggleBundle: (id: string) => void;
  cardColor: string | null;
}

export const ToolGrid = React.memo(function ToolGrid({
  tools,
  pinnedTools,
  onTogglePinned,
  bundle,
  onToggleBundle,
  cardColor,
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
          isPinned={pinnedTools.includes(tool.id)}
          onTogglePinned={onTogglePinned}
          isInBundle={bundle.includes(tool.id)}
          onToggleBundle={onToggleBundle}
          cardColor={cardColor}
        />
      ))}
    </div>
  );
});
