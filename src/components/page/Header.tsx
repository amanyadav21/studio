
"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { AppLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export function Header({ searchTerm, onSearchTermChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="/" className="flex flex-shrink-0 items-center gap-2">
          <AppLogo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">LocalOpen</span>
        </a>

        <div className="flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools by name or description..."
              className="w-full pl-9"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
