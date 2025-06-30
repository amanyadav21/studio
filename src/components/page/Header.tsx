
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
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <AppLogo className="h-6 w-6" />
            <span className="inline-block font-bold">LocalOpen</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
              />
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
