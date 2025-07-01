
"use client";

import * as React from "react";
import {
  ChevronLeft,
  GripVertical,
  LayoutGrid,
  LayoutPanelLeft,
  Maximize,
  Minimize,
  PanelLeftClose,
  PanelRightOpen,
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
}

const PADDING = 16;

export const FloatingSidebar = React.memo(function FloatingSidebar({
  isFullscreen,
  viewMode,
  onToggleFullscreen,
  onToggleViewMode,
}: FloatingSidebarProps) {
  const [isVisible, setIsVisible] = useLocalStorage(
    "floating-sidebar-visible",
    true
  );
  const [side, setSide] = useLocalStorage<"left" | "right">(
    "floating-sidebar-position",
    "left"
  );
  const [yPos, setYPos] = useLocalStorage<number>(
    "floating-sidebar-y",
    150
  );
  
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useLayoutEffect(() => {
      const node = nodeRef.current;
      if (!node || isDragging) return;

      const updatePosition = () => {
          const sidebarWidth = node.offsetWidth;
          const sidebarHeight = node.offsetHeight;
          
          const x = side === "left" ? PADDING : window.innerWidth - sidebarWidth - PADDING;
          const newYPos = Math.max(PADDING, Math.min(yPos, window.innerHeight - sidebarHeight - PADDING));
          
          node.style.transition = 'transform 0.3s cubic-bezier(0, 0, 0.2, 1)';
          node.style.transform = `translate(${x}px, ${newYPos}px)`;
          node.style.opacity = '1'; 
          node.style.willChange = 'transform';
      };
      
      updatePosition();

      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
  }, [side, yPos, isDragging]);

  const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (e.button !== 0 || !nodeRef.current) return;
      
      const node = nodeRef.current;
      setIsDragging(true);
      node.style.transition = 'none';

      const startX = e.clientX;
      const startY = e.clientY;
      const initialRect = node.getBoundingClientRect();

      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        
        requestAnimationFrame(() => {
          if (!node) return;
          let newX = initialRect.left + (moveEvent.clientX - startX);
          let newY = initialRect.top + (moveEvent.clientY - startY);
          
          const sidebarWidth = node.offsetWidth;
          const sidebarHeight = node.offsetHeight;
          newX = Math.max(PADDING, Math.min(newX, window.innerWidth - sidebarWidth - PADDING));
          newY = Math.max(PADDING, Math.min(newY, window.innerHeight - sidebarHeight - PADDING));

          node.style.transform = `translate(${newX}px, ${newY}px)`;
        });
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        
        if(!node) return;

        const finalRect = node.getBoundingClientRect();
        
        const dragThreshold = 5;
        const draggedDistance = Math.hypot(upEvent.clientX - startX, upEvent.clientY - startY);
        
        if (draggedDistance > dragThreshold) {
            const screenCenter = window.innerWidth / 2;
            const newSide = (finalRect.left + finalRect.width / 2) < screenCenter ? "left" : "right";
            setSide(newSide);
            setYPos(finalRect.top);
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [setSide, setYPos]
  );
  
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
                <PanelRightOpen />
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
    <>
      {isDragging && <div className="fixed inset-0 z-[55] cursor-move" />}
      <div
        ref={nodeRef}
        className="fixed z-60 flex flex-col items-center gap-1.5 rounded-xl border bg-background/80 p-2 shadow-2xl backdrop-blur-md"
        style={{ top: 0, left: 0, opacity: 0, willChange: 'transform' }}
      >
        <div onMouseDown={handleMouseDown} className="drag-handle cursor-move rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent">
          <GripVertical className="h-5 w-5" />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon">
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

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onToggleViewMode}>
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
                variant="ghost"
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

        <Separator className="my-1" />

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
    </>
  );
});
