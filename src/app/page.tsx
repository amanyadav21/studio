"use client";

import * as React from "react";

import { tools as defaultTools, categories } from "@/data/tools";
import type { Category, Tool } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

import { BundleBar } from "@/components/bundle-bar";
import { Header } from "@/components/page/Header";
import { Sidebar } from "@/components/page/Sidebar";
import { CategoryHeader } from "@/components/page/CategoryHeader";
import { ToolGrid } from "@/components/page/ToolGrid";

export default function Home() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [customTools, setCustomTools] = useLocalStorage<Tool[]>(
    "custom-tools",
    []
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>("All");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [bundle, setBundle] = React.useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const { toast } = useToast();

  const allTools = React.useMemo(
    () => [...defaultTools, ...customTools],
    [customTools]
  );

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const addTool = (newToolData: Omit<Tool, "id" | "category">) => {
    const newTool: Tool = {
      ...newToolData,
      id: `custom-${new Date().getTime()}`,
      category: "Dev Utilities", // Assign a default category
    };
    setCustomTools((prev) => [...prev, newTool]);
    toast({
      title: "Tool Added!",
      description: `${newTool.name} has been added to your collection.`,
    });
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const toggleBundle = (toolId: string) => {
    setBundle((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const clearBundle = () => {
    setBundle([]);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const filteredTools = React.useMemo(() => {
    let currentTools = allTools;

    if (selectedCategory === "Favorites") {
      currentTools = allTools.filter((tool) => favorites.includes(tool.id));
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
  }, [debouncedSearchTerm, selectedCategory, favorites, allTools]);

  const navCategories: Category[] = ["All", ...categories, "Favorites"];

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground">
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onAddTool={addTool}
      />
      <div className="container flex flex-1">
        <Sidebar
          navCategories={navCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          favoritesCount={favorites.length}
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
        />

        <main className="flex-1 py-6 pl-6">
          <CategoryHeader selectedCategory={selectedCategory} />
          <ToolGrid
            tools={filteredTools}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            bundle={bundle}
            onToggleBundle={toggleBundle}
          />
        </main>
      </div>
      <BundleBar bundle={bundle} onClear={clearBundle} tools={allTools} />
    </div>
  );
}
