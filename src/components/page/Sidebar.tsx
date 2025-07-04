
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
  Package,
  ChevronRight,
  PanelLeftClose,
  PanelRightClose,
  BrainCircuit,
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
import { categories, frameworkSubCategories } from "@/data/tools";
import { Separator } from "../ui/separator";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const categoryIcons: Record<ToolCategory, React.ElementType> = {
  "Dev Utilities": Code,
  "Design & UI Tools": Palette,
  "Writing & Notes": PenSquare,
  "Productivity Tools": Zap,
  "Utility Tools": Wrench,
  "Frameworks & Libraries": Package,
  "AI & ML": BrainCircuit,
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

const categoryNavItems: NavItem[] = categories
  .filter(c => c !== "Frameworks & Libraries")
  .map((cat) => ({
    id: cat,
    label: cat,
    icon: categoryIcons[cat] || Sparkles,
}));

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string, subCategoryToScroll?: string) => void;
  pinnedCount: number;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Sidebar = React.memo(function Sidebar({
  selectedCategory,
  onCategoryChange,
  pinnedCount,
  isCollapsed,
  onToggleSidebar,
}: SidebarProps) {
  const frameworkParentCategory = "Frameworks & Libraries";
  const [isFrameworksOpen, setIsFrameworksOpen] = React.useState(false);
  const isFrameworksActive = selectedCategory === frameworkParentCategory;

  React.useEffect(() => {
    // Open the collapsible if the user selects the parent category.
    if (isFrameworksActive) {
        setIsFrameworksOpen(true);
    }
  }, [isFrameworksActive]);

  const renderNavItem = (item: NavItem) => {
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
              {item.id === "Pinned" && count > 0 && (
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
          item.id !== "Pinned" && item.id !== "All" && "text-muted-foreground font-normal"
        )}
        onClick={() => onCategoryChange(item.id)}
      >
        {isActive && (
          <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
        )}
        <Icon
          className={cn(
            "h-5 w-5 mr-3",
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
  
  const renderFrameworks = () => {
    if (isCollapsed) {
       return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isFrameworksActive ? "secondary" : "ghost"}
              className="relative h-10 w-10 justify-center p-0"
              onClick={() => onCategoryChange(frameworkParentCategory)}
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">{frameworkParentCategory}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{frameworkParentCategory}</TooltipContent>
        </Tooltip>
      );
    }

    return (
       <Collapsible open={isFrameworksOpen} onOpenChange={setIsFrameworksOpen} className="w-full">
        <div className="relative flex w-full items-center">
            <Button
                variant="ghost"
                className={cn(
                "w-full justify-start h-10 relative text-muted-foreground font-normal",
                isFrameworksActive && "bg-secondary font-semibold text-secondary-foreground"
                )}
                onClick={() => onCategoryChange(frameworkParentCategory)}
            >
                {isFrameworksActive && (
                <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
                )}
                <Package
                className={cn(
                    "h-5 w-5 mr-3",
                    isFrameworksActive ? "text-primary" : "text-muted-foreground"
                )}
                />
                <span className="truncate pr-8">{frameworkParentCategory}</span>
            </Button>
            <CollapsibleTrigger className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground">
                <ChevronRight className={cn("h-4 w-4 transition-transform", isFrameworksOpen && "rotate-90")} />
                <span className="sr-only">Toggle Subcategories</span>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pl-8 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
          <div className="flex flex-col gap-1 mt-1">
            {frameworkSubCategories.map(subCat => {
              return (
                <Button
                  key={subCat}
                  variant="ghost"
                  className="w-full justify-start h-9 relative text-muted-foreground font-normal"
                  onClick={() => onCategoryChange(frameworkParentCategory, subCat)}
                >
                  {subCat}
                </Button>
              )
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] hidden flex-col border-r bg-background md:flex",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <TooltipProvider delayDuration={0}>
        <div
          className={cn(
            "flex-1 overflow-y-auto py-4",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
          <nav
            className={cn(
              "flex w-full flex-col gap-1",
              isCollapsed && "items-center"
            )}
          >
            <div className={cn("mb-4 flex w-full", isCollapsed ? "justify-center" : "justify-end")}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        onClick={onToggleSidebar}
                        variant="ghost"
                        size="icon"
                        >
                        {isCollapsed ? (
                            <PanelRightClose className="h-5 w-5" />
                        ) : (
                            <PanelLeftClose className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle sidebar</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            {navItems.map((item) => renderNavItem(item))}
            {!isCollapsed && <Separator className="my-4" />}
            {categoryNavItems.map((item) => renderNavItem(item))}
            {renderFrameworks()}
          </nav>
        </div>
      </TooltipProvider>
    </aside>
  );
});
