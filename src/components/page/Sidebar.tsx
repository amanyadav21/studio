"use client";

import * as React from "react";
import {
  Star,
  Code2,
  LayoutGrid,
  Paintbrush,
  FilePenLine,
  Timer,
  Wrench,
} from "lucide-react";
import type { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const categoryIcons: Record<Category, React.ElementType> = {
  All: LayoutGrid,
  "Dev Utilities": Code2,
  "Design & UI Tools": Paintbrush,
  "Writing & Notes": FilePenLine,
  "Productivity Tools": Timer,
  "Utility Tools": Wrench,
  Favorites: Star,
};

interface SidebarProps {
  navCategories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  favoritesCount: number;
  isCollapsed: boolean;
}

export const Sidebar = React.memo(function Sidebar({
  navCategories,
  selectedCategory,
  onSelectCategory,
  favoritesCount,
  isCollapsed,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] hidden flex-col border-r bg-background md:flex",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex-1 overflow-y-auto py-6",
          isCollapsed ? "px-2" : "px-4"
        )}
      >
        <TooltipProvider delayDuration={0}>
          <nav
            className={cn(
              "flex w-full flex-col gap-2",
              isCollapsed && "items-center"
            )}
          >
            {navCategories.map((category) => {
              const Icon = categoryIcons[category];
              if (isCollapsed) {
                return (
                  <Tooltip key={category}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={
                          selectedCategory === category ? "secondary" : "ghost"
                        }
                        className="h-10 w-10 justify-center p-0"
                        onClick={() => onSelectCategory(category)}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{category}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {category}
                      {category === "Favorites" && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {favoritesCount}
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              }
              return (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
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
        </TooltipProvider>
      </div>
    </aside>
  );
});
