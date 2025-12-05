
"use client";

import { BookOpen, Bookmark } from "lucide-react";
import type { Tool } from "@/lib/types";
import { ToolCard } from "@/components/tool-card";
import * as React from "react";

interface ToolGridProps {
  tools: Tool[];
  savedTools: string[];
  onToggleSaved: (id: string) => void;
  cardColor: string | null;
  isSavedSection?: boolean;
}

function ToolGrid({
  tools,
  savedTools,
  onToggleSaved,
  cardColor,
  isSavedSection = false,
}: ToolGridProps) {
  if (tools.length === 0) {
    if (isSavedSection) {
      return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Saved Tools</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Click the bookmark icon on any tool card to add it to this list for quick
            access.
          </p>
        </div>
      );
    }
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

  // Use regular grid for now - virtualization can be added later when needed
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          isSaved={savedTools.includes(tool.id)}
          onToggleSaved={onToggleSaved}
          cardColor={cardColor}
        />
      ))}
    </div>
  );
}

export default React.memo(ToolGrid);
