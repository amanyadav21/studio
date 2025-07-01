
"use client";

import * as React from "react";
import Draggable from "react-draggable";
import {
  ChevronLeft,
  GripVertical,
  LayoutGrid,
  LayoutPanelLeft,
  Maximize,
  Minimize,
  PanelLeftClose,
  PanelRightClose,
  X,
} from "lucide-react";
import Link from "next/link";

import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FloatingSidebarProps {
  isFullscreen: boolean;
  viewMode: "single" | "parallel";
  onToggleFullscreen: () => void;
  onToggleViewMode: () => void;
  onClose: () => void;
}

const SIDEBAR_WIDTH = 64;
const PADDING = 16;

export function FloatingSidebar({
  isFullscreen,
  viewMode,
  onToggleFullscreen,
  onToggleViewMode,
  onClose,
}: FloatingSidebarProps) {
  const [isVisible, setIsVisible] = useLocalStorage(
    "floating-sidebar-visible",
    true
  );
  const [side, setSide] = useLocalStorage<"left" | "right">(
    "floating-sidebar-position",
    "left"
  );
  const [snapKey, setSnapKey] = React.useState(0);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  const handleStop = (e: any, data: { x: number }) => {
    const newSide =
      data.x + (nodeRef.current?.offsetWidth || SIDEBAR_WIDTH) / 2 <
      window.innerWidth / 2
        ? "left"
        : "right";
    setSide(newSide);
    setSnapKey((prev) => prev + 1);
  };

  // This function is only executed on the client, so `window` is safe.
  const getDefaultPosition = () => {
    const height = nodeRef.current?.offsetHeight || 300; // Use an approximation if ref not ready
    const width = nodeRef.current?.offsetWidth || SIDEBAR_WIDTH;
    const y = window.innerHeight / 2 - height / 2;
    const x =
      side === "left" ? PADDING : window.innerWidth - width - PADDING;
    return { x, y };
  };

  if (isFullscreen) return null;

  if (!isVisible) {
    return (
      <div
        className={cn(
          "fixed top-1/2 z-50 -translate-y-1/2",
          side === "left" ? "left-4" : "right-4"
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setIsVisible(true)}
                className="rounded-full shadow-lg"
              >
                <PanelRightClose />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side === "left" ? "right" : "left"}>
              <p>Show Panel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <Draggable
      key={snapKey}
      handle=".drag-handle"
      nodeRef={nodeRef}
      onStop={handleStop}
      defaultPosition={getDefaultPosition()}
    >
      <div
        ref={nodeRef}
        className="fixed z-50 flex flex-col items-center gap-2 rounded-lg border bg-background/80 p-2 shadow-2xl backdrop-blur-md"
      >
        <div className="drag-handle cursor-move p-1 text-muted-foreground hover:text-foreground">
          <GripVertical className="h-5 w-5" />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <Link href="/">
                  <ChevronLeft />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side === "left" ? "right" : "left"}>
              <p>Back to Home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onToggleViewMode}>
                {viewMode === "single" ? <LayoutGrid /> : <LayoutPanelLeft />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side === "left" ? "right" : "left"}>
              <p>{viewMode === "single" ? "Parallel View" : "Single View"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onToggleFullscreen}
              >
                {isFullscreen ? <Minimize /> : <Maximize />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side === "left" ? "right" : "left"}>
              <p>
                {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onClose}>
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side === "left" ? "right" : "left"}>
              <p>Close</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
              >
                <PanelLeftClose />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side === "left" ? "right" : "left"}>
              <p>Hide Panel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Draggable>
  );
}
