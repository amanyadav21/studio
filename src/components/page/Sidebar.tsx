
"use client";

import * as React from "react";
import {
  Pin,
  LayoutGrid,
  Palette,
  PenSquare,
  Zap,
  Package,
  ChevronRight,
  PanelLeftClose,
  PanelRightClose,
  BrainCircuit,
  Cloud,
  Share2,
  MousePointerClick,
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
import { frameworkSubCategories, uiUxSubCategories, productivitySubCategories, noCodeSubCategories } from "@/data/tools";
import { Separator } from "../ui/separator";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface NavItemConfig {
    id: ToolCategory | "Pinned" | "All";
    label: string;
    icon: React.ElementType;
    subCategories?: string[];
    isCollapsible?: boolean;
}

interface SidebarProps {
  selectedCategory: string;
  selectedSubCategory: string | null;
  onCategoryChange: (category: string, subCategoryToScroll?: string) => void;
  pinnedCount: number;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

const sidebarStructure: (NavItemConfig | { type: 'separator' })[] = [
    { id: "Pinned", label: "Pinned", icon: Pin },
    { id: "All", label: "All Tools", icon: LayoutGrid },
    { type: 'separator' },
    { id: "UI & UX", label: "UI & UX", icon: Palette, subCategories: uiUxSubCategories, isCollapsible: true },
    { id: "Writing & Notes", label: "Writing & Notes", icon: PenSquare },
    { id: "Productivity Tools", label: "Productivity Tools", icon: Zap, subCategories: productivitySubCategories, isCollapsible: true },
    { id: "No-Code / Low-Code", label: "No-Code / Low-Code", icon: MousePointerClick, subCategories: noCodeSubCategories, isCollapsible: true },
    { id: "AI & ML", label: "AI & ML", icon: BrainCircuit },
    { id: "Frameworks & Libraries", label: "Frameworks & Libraries", icon: Package, subCategories: frameworkSubCategories, isCollapsible: true },
    { id: "APIs", label: "APIs", icon: Share2 },
    { id: "Cloud Provider", label: "Cloud Provider", icon: Cloud },
];

export const Sidebar = React.memo(function Sidebar({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  pinnedCount,
  isCollapsed,
  onToggleSidebar,
}: SidebarProps) {
  const [openCollapsibles, setOpenCollapsibles] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const collapsibleCategory = sidebarStructure.find(
      (item) => 'isCollapsible' in item && item.isCollapsible && item.id === selectedCategory
    );
    if (collapsibleCategory && 'id' in collapsibleCategory) {
      setOpenCollapsibles(prev => ({ ...prev, [collapsibleCategory.id]: true }));
    }
  }, [selectedCategory]);

  const handleToggleCollapsible = (id: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNavItem = (item: NavItemConfig) => {
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
  
  const renderCollapsibleCategory = (
    item: NavItemConfig
  ) => {
    const Icon = item.icon;
    const isActive = selectedCategory === item.id;
    const isOpen = openCollapsibles[item.id] || false;

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
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      );
    }

    return (
       <Collapsible key={item.id} open={isOpen} onOpenChange={() => handleToggleCollapsible(item.id)} className="w-full">
        <div className="relative flex w-full items-center">
            <Button
                variant="ghost"
                className={cn(
                "w-full justify-start h-10 relative text-muted-foreground font-normal",
                isActive && "bg-secondary font-semibold text-secondary-foreground"
                )}
                onClick={() => onCategoryChange(item.id)}
            >
                {isActive && !selectedSubCategory && (
                  <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
                )}
                <Icon
                  className={cn(
                      "h-5 w-5 mr-3",
                      isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span className="truncate pr-8">{item.label}</span>
            </Button>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                    <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
                    <span className="sr-only">Toggle Subcategories</span>
                </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pl-8 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
          <div className="flex flex-col gap-1 mt-1">
            {item.subCategories?.map(subCat => {
              const isSubActive = selectedSubCategory === subCat && isActive;
              return (
                <Button
                  key={subCat}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-9 relative text-muted-foreground font-normal",
                    isSubActive && "font-semibold text-primary"
                  )}
                  onClick={() => onCategoryChange(item.id, subCat)}
                >
                  {isSubActive && (
                    <div className="absolute left-0 top-1.5 h-6 w-1 rounded-r-full bg-primary" />
                  )}
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
            
            {sidebarStructure.map((item, index) => {
              if ('type' in item && item.type === 'separator') {
                return <Separator key={`sep-${index}`} className="my-4" />;
              }
              const navItem = item as NavItemConfig;
              if (navItem.isCollapsible) {
                return renderCollapsibleCategory(navItem);
              }
              return renderNavItem(navItem);
            })}
          </nav>
        </div>
      </TooltipProvider>
    </aside>
  );
});
