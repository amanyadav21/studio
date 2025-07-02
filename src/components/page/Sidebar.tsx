"use client";

import * as React from "react";
import { Pin, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type NavItem = {
  id: "Pinned" | "All";
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { id: "Pinned", label: "Pinned", icon: Pin },
  { id: "All", label: "All Tools", icon: LayoutGrid },
];

interface SidebarProps {
  activeView: "All" | "Pinned";
  onViewChange: (view: "All" | "Pinned") => void;
  pinnedCount: number;
  isCollapsed: boolean;
}

export const Sidebar = React.memo(function Sidebar({
  activeView,
  onViewChange,
  pinnedCount,
  isCollapsed,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] hidden flex-col border-r bg-background md:flex",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex-1 overflow-y-auto py-6",
          isCollapsed ? "px-2" : "px-4"
        )}
      >
        <TooltipProvider delayDuration={0}>
          <nav
            className={cn(
              "flex w-full flex-col gap-1",
              isCollapsed && "items-center"
            )}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              if (isCollapsed) {
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="relative h-10 w-10 justify-center p-0"
                        onClick={() => onViewChange(item.id)}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                        {item.id === "Pinned" && pinnedCount > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px] font-medium"
                          >
                            {pinnedCount}
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
                    isActive && "bg-secondary font-semibold"
                  )}
                  onClick={() => onViewChange(item.id)}
                >
                  {isActive && (
                    <div className="absolute left-0 top-2 h-6 w-1 rounded-r-full bg-primary" />
                  )}
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  {item.label}
                  {item.id === "Pinned" && pinnedCount > 0 && (
                    <Badge
                      variant={isActive ? "default" : "secondary"}
                      className="ml-auto"
                    >
                      {pinnedCount}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>
        </TooltipProvider>
      </div>
    </aside>
  );
});
