
"use client";

import * as React from "react";

import { tools, categories } from "@/data/tools";
import type { Category } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

import { BundleBar } from "@/components/bundle-bar";
import { Header } from "@/components/page/Header";
import { Sidebar } from "@/components/page/Sidebar";
import { CategoryHeader } from "@/components/page/CategoryHeader";
import { ToolGrid } from "@/components/page/ToolGrid";

export default function Home() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>("All");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [bundle, setBundle] = React.useState<string[]>([]);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

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

  const filteredTools = React.useMemo(() => {
    let currentTools = tools;

    if (selectedCategory === "Favorites") {
      currentTools = tools.filter((tool) => favorites.includes(tool.id));
    } else if (selectedCategory !== "All") {
      currentTools = tools.filter(
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
  }, [debouncedSearchTerm, selectedCategory, favorites]);

  const navCategories: Category[] = ["All", ...categories, "Favorites"];

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground">
      <Header searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <div className="container flex flex-1">
        <Sidebar
          navCategories={navCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          favoritesCount={favorites.length}
        />

        <main className="flex-1 py-6">
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
      <BundleBar bundle={bundle} onClear={clearBundle} tools={tools} />
    </div>
  );
}
