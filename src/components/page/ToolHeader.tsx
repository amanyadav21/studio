"use client";

import {
  ChevronLeft,
  LayoutGrid,
  LayoutPanelLeft,
  Camera,
} from "lucide-react";
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
import { toast } from "@/hooks/use-toast";

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

  const handleScreenshot = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false,
      });

      const video = document.createElement("video");
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();

        const canvas = document.createElement("canvas");
        setTimeout(() => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = `screenshot-${new Date()
              .toISOString()
              .replace(/[:.]/g, "-")}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }

          stream.getTracks().forEach((track) => track.stop());
        }, 150);
      };
    } catch (error: any) {
      console.error("Error taking screenshot:", error);
      if (error.name !== "NotAllowedError") {
        toast({
          variant: "destructive",
          title: "Screenshot Failed",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <TooltipProvider>
        <div className="container relative flex h-12 items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                >
                  <Link href="/">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Home</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to Home</p>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-5" />
            <Link
              href="/"
              className="flex flex-shrink-0 items-center gap-1.5"
            >
              <AppLogo className="h-5 w-5" />
              <span className="hidden font-bold sm:inline-block">
                Coderkart
              </span>
            </Link>
          </div>

          {toolCount > 1 && viewMode === "single" && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Tabs
                value={activeTab}
                onValueChange={onTabChange}
                className="hidden lg:block"
              >
                <TabsList className="h-9">
                  {bundledTools.map((tool) => (
                    <TabsTrigger
                      key={tool.id}
                      value={tool.id}
                      className="text-xs px-2.5 py-1"
                    >
                      {tool.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}

          <div className="flex flex-shrink-0 items-center gap-2">
            {toolCount > 1 && (
              <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "single" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
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
                      size="icon"
                      className="h-8 w-8"
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
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleScreenshot}
                  aria-label="Take Screenshot"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Take Screenshot</p>
              </TooltipContent>
            </Tooltip>
            <ThemeToggle />
          </div>
        </div>

        {/* Responsive Tabs for smaller screens */}
        {toolCount > 1 && viewMode === "single" && (
          <div className="container border-t py-1 px-4 lg:hidden">
            <Tabs value={activeTab} onValueChange={onTabChange}>
              <TabsList className="w-full h-auto">
                <div className="w-full overflow-x-auto p-0.5">
                  <div className="flex justify-start gap-1">
                    {bundledTools.map((tool) => (
                      <TabsTrigger
                        key={tool.id}
                        value={tool.id}
                        className="flex-shrink-0 text-xs px-2.5 py-1"
                      >
                        {tool.name}
                      </TabsTrigger>
                    ))}
                  </div>
                </div>
              </TabsList>
            </Tabs>
          </div>
        )}
      </TooltipProvider>
    </header>
  );
});
