
"use client";

import * as React from "react";

import { categories as defaultCategories, tools as defaultTools } from "@/data/tools";
import { sidebarStructure } from "@/data/sidebar";
import type { Tool } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn, slugify } from "@/lib/utils";

import Header from "@/components/page/Header";
import Sidebar from "@/components/page/Sidebar";
import CategoryHeader from "@/components/page/CategoryHeader";
import ToolGrid from "@/components/page/ToolGrid";
import { ListView } from "@/components/page/ListView";
import type { NavItemConfig } from "@/components/page/Sidebar";

const INITIAL_SAVED_TOOLS: string[] = [];
type ViewMode = "grid" | "list";


const subCategoryMap = sidebarStructure.reduce((acc, item) => {
  if ('subCategories' in item && item.subCategories) {
    acc[item.id as string] = item.subCategories;
  }
  return acc;
}, {} as Record<string, string[]>);


export default function Home() {
  const [savedTools, setSavedTools] = useLocalStorage<string[]>(
    "saved-tools",
    INITIAL_SAVED_TOOLS
  );
  const [cardColor, setCardColor] = useLocalStorage<string | null>(
    "card-color",
    null
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [activeCategory, setActiveCategory] = React.useState<string>("All");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage<boolean>("sidebar-collapsed", false);
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

    const element = document.getElementById(slugify(scrollTo));
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
      setSelectedSubCategory(subCategoryToScroll || null);
      
      if (subCategoryToScroll) {
          // A short delay ensures the DOM has updated before we try to find the element
          setTimeout(() => setScrollTo(subCategoryToScroll), 50);
      } else if (category !== selectedCategory) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }, [selectedCategory]);

  // Scrollspy effect
  React.useEffect(() => {
    if (selectedCategory !== 'All' || viewMode !== 'grid') {
      setActiveCategory(selectedCategory);
      return;
    }
    // Set a default for when we switch back to 'All'
    setActiveCategory('All'); 

    const sections = defaultCategories
      .map(c => document.getElementById(slugify(c)))
      .filter(Boolean);

    if (sections.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryName = defaultCategories.find(c => slugify(c) === entry.target.id);
            if (categoryName) {
              setActiveCategory(categoryName);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Highlight when section is in the top 20% of the viewport
      }
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [selectedCategory, viewMode, allTools]);


  const toggleSaved = React.useCallback(
    (toolId: string) => {
      setSavedTools((prev) =>
        prev.includes(toolId)
          ? prev.filter((id) => id !== toolId)
          : [...prev, toolId]
      );
    },
    [setSavedTools]
  );

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, [setIsSidebarCollapsed]);

  const onClearCardColor = React.useCallback(() => {
    setCardColor(null);
  }, [setCardColor]);

  const onCardColorChange = React.useCallback((color: string | null) => {
    setCardColor(color);
  }, [setCardColor]);

  const onViewModeChange = React.useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);
  
  const searchedTools = React.useMemo(() => {
    const lowercasedTerm = debouncedSearchTerm.toLowerCase();
    if (!lowercasedTerm) return allTools;

    return allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(lowercasedTerm) ||
        tool.description.toLowerCase().includes(lowercasedTerm)
    );
  }, [allTools, debouncedSearchTerm]);

  const gridTools = React.useMemo(() => {
    if (selectedCategory === "Saved") {
      return searchedTools.filter((tool) => savedTools.includes(tool.id));
    }
    if (selectedCategory === "All") {
      return searchedTools;
    }
    return searchedTools.filter((tool) => tool.category === selectedCategory);
  }, [searchedTools, selectedCategory, savedTools]);

  const toolsByCategory = React.useMemo(() => {
    if (selectedCategory !== "All") return {};

    const categorizedTools: Record<string, Tool[]> = {};
    for (const tool of gridTools) {
      if (!categorizedTools[tool.category]) {
        categorizedTools[tool.category] = [];
      }
      categorizedTools[tool.category].push(tool);
    }
    return categorizedTools;
  }, [gridTools, selectedCategory]);


  const { pageTitle, pageDescription } = React.useMemo(() => {
    const categoryInfo = sidebarStructure.find(
      (item): item is NavItemConfig => 'id' in item && item.id === selectedCategory
    );

    if (selectedCategory === 'All') {
        return { pageTitle: "All Tools", pageDescription: "A comprehensive list of all available tools, sorted by category." };
    }
    if (selectedCategory === 'Saved') {
        return { pageTitle: "Saved Tools", pageDescription: "Your hand-picked tools for quick and easy access." };
    }
    if (categoryInfo) {
        const description = categoryInfo.subCategories
            ? `A curated collection of essential tools for ${categoryInfo.label}.`
            : `A collection of tools for ${categoryInfo.label.toLowerCase()}.`;
        return { pageTitle: categoryInfo.label, pageDescription: description };
    }
    return { pageTitle: "Tools", pageDescription: "" };
  }, [selectedCategory]);
  
  const renderSubcategoryGrid = (subcategories: string[]) => (
    <>
      <CategoryHeader
        title={pageTitle}
        description={pageDescription}
      />
      {subcategories.map((subCategory) => {
         const toolsForSubCategory = gridTools.filter(t => t.subcategory === subCategory);

        if (toolsForSubCategory.length === 0) return null;
        
        return (
          <div key={subCategory} id={slugify(subCategory)} className="mb-12 scroll-mt-24">
            <h2 className="mb-6 border-b pb-2 text-2xl font-semibold tracking-tight">
              {subCategory}
            </h2>
            <ToolGrid
              tools={toolsForSubCategory}
              savedTools={savedTools}
              onToggleSaved={toggleSaved}
              cardColor={cardColor}
            />
          </div>
        );
      })}
    </>
  );

  const subcategoriesForSelected = subCategoryMap[selectedCategory as keyof typeof subCategoryMap];

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
            selectedCategory={activeCategory}
            selectedSubCategory={selectedSubCategory}
            onCategoryChange={handleCategoryChange}
            savedCount={savedTools.length}
            isCollapsed={isSidebarCollapsed}
            onToggleSidebar={toggleSidebar}
          />

          <main className={cn(
            "flex-1 p-6 transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          )}>
            {selectedCategory === "All" ? (
              <>
                {defaultCategories.map((category) => {
                  const toolsForCategory = toolsByCategory[category];
                  if (!toolsForCategory || toolsForCategory.length === 0) return null;
                  
                  return (
                    <div key={category} id={slugify(category)} className="mb-12 scroll-mt-24">
                      <CategoryHeader title={category} description={`A collection of tools for ${category.toLowerCase()}.`} />
                      <ToolGrid
                        tools={toolsForCategory}
                        savedTools={savedTools}
                        onToggleSaved={toggleSaved}
                        cardColor={cardColor}
                      />
                    </div>
                  )
                })}
              </>
            ) : subcategoriesForSelected ? (
              renderSubcategoryGrid(subcategoriesForSelected)
            ) : (
              <>
                <CategoryHeader
                  title={pageTitle}
                  description={pageDescription}
                />
                <ToolGrid
                  tools={gridTools}
                  savedTools={savedTools}
                  onToggleSaved={toggleSaved}
                  cardColor={cardColor}
                  isSavedSection={selectedCategory === "Saved"}
                />
              </>
            )}
          </main>
        </div>
      ) : (
        <ListView
          tools={searchedTools}
          categories={defaultCategories}
          savedTools={savedTools}
          onToggleSaved={toggleSaved}
        />
      )}
    </div>
  );
}
