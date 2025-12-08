"use client";

import * as React from "react";
import { useSavedToolsStore } from "@/store/saved-tools-store";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";

import Header from "@/components/page/Header";
import CategoryHeader from "@/components/page/CategoryHeader";
import ToolGrid from "@/components/page/ToolGrid";
import { ListView } from "@/components/page/ListView";
import { categories as defaultCategories } from "@/data/tools";

type ViewMode = "grid" | "list";

export default function SavedPage() {
  const { savedTools, toggleSaved } = useSavedToolsStore();
  const [cardColor, setCardColor] = useLocalStorage<string | null>(
    "card-color",
    null
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('view-mode', 'grid');
  const [allTools, setAllTools] = React.useState<any[]>([]);
  const [toolsLoaded, setToolsLoaded] = React.useState(false);

  // Load tools data dynamically
  React.useEffect(() => {
    import('@/data/tools').then(({ tools }) => {
      setAllTools(tools);
      setToolsLoaded(true);
    });
  }, []);

  const onClearCardColor = React.useCallback(() => {
    setCardColor(null);
  }, [setCardColor]);

  const onCardColorChange = React.useCallback((color: string | null) => {
    setCardColor(color);
  }, [setCardColor]);

  const onViewModeChange = React.useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);

  // Filter saved tools
  const savedToolsData = React.useMemo(() => {
    if (!toolsLoaded) return [];
    return allTools.filter((tool) => savedTools.includes(tool.id));
  }, [allTools, savedTools, toolsLoaded]);

  // Search within saved tools
  const searchedTools = React.useMemo(() => {
    if (!searchTerm) return savedToolsData;
    const lowerSearch = searchTerm.toLowerCase();
    return savedToolsData.filter(
      (tool) =>
        tool.name.toLowerCase().includes(lowerSearch) ||
        tool.description.toLowerCase().includes(lowerSearch) ||
        tool.category.toLowerCase().includes(lowerSearch)
    );
  }, [savedToolsData, searchTerm]);

  if (!toolsLoaded) {
    return (
      <div className="min-h-screen w-full bg-background font-sans text-foreground">
        <Header
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          cardColor={cardColor}
          onCardColorChange={onCardColorChange}
          onClearCardColor={onClearCardColor}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          isSearching={false}
          savedCount={savedTools.length}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-muted-foreground">Loading saved tools...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground">
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        cardColor={cardColor}
        onCardColorChange={onCardColorChange}
        onClearCardColor={onClearCardColor}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        isSearching={false}
        savedCount={savedTools.length}
      />
      
      {viewMode === 'grid' ? (
        <main className="w-full p-6">
          <CategoryHeader
            title="Saved Tools"
            description="Your hand-picked tools for quick and easy access."
          />
          {searchedTools.length === 0 ? (
            <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold">No Saved Tools</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm ? "No saved tools match your search." : "Start saving tools to access them quickly later."}
              </p>
            </div>
          ) : (
            <ToolGrid
              tools={searchedTools}
              savedTools={savedTools}
              onToggleSaved={toggleSaved}
              cardColor={cardColor}
              isSavedSection={true}
            />
          )}
        </main>
      ) : (
        <div className="w-full p-6">
          <ListView
            tools={searchedTools}
            categories={defaultCategories}
            savedTools={savedTools}
            onToggleSaved={toggleSaved}
          />
        </div>
      )}
    </div>
  );
}
