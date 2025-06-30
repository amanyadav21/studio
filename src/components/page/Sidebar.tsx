"use client";

import * as React from "react";
import {
  Star,
  Code2,
  Calculator,
  BrainCircuit,
  PenTool,
  LayoutGrid,
  PanelLeftClose,
  PanelRightClose,
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
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({
  navCategories,
  selectedCategory,
  onSelectCategory,
  favoritesCount,
  isCollapsed,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] hidden flex-col justify-between border-r py-6 md:flex",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20 items-center px-2" : "w-64 px-4"
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
                variant={selectedCategory === category ? "secondary" : "ghost"}
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

      <div className="w-full">
        <Button
          onClick={onToggle}
          variant="outline"
          className={cn("w-full", isCollapsed && "h-10 w-10 p-0")}
        >
          {isCollapsed ? (
            <PanelRightClose className="h-5 w-5" />
          ) : (
            <>
              <PanelLeftClose className="mr-2 h-4 w-4" />
              Collapse
            </>
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
    </aside>
  );
}
