
"use client";

import { ChevronLeft, LayoutGrid, LayoutPanelLeft } from "lucide-react";
import * as React from "react";
import Link from "next/link";

import { AppLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Tool } from "@/lib/types";

interface ToolHeaderProps {
  viewMode: "single" | "parallel";
  onViewModeChange: (mode: "single" | "parallel") => void;
  bundledTools: Tool[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const ToolHeader = React.memo(function ToolHeader({
  viewMode,
  onViewModeChange,
  bundledTools,
  activeTab,
  onTabChange,
}: ToolHeaderProps) {
  const toolCount = bundledTools.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-6 relative">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <AppLogo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Coderkart</span>
          </Link>
        </div>

        {toolCount > 1 && viewMode === 'single' && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <Tabs value={activeTab} onValueChange={onTabChange} className="hidden lg:block">
                <TabsList>
                  {bundledTools.map((tool) => (
                    <TabsTrigger key={tool.id} value={tool.id}>
                      {tool.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
          </div>
        )}

        <div className="flex flex-shrink-0 items-center gap-2">
          {toolCount > 1 && (
            <TooltipProvider>
              <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "single" ? "secondary" : "ghost"}
                      size="sm"
                      className="px-2"
                      onClick={() => onViewModeChange("single")}
                      aria-label="Single View"
                    >
                      <LayoutPanelLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Single View</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "parallel" ? "secondary" : "ghost"}
                      size="sm"
                      className="px-2"
                      onClick={() => onViewModeChange("parallel")}
                      aria-label="Parallel View"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Parallel View</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          )}
          <ThemeToggle />
        </div>
      </div>

       {/* Responsive Tabs for smaller screens */}
       {toolCount > 1 && viewMode === 'single' && (
          <div className="container -mt-2 border-t pt-2 lg:hidden">
            <Tabs value={activeTab} onValueChange={onTabChange}>
                <TabsList className="w-full h-auto">
                    <div className="w-full overflow-x-auto p-1">
                        <div className="flex justify-start gap-1">
                            {bundledTools.map((tool) => (
                                <TabsTrigger key={tool.id} value={tool.id} className="flex-shrink-0">
                                    {tool.name}
                                </TabsTrigger>
                            ))}
                        </div>
                    </div>
                </TabsList>
            </Tabs>
          </div>
       )}
    </header>
  );
});
