
"use client";

import * as React from "react";

import { categories as defaultCategories, tools as defaultTools, frameworkSubCategories } from "@/data/tools";
import type { Tool } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";

import { BundleBar } from "@/components/bundle-bar";
import { Header } from "@/components/page/Header";
import { Sidebar } from "@/components/page/Sidebar";
import { CategoryHeader } from "@/components/page/CategoryHeader";
import { ToolGrid } from "@/components/page/ToolGrid";
import { categories } from "@/data/tools";
import { ListView } from "@/components/page/ListView";

const INITIAL_PINNED_TOOLS: string[] = [];
type ViewMode = "grid" | "list";

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
  const [scrollTo, setScrollTo] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('view-mode', 'grid');

  const allTools = defaultTools;

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  React.useEffect(() => {
    if (!scrollTo) return;

    const element = document.getElementById(scrollTo);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
    setScrollTo(null); // Reset after scrolling
  }, [scrollTo]);

  const handleCategoryChange = React.useCallback((category: string, subCategoryToScroll?: string) => {
      // If clicking the same category again, scroll to top
      if (category === selectedCategory && !subCategoryToScroll) {
           window.scrollTo({ top: 0, behavior: 'smooth' });
           return;
      }

      setSelectedCategory(category);
      
      if (subCategoryToScroll) {
          // A short delay ensures the DOM has updated before we try to find the element
          setTimeout(() => setScrollTo(subCategoryToScroll), 50);
      } else if (category !== selectedCategory) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }, [selectedCategory]);


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

  const onViewModeChange = React.useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);
  
  const filteredTools = React.useMemo(() => {
    const lowercasedTerm = debouncedSearchTerm.toLowerCase();

    let toolsInCategory;
    if (selectedCategory === "Pinned") {
      toolsInCategory = allTools.filter((tool) => pinnedTools.includes(tool.id));
    } else if (selectedCategory === "All") {
      toolsInCategory = allTools;
    } else {
      toolsInCategory = allTools.filter((tool) => tool.category === selectedCategory);
    }

    if (debouncedSearchTerm) {
      return toolsInCategory.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowercasedTerm) ||
          tool.description.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    return toolsInCategory;
  }, [allTools, debouncedSearchTerm, pinnedTools, selectedCategory]);

  const { pageTitle, pageDescription } = React.useMemo(() => {
    let title = selectedCategory;
    let description = "";

    if (selectedCategory === 'All') {
        title = "All Tools";
        description = "A comprehensive list of all available tools, sorted by category.";
    } else if (selectedCategory === 'Pinned') {
        title = "Pinned Tools";
        description = "Your hand-picked tools for quick and easy access.";
    } else if (selectedCategory === "Frameworks & Libraries") {
        title = "Frameworks & Libraries";
        description = "A curated collection of essential frameworks and libraries.";
    } else if (categories.some(c => c === title)) {
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
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />
      {viewMode === 'grid' ? (
        <div className="flex">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            pinnedCount={pinnedTools.length}
            isCollapsed={isSidebarCollapsed}
            onToggleSidebar={toggleSidebar}
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
                  const toolsForCategory = filteredTools.filter(t => t.category === category);
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
                  )
                })}
              </>
            ) : selectedCategory === "Frameworks & Libraries" ? (
              <>
                <CategoryHeader
                  title={pageTitle}
                  description={pageDescription}
                />
                {frameworkSubCategories.map((subCategory) => {
                   const toolsForSubCategory = filteredTools.filter(t => t.subcategory === subCategory);

                  if (toolsForSubCategory.length === 0) return null;
                  
                  return (
                    <div key={subCategory} id={subCategory} className="mb-12 scroll-mt-24">
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
      ) : (
        <ListView tools={allTools} categories={defaultCategories} />
      )}
      {viewMode === 'grid' && <BundleBar bundle={bundle} onClear={clearBundle} tools={allTools} />}
    </div>
  );
}
