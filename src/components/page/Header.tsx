
"use client";

import {
  LayoutGrid,
  List,
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "../ui/separator";

interface HeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  cardColor: string | null;
  onCardColorChange: (color: string) => void;
  onClearCardColor: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
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
      <div className="container flex h-16 items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <AppLogo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Coderkart</span>
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

        <div className="flex flex-shrink-0 items-center gap-2">
           <div className="hidden sm:flex items-center gap-1 rounded-md bg-muted p-1">
             <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                className="px-2"
                onClick={() => onViewModeChange('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                className="px-2"
                onClick={() => onViewModeChange('list')}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
              </Button>
          </div>
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
