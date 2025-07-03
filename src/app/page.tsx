
"use client";

import * as React from "react";

import { categories as defaultCategories, tools as defaultTools, frameworkSubCategories } from "@/data/tools";
import type { Tool, ToolCategory } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";

import { BundleBar } from "@/components/bundle-bar";
import { Header } from "@/components/page/Header";
import { Sidebar } from "@/components/page/Sidebar";
import { CategoryHeader } from "@/components/page/CategoryHeader";
import { ToolGrid } from "@/components/page/ToolGrid";
import { categories } from "@/data/tools";

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
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
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
  
  const filteredTools = React.useMemo(() => {
    let currentTools: Tool[] = allTools;

    if (selectedCategory === "Pinned") {
      currentTools = allTools.filter((tool) => pinnedTools.includes(tool.id));
    } else if (frameworkSubCategories.includes(selectedCategory as any)) {
      currentTools = allTools.filter(
        (tool) => tool.subcategory === selectedCategory
      );
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

  const { pageTitle, pageDescription } = React.useMemo(() => {
    let title = selectedCategory;
    let description = `A collection of tools for ${selectedCategory.toLowerCase()}.`;

    if (selectedCategory === 'All') {
        title = "All Tools";
        description = "A comprehensive list of all available tools, sorted by category.";
    } else if (selectedCategory === 'Pinned') {
        title = "Pinned Tools";
        description = "Your hand-picked tools for quick and easy access.";
    } else if (frameworkSubCategories.includes(selectedCategory as any)) {
        title = `${selectedCategory} Tools`;
        description = `A collection of ${selectedCategory.toLowerCase()} frameworks and libraries.`;
    } else if (categories.includes(title as any)) {
      description = `A collection of tools for ${selectedCategory.toLowerCase()}.`;
    }

    return { pageTitle: title, pageDescription: description };
  }, [selectedCategory]);
  
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
          {selectedCategory === "All" ? (
            <>
              {defaultCategories.map((category) => {
                const toolsForCategory = allTools.filter(t => {
                  if (t.category !== category) return false;
                  if (!debouncedSearchTerm) return true;
                  const nameMatch = t.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
                  const descMatch = t.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
                  return nameMatch || descMatch;
                });

                if (toolsForCategory.length === 0) return null;
                
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
          ) : selectedCategory === "Frameworks & Libraries" ? (
            <>
              <CategoryHeader
                title={pageTitle}
                description={pageDescription}
              />
              {frameworkSubCategories.map((subCategory) => {
                const toolsForSubCategory = allTools.filter(t => {
                  if (t.subcategory !== subCategory) return false;
                  if (!debouncedSearchTerm) return true;
        
                  const nameMatch = t.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
                  const descMatch = t.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
                  return nameMatch || descMatch;
                });

                if (toolsForSubCategory.length === 0) return null;
                
                return (
                  <div key={subCategory} className="mb-12">
                    <h2 className="mb-6 border-b pb-2 text-2xl font-semibold tracking-tight">
                      {subCategory}
                    </h2>
                    <ToolGrid
                      tools={toolsForSubCategory}
                      pinnedTools={pinnedTools}
                      onTogglePinned={togglePinned}
                      bundle={bundle}
                      onToggleBundle={toggleBundle}
                      cardColor={cardColor}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <CategoryHeader
                title={pageTitle}
                description={pageDescription}
              />
              <ToolGrid
                tools={filteredTools}
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
