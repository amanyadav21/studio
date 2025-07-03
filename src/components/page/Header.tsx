
"use client";

import {
  BookOpen,
  PanelLeftClose,
  PanelRightClose,
  Plus,
  Search,
} from "lucide-react";
import * as React from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { AppLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";
import { Kbd } from "@/components/ui/kbd";

interface HeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onAddTool: () => void;
  cardColor: string | null;
  onCardColorChange: (color: string) => void;
  onClearCardColor: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header = React.memo(function Header({
  searchTerm,
  onSearchTermChange,
  onAddTool,
  cardColor,
  onCardColorChange,
  onClearCardColor,
  isSidebarCollapsed,
  onToggleSidebar,
}: HeaderProps) {
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleSidebar}
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
          >
            {isSidebarCollapsed ? (
              <PanelRightClose className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <AppLogo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">LocalOpen</span>
          </Link>
        </div>

        <div className="flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search tools..."
              className="w-full pl-9 pr-16"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Kbd>⌘K</Kbd>
            </div>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1">
          <Button variant="outline" onClick={onAddTool}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Tool</span>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/docs">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Docs</span>
            </Link>
          </Button>
          <ColorPicker
            selectedColor={cardColor}
            onColorChange={onCardColorChange}
            onClear={onClearCardColor}
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
});
