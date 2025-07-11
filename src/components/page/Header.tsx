
"use client";

import {
  LayoutGrid,
  List,
  Map,
  Search,
} from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { Input } from "@/components/ui/input";
import { AppLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface HeaderProps {
  searchTerm?: string;
  onSearchTermChange?: (term: string) => void;
  cardColor?: string | null;
  onCardColorChange?: (color: string) => void;
  onClearCardColor?: () => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export const Header = React.memo(function Header({
  searchTerm,
  onSearchTermChange,
  cardColor,
  onCardColorChange,
  onClearCardColor,
  viewMode,
  onViewModeChange,
}: HeaderProps) {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const isRoadmapPage = pathname.startsWith('/roadmap');

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

  const showSearch = onSearchTermChange !== undefined;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4 px-6">
        {/* Left Section - Logo & Main Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <AppLogo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Coderkart</span>
          </Link>
          <div className="hidden sm:flex items-center justify-center">
              <div className="flex items-center gap-1 rounded-md border bg-muted p-1">
                <Button
                    variant={viewMode === 'grid' && !isRoadmapPage ? 'secondary' : 'ghost'}
                    size="sm"
                    className="px-3"
                    onClick={() => onSearchTermChange === undefined ? window.location.href = '/' : onViewModeChange?.('grid')}
                >
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    Grid
                </Button>
                <Button
                    variant={viewMode === 'list' && !isRoadmapPage ? 'secondary' : 'ghost'}
                    size="sm"
                    className="px-3"
                    onClick={() => onSearchTermChange === undefined ? window.location.href = '/' : onViewModeChange?.('list')}
                >
                    <List className="mr-2 h-4 w-4" />
                    List
                </Button>
                 <Button
                  variant={isRoadmapPage ? 'secondary' : 'ghost'}
                  size="sm"
                  className="px-3"
                  asChild
                >
                  <Link href="/roadmap">
                    <Map className="mr-2 h-4 w-4" />
                    Roadmaps
                  </Link>
                </Button>
              </div>
          </div>
        </div>

        {/* Right Section - Search & Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
            {showSearch && (
              <div className="relative w-full max-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    className="h-9 w-full pl-9 pr-16"
                    value={searchTerm || ""}
                    onChange={(e) => onSearchTermChange?.(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <Kbd>⌘K</Kbd>
                  </div>
              </div>
            )}
            <ColorPicker
                selectedColor={cardColor ?? null}
                onColorChange={onCardColorChange}
                onClear={onClearCardColor}
            />
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
});
