
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

const PADDING = 16;

export const FloatingSidebar = React.memo(function FloatingSidebar({
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
  const [yPos, setYPos] = useLocalStorage<number>(
    "floating-sidebar-y",
    typeof window !== "undefined" ? window.innerHeight / 2 - 150 : 150
  );
  
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef({ isDragging: false });

  const [position, setPosition] = React.useState({ x: 0, y: yPos });
  const [isInitialized, setIsInitialized] = React.useState(false);


  // Effect to set initial position and handle window resize
  React.useEffect(() => {
    const updatePosition = () => {
      if (typeof window !== "undefined" && nodeRef.current) {
        const sidebarWidth = nodeRef.current.offsetWidth;
        const sidebarHeight = nodeRef.current.offsetHeight;
        
        const x = side === "left" ? PADDING : window.innerWidth - sidebarWidth - PADDING;
        const y = Math.max(PADDING, Math.min(yPos, window.innerHeight - sidebarHeight - PADDING));
        
        setPosition({ x, y });
        if (!isInitialized) setIsInitialized(true);
      }
    };

    // Need a slight delay for the ref to be available on first render
    const timeoutId = setTimeout(updatePosition, 0);
    window.addEventListener('resize', updatePosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePosition);
    };
  }, [side, yPos, isInitialized]);


  const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (e.button !== 0 || !nodeRef.current) return;
      
      dragState.current.isDragging = true;
      
      const node = nodeRef.current;
      node.style.transition = 'none'; // Disable transition while dragging

      const initialRect = node.getBoundingClientRect();
      const offsetX = e.clientX - initialRect.left;
      const offsetY = e.clientY - initialRect.top;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        requestAnimationFrame(() => {
          if (!dragState.current.isDragging) return;
          const newX = moveEvent.clientX - offsetX;
          const newY = moveEvent.clientY - offsetY;
          node.style.transform = `translate(${newX}px, ${newY}px)`;
        });
      };

      const handleMouseUp = () => {
        dragState.current.isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        
        const finalRect = node.getBoundingClientRect();
        const finalY = Math.max(PADDING, Math.min(finalRect.top, window.innerHeight - finalRect.height - PADDING));
        const screenCenter = window.innerWidth / 2;
        const newSide = (finalRect.left + finalRect.width / 2) < screenCenter ? "left" : "right";
        const finalX = newSide === 'left' ? PADDING : window.innerWidth - finalRect.width - PADDING;
        
        node.style.transition = 'transform 0.1s ease-out';
        node.style.transform = `translate(${finalX}px, ${finalY}px)`;

        setSide(newSide);
        setYPos(finalY);
        setPosition({ x: finalX, y: finalY });
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [setSide, setYPos]
  );
  
  if (isFullscreen || !isInitialized) {
    return null;
  }

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
      <div
        ref={nodeRef}
        className="fixed z-50 flex flex-col items-center gap-2 rounded-lg border bg-background/80 p-2 shadow-2xl backdrop-blur-md"
        style={{
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div onMouseDown={handleMouseDown} className="drag-handle cursor-move p-1 text-muted-foreground hover:text-foreground">
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
  );
});
