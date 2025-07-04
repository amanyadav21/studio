
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

interface ToolHeaderProps {
  viewMode: "single" | "parallel";
  onViewModeChange: (mode: "single" | "parallel") => void;
  toolCount: number;
}

export const ToolHeader = React.memo(function ToolHeader({
  viewMode,
  onViewModeChange,
  toolCount,
}: ToolHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-6">
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

        <div className="flex flex-shrink-0 items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
});
