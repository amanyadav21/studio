
"use client";

import * as React from "react";
import {
  Star,
  Code2,
  Calculator,
  BrainCircuit,
  PenTool,
  LayoutGrid,
} from "lucide-react";
import type { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";

const categoryIcons: Record<Category, React.ElementType> = {
  All: LayoutGrid,
  "Dev Utilities": Code2,
  Formatters: PenTool,
  Calculators: Calculator,
  "Mind Tools": BrainCircuit,
  Favorites: Star,
};

interface SidebarProps {
  navCategories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  favoritesCount: number;
}

export function Sidebar({
  navCategories,
  selectedCategory,
  onSelectCategory,
  favoritesCount,
}: SidebarProps) {
  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 py-6 pr-6 hidden md:block">
      <nav className="flex flex-col gap-2">
        {navCategories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => onSelectCategory(category)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {category}
              {category === "Favorites" && (
                <span className="ml-auto text-xs">{favoritesCount}</span>
              )}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
