
"use client";

import * as React from "react";
import {
  Bookmark,
  ChevronRight,
  PanelLeftClose,
  PanelRightClose,
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
import { Separator } from "../ui/separator";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarStructure } from "@/data/sidebar";


export interface NavItemConfig {
    id: ToolCategory | "Saved" | "All";
    label: string;
    icon: React.ElementType;
    subCategories?: string[];
    isCollapsible?: boolean;
}

interface SidebarProps {
  selectedCategory: string;
  selectedSubCategory: string | null;
  onCategoryChange: (category: string, subCategoryToScroll?: string) => void;
  savedCount: number;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}



function Sidebar({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  savedCount,
  isCollapsed,
  onToggleSidebar,
}: SidebarProps) {
  const [openCollapsible, setOpenCollapsible] = React.useState<string | null>(null);

  React.useEffect(() => {
    const parentOfSelectedSub = sidebarStructure.find(
      (item): item is NavItemConfig =>
        'subCategories' in item && Array.isArray(item.subCategories) && item.subCategories.includes(selectedSubCategory || '')
    );

    if (parentOfSelectedSub) {
      setOpenCollapsible(parentOfSelectedSub.id);
    } else {
      const isCollapsibleSelected = sidebarStructure.some(
        (item) => 'isCollapsible' in item && item.isCollapsible && (item as NavItemConfig).id === selectedCategory
      );
      if (isCollapsibleSelected) {
        setOpenCollapsible(selectedCategory);
      } else {
        setOpenCollapsible(null);
      }
    }
  }, [selectedCategory, selectedSubCategory]);

  const handleCollapsibleClick = (id: string) => {
    // Only toggle if we are clicking the main category header
    if (openCollapsible === id) {
      setOpenCollapsible(null);
    } else {
      setOpenCollapsible(id);
      onCategoryChange(id);
    }
  };


  const renderItem = (item: NavItemConfig) => {
    const Icon = item.icon;
    const isParentActive = selectedCategory === item.id;
    const isOpen = openCollapsible === item.id;

    // Collapsed View (Icons Only)
    if (isCollapsed) {
      return (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>
            <Button
              variant={isParentActive ? "secondary" : "ghost"}
              className="relative h-10 w-10 justify-center p-0"
              onClick={() => onCategoryChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
              {item.id === "Saved" && savedCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[9px] font-bold"
                  >
                    {savedCount}
                  </Badge>
                )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      );
    }

    // Expanded View (Full Text and Submenus)
    if (item.isCollapsible) {
      return (
        <Collapsible
            key={item.id}
            open={isOpen}
            onOpenChange={(isOpen) => {
              if (isOpen) {
                setOpenCollapsible(item.id);
              } else if (openCollapsible === item.id) {
                setOpenCollapsible(null);
              }
            }}
            className="w-full"
        >
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start h-10 relative",
                        isParentActive && !selectedSubCategory && "bg-secondary font-semibold",
                        "text-muted-foreground font-normal"
                    )}
                    onClick={() => handleCollapsibleClick(item.id)}
                >
                    {isParentActive && !selectedSubCategory && (
                        <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
                    )}
                    <Icon className={cn("h-5 w-5 mr-3 flex-shrink-0", isParentActive ? "text-primary" : "text-muted-foreground")} />
                    <span className="truncate flex-grow text-left">{item.label}</span>
                    <ChevronRight className={cn("h-4 w-4 ml-auto transition-transform flex-shrink-0", isOpen && "rotate-90")} />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                <div className="flex flex-col gap-1 mt-1">
                    {item.subCategories?.map(subCat => {
                        const isSubActive = isParentActive && selectedSubCategory === subCat;
                        return (
                            <Button
                                key={subCat}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start h-9 relative font-normal",
                                    isSubActive ? "font-semibold text-primary" : "text-muted-foreground"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent collapsible from closing
                                  onCategoryChange(item.id, subCat);
                                }}
                            >
                                {isSubActive && (
                                    <div className="absolute left-0 top-1.5 h-6 w-1 rounded-r-full bg-primary" />
                                )}
                                <span className="truncate">{subCat}</span>
                            </Button>
                        )
                    })}
                </div>
            </CollapsibleContent>
        </Collapsible>
      )
    }

    // Regular Non-Collapsible Item
    return (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          "w-full justify-start h-10 relative",
          isParentActive && "bg-secondary font-semibold",
          item.id !== "Saved" && item.id !== "All" && "text-muted-foreground font-normal"
        )}
        onClick={() => onCategoryChange(item.id)}
      >
        {isParentActive && (
          <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
        )}
        <Icon
          className={cn(
            "h-5 w-5 mr-3 flex-shrink-0",
            isParentActive ? "text-primary" : "text-muted-foreground"
          )}
        />
        <span className="truncate flex-grow text-left">{item.label}</span>
        {item.id === "Saved" && savedCount > 0 && (
          <Badge
            variant={isParentActive ? "default" : "secondary"}
            className="ml-auto"
          >
            {savedCount}
          </Badge>
        )}
      </Button>
    );
  };
  
  return (
    <aside
      className={cn(
        "fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] hidden flex-col border-r bg-background md:flex",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <TooltipProvider delayDuration={0}>
        <div className={cn("flex w-full p-4", isCollapsed ? "justify-center" : "justify-end")}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onToggleSidebar} variant="ghost" size="icon">
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
        <ScrollArea className="flex-1">
          <div className={cn("flex-1 py-4", isCollapsed ? "px-2" : "px-4")}>
            <nav
              className={cn(
                "flex w-full flex-col gap-1",
                isCollapsed && "items-center"
              )}
            >
              {sidebarStructure.map((item, index) => {
                if ('type' in item && item.type === 'separator') {
                  return <Separator key={`sep-${index}`} className="my-4" />;
                }
                return renderItem(item as NavItemConfig);
              })}
            </nav>
          </div>
        </ScrollArea>
      </TooltipProvider>
    </aside>
  );
}

export default React.memo(Sidebar);
