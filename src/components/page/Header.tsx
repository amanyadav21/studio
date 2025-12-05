
"use client";

import {
  LayoutGrid,
  List,
  Package,
  Search,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import * as React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { Input } from "@/components/ui/input";
import { AppLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

interface HeaderProps {
  searchTerm?: string;
  onSearchTermChange?: (term: string) => void;
  cardColor?: string | null;
  onCardColorChange?: (color: string) => void;
  onClearCardColor?: () => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  isSearching?: boolean;
}

function Header({
  searchTerm,
  onSearchTermChange,
  cardColor,
  onCardColorChange,
  onClearCardColor,
  viewMode,
  onViewModeChange,
  isSearching,
}: HeaderProps) {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isPackagesPage = pathname.startsWith('/packages');

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

  const handleViewChange = (newView: 'grid' | 'list') => {
    if (isHomePage) {
      onViewModeChange?.(newView);
    } else {
      // Redirect to home and set the view mode
      const url = new URL(window.location.origin);
      url.searchParams.set('view', newView);
      window.location.href = url.toString();
    }
  }

  const showSearch = onSearchTermChange !== undefined;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      {/* Parent Div with Full Width and Space Between */}
      <div className="w-full flex h-16 items-center justify-between px-4 lg:px-6">
        
        {/* Left Child Div - Logo & Name */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <AppLogo className="h-7 w-7" />
            <span className="hidden font-bold text-lg tracking-tight sm:inline-block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Coderkart
            </span>
          </Link>
        </div>

        {/* Center Child Div - Search & Grid/List */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
                {isSearching ? (
                  <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
                ) : (
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                )}
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search tools..."
                  className="h-10 w-80 pl-10 pr-20 rounded-lg border-muted-foreground/20 bg-muted/30 transition-all focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  value={searchTerm || ""}
                  onChange={(e) => onSearchTermChange?.(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <Kbd className="bg-muted-foreground/10 text-muted-foreground/70">⌘K</Kbd>
                </div>
            </div>
          )}
          
          {/* Grid & List Buttons */}
          <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1 shadow-sm">
            <Button
                variant={isHomePage && viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                className="px-4 py-2 font-medium transition-all hover:scale-105"
                onClick={() => handleViewChange('grid')}
            >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Grid
            </Button>
            <Button
                variant={isHomePage && viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                className="px-4 py-2 font-medium transition-all hover:scale-105"
                onClick={() => handleViewChange('list')}
            >
                <List className="mr-2 h-4 w-4" />
                List
            </Button>
          </div>
        </div>

        {/* Right Child Div - Color & Theme Controls */}
        <div className="flex items-center gap-2">
          <ColorPicker
              selectedColor={cardColor ?? null}
              onColorChange={onCardColorChange}
              onClear={onClearCardColor}
          />
          <ThemeToggle />
          
          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-1 ml-2">
            <Button
              variant={isHomePage && viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              className="p-2"
              onClick={() => handleViewChange('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={isHomePage && viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              className="p-2"
              onClick={() => handleViewChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
