
"use client";

import * as React from "react";
import {
  Pin,
  LayoutGrid,
  Code,
  Palette,
  PenSquare,
  Zap,
  Wrench,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import type { ToolCategory } from "@/lib/types";
import { categories } from "@/data/tools";
import { Separator } from "../ui/separator";

const categoryIcons: Record<ToolCategory, React.ElementType> = {
  "Dev Utilities": Code,
  "Design & UI Tools": Palette,
  "Writing & Notes": PenSquare,
  "Productivity Tools": Zap,
  "Utility Tools": Wrench,
};

type NavItem = {
  id: "Pinned" | "All" | ToolCategory;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { id: "Pinned", label: "Pinned", icon: Pin },
  { id: "All", label: "All Tools", icon: LayoutGrid },
];

const categoryNavItems: NavItem[] = categories.map((cat) => ({
  id: cat,
  label: cat,
  icon: categoryIcons[cat] || Sparkles,
}));

interface SidebarProps {
  selectedCategory: "All" | "Pinned" | ToolCategory;
  onCategoryChange: (
    category: "All" | "Pinned" | ToolCategory
  ) => void;
  pinnedCount: number;
  isCollapsed: boolean;
}

export const Sidebar = React.memo(function Sidebar({
  selectedCategory,
  onCategoryChange,
  pinnedCount,
  isCollapsed,
}: SidebarProps) {
  const renderNavItem = (item: NavItem, isCategory: boolean = false) => {
    const Icon = item.icon;
    const isActive = selectedCategory === item.id;

    const count = item.id === "Pinned" ? pinnedCount : 0;

    if (isCollapsed) {
      return (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className="relative h-10 w-10 justify-center p-0"
              onClick={() => onCategoryChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
              {item.id === "Pinned" &&
                count > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[9px] font-bold"
                  >
                    {count}
                  </Badge>
                )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          "w-full justify-start h-10 relative",
          isActive && "bg-secondary font-semibold",
          isCategory && "text-muted-foreground font-normal"
        )}
        onClick={() => onCategoryChange(item.id)}
      >
        {isActive && (
          <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
        )}
        <Icon
          className={cn(
            "h-5 w-5",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        />
        <span className="truncate">{item.label}</span>
        {item.id === "Pinned" && count > 0 && (
          <Badge
            variant={isActive ? "default" : "secondary"}
            className="ml-auto"
          >
            {count}
          </Badge>
        )}
      </Button>
    );
  };

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
            {navItems.map((item) => renderNavItem(item))}
            {!isCollapsed && <Separator className="my-4" />}
            {categoryNavItems.map((item) => renderNavItem(item, true))}
          </nav>
        </TooltipProvider>
      </div>
    </aside>
  );
});
