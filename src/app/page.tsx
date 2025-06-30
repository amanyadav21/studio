
"use client";

import * as React from "react";
import {
  Search,
  Star,
  Code2,
  Calculator,
  BrainCircuit,
  PenTool,
  BookOpen,
  LayoutGrid,
} from "lucide-react";

import { tools, categories } from "@/data/tools";
import type { Tool, Category } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { ToolCard } from "@/components/tool-card";
import { BundleBar } from "@/components/bundle-bar";

const categoryIcons: Record<Category, React.ElementType> = {
  All: LayoutGrid,
  "Dev Utilities": Code2,
  Formatters: PenTool,
  Calculators: Calculator,
  "Mind Tools": BrainCircuit,
  Favorites: Star,
};

export default function Home() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("All");
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
          tool.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    return currentTools;
  }, [debouncedSearchTerm, selectedCategory, favorites]);

  const navCategories: Category[] = ["All", ...categories, "Favorites"];

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <AppLogo className="h-6 w-6" />
              <span className="inline-block font-bold">LocalOpen</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tools..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="container flex flex-1">
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 py-6 pr-6 hidden md:block">
          <nav className="flex flex-col gap-2">
            {navCategories.map((category) => {
              const Icon = categoryIcons[category];
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category}
                  {category === "Favorites" && (
                    <span className="ml-auto text-xs">{favorites.length}</span>
                  )}
                </Button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {selectedCategory}
            </h1>
            <p className="text-muted-foreground mt-1">
              {selectedCategory === "Favorites"
                ? "Your favorite tools for quick access."
                : `Browse all tools in the ${selectedCategory} category.`}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={toggleFavorite}
                isInBundle={bundle.includes(tool.id)}
                onToggleBundle={toggleBundle}
              />
            ))}
          </div>
          {filteredTools.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Tools Found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search or selecting a different category.
                </p>
            </div>
          )}
        </main>
      </div>
      <BundleBar bundle={bundle} onClear={clearBundle} tools={tools} />
    </div>
  );
}
