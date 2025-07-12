
"use client";

import * as React from "react";
import {
  Bookmark,
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
  Mail,
  GraduationCap,
  GitBranch,
  ClipboardCheck,
  ListChecks,
  Languages,
  Shield,
  Server,
  Database,
  Map as MapIcon,
  Globe,
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

interface NavItemConfig {
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

const sidebarStructure: (NavItemConfig | { type: 'separator' })[] = [
    { id: "Saved", label: "Saved", icon: Bookmark },
    { id: "All", label: "All Tools", icon: LayoutGrid },
    { type: 'separator' },
    { id: "UI & UX", label: "UI & UX", icon: Palette, subCategories: ["UI Design Tools", "UI Kits & Templates", "Assets", "Prototyping & Testing", "Inspiration"], isCollapsible: true },
    { id: "Writing & Notes", label: "Writing & Notes", icon: PenSquare },
    { id: "Productivity Tools", label: "Productivity Tools", icon: Zap, subCategories: ["Task Management", "Time & Focus", "Mind & Notes", "Utilities", "Dev Task Tools"], isCollapsible: true },
    { id: "No-Code / Low-Code", label: "No-Code / Low-Code", icon: MousePointerClick, subCategories: ["Website Builders", "App Builders", "Backend & DB", "Automation", "Design Tools", "AI", "Forms", "Authentication", "Analytics", "Platforms"], isCollapsible: true },
    { id: "Educational Plan", label: "Educational Plan", icon: GraduationCap, subCategories: ["Coding & Development", "Developer Tools & APIs", "Cloud & Hosting", "Learning Platforms", "Design & Creativity", "Student Discounts", "Bonus Tools"], isCollapsible: true },
    { id: "Frameworks & Libraries", label: "Frameworks & Libraries", icon: Package, subCategories: ["Frontend", "Backend", "Fullstack", "Mobile", "Desktop", "Testing", "Build Tools", "AI / ML", "CLI / Dev Tools"], isCollapsible: true },
    { id: "Free Domains", label: "Free Domains", icon: Globe },
    { id: "Source Code Repos", label: "Source Code Repos", icon: GitBranch },
    { id: "Code Quality", label: "Code Quality", icon: ClipboardCheck },
    { id: "AI & ML", label: "AI & ML", icon: BrainCircuit, subCategories: ["Platforms & MLOps", "Models & APIs", "Data Science & Notebooks"], isCollapsible: true },
    { id: "APIs", label: "APIs", icon: Share2, subCategories: ["Development & Testing", "Data & Information", "Scraping & Automation", "PDF & Image Generation"], isCollapsible: true },
    { id: "Data Visualization on Maps", label: "Maps & Geo", icon: MapIcon },
    { id: "Major Cloud Providers", label: "Major Cloud Providers", icon: Cloud },
    { id: "Web Hosting", label: "Web Hosting", icon: Server },
    { id: "Storage and Media Processing", label: "Storage & Media", icon: Database, subCategories: ["File Storage & Backup", "Image & Video Processing", "Data & JSON Storage", "Package Repositories", "File Conversion", "Utilities"], isCollapsible: true },
    { id: "CDN and Protection", label: "CDN & Protection", icon: Shield, subCategories: ["CDN", "Security"], isCollapsible: true },
    { id: "Email", label: "Email", icon: Mail },
    { id: "Log Management", label: "Log Management", icon: ListChecks },
    { id: "Translation Management", label: "Translation Mgmt", icon: Languages },
];

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
        'subCategories' in item && item.subCategories?.includes(selectedSubCategory || '')
    );

    if (parentOfSelectedSub) {
      setOpenCollapsible(parentOfSelectedSub.id);
    } else {
      const isCollapsibleSelected = sidebarStructure.some(
        (item) => 'isCollapsible' in item && item.isCollapsible && item.id === selectedCategory
      );
      if (isCollapsibleSelected) {
        setOpenCollapsible(selectedCategory);
      } else {
        setOpenCollapsible(null);
      }
    }
  }, [selectedCategory, selectedSubCategory]);

  const handleCollapsibleClick = (id: string) => {
    onCategoryChange(id);
    if (openCollapsible === id) {
      setOpenCollapsible(null);
    } else {
      setOpenCollapsible(id);
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
            onOpenChange={() => handleCollapsibleClick(item.id)}
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
                >
                    {isParentActive && !selectedSubCategory && (
                        <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
                    )}
                    <Icon className={cn("h-5 w-5 mr-3", isParentActive ? "text-primary" : "text-muted-foreground")} />
                    <span className="truncate">{item.label}</span>
                    <ChevronRight className={cn("h-4 w-4 ml-auto transition-transform", isOpen && "rotate-90")} />
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
            "h-5 w-5 mr-3",
            isParentActive ? "text-primary" : "text-muted-foreground"
          )}
        />
        <span className="truncate">{item.label}</span>
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
