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
import { Badge } from "@/components/ui/badge";

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
              "flex w-full flex-col gap-1",
              isCollapsed && "items-center"
            )}
          >
            {navCategories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = selectedCategory === category;

              if (isCollapsed) {
                return (
                  <Tooltip key={category}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="relative h-10 w-10 justify-center p-0"
                        onClick={() => onSelectCategory(category)}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{category}</span>
                        {category === "Favorites" && favoritesCount > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] font-medium"
                          >
                            {favoritesCount}
                          </Badge>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{category}</TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <Button
                  key={category}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10 relative",
                    isActive && "bg-secondary font-semibold"
                  )}
                  onClick={() => onSelectCategory(category)}
                >
                  {isActive && (
                    <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
                  )}
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  {category}
                  {category === "Favorites" && favoritesCount > 0 && (
                    <Badge
                      variant={isActive ? "default" : "secondary"}
                      className="ml-auto"
                    >
                      {favoritesCount}
                    </Badge>
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
