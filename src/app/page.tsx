
"use client";

import * as React from "react";

import { categories as defaultCategories, tools as defaultTools } from "@/data/tools";
import type { Tool, ToolCategory } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";

import { BundleBar } from "@/components/bundle-bar";
import { Header } from "@/components/page/Header";
import { Sidebar } from "@/components/page/Sidebar";
import { CategoryHeader } from "@/components/page/CategoryHeader";
import { ToolGrid } from "@/components/page/ToolGrid";

const INITIAL_PINNED_TOOLS: string[] = [];

export default function Home() {
  const [pinnedTools, setPinnedTools] = useLocalStorage<string[]>(
    "pinned-tools",
    INITIAL_PINNED_TOOLS
  );
  const [cardColor, setCardColor] = useLocalStorage<string | null>(
    "card-color",
    null
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<
    "All" | "Pinned" | ToolCategory
  >("All");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [bundle, setBundle] = React.useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const allTools = defaultTools;

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const togglePinned = React.useCallback(
    (toolId: string) => {
      setPinnedTools((prev) =>
        prev.includes(toolId)
          ? prev.filter((id) => id !== toolId)
          : [...prev, toolId]
      );
    },
    [setPinnedTools]
  );

  const toggleBundle = React.useCallback(
    (toolId: string) => {
      setBundle((prev) =>
        prev.includes(toolId)
          ? prev.filter((id) => id !== toolId)
          : [...prev, toolId]
      );
    },
    [setBundle]
  );

  const clearBundle = React.useCallback(() => {
    setBundle([]);
  }, [setBundle]);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const onClearCardColor = React.useCallback(() => {
    setCardColor(null);
  }, [setCardColor]);

  const onCardColorChange = React.useCallback((color: string | null) => {
    setCardColor(color);
  }, [setCardColor]);
  
  const getFilteredTools = React.useCallback((category?: ToolCategory) => {
    let currentTools: Tool[] = allTools;
    
    if (selectedCategory === "Pinned") {
      currentTools = allTools.filter((tool) => pinnedTools.includes(tool.id));
    } else if (category) {
      currentTools = allTools.filter((tool) => tool.category === category);
    } else if (selectedCategory !== "All") {
      currentTools = allTools.filter(
        (tool) => tool.category === selectedCategory
      );
    }

    if (debouncedSearchTerm) {
      return currentTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          tool.description
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
      );
    }
    return currentTools;
  }, [allTools, debouncedSearchTerm, pinnedTools, selectedCategory]);
  
  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground">
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        cardColor={cardColor}
        onCardColorChange={onCardColorChange}
        onClearCardColor={onClearCardColor}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
      <div className="flex">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          pinnedCount={pinnedTools.length}
          isCollapsed={isSidebarCollapsed}
        />

        <main
          className={cn(
            "flex-1 p-6 transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          )}
        >
          {selectedCategory === "Pinned" ? (
            <>
              <CategoryHeader
                title="Pinned Tools"
                description="Your hand-picked tools for quick and easy access."
              />
              <ToolGrid
                tools={getFilteredTools()}
                pinnedTools={pinnedTools}
                onTogglePinned={togglePinned}
                bundle={bundle}
                onToggleBundle={toggleBundle}
                cardColor={cardColor}
              />
            </>
          ) : selectedCategory === "All" ? (
            <>
              {defaultCategories.map((category) => {
                const toolsForCategory = getFilteredTools(category);
                if (toolsForCategory.length === 0 && debouncedSearchTerm) return null;
                
                return (
                <div key={category} className="mb-12">
                  <CategoryHeader title={category} description={`A collection of tools for ${category.toLowerCase()}.`} />
                  <ToolGrid
                    tools={toolsForCategory}
                    pinnedTools={pinnedTools}
                    onTogglePinned={togglePinned}
                    bundle={bundle}
                    onToggleBundle={toggleBundle}
                    cardColor={cardColor}
                  />
                </div>
              )})}
            </>
          ) : (
            <>
              <CategoryHeader
                title={selectedCategory}
                description={`A collection of tools for ${selectedCategory.toLowerCase()}.`}
              />
              <ToolGrid
                tools={getFilteredTools()}
                pinnedTools={pinnedTools}
                onTogglePinned={togglePinned}
                bundle={bundle}
                onToggleBundle={toggleBundle}
                cardColor={cardColor}
              />
            </>
          )}
        </main>
      </div>
      <BundleBar bundle={bundle} onClear={clearBundle} tools={allTools} />
    </div>
  );
}
