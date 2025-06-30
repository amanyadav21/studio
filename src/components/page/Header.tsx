"use client";

import { Plus, Search } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { AppLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { AddToolDialog } from "@/components/add-tool-dialog";
import type { Tool } from "@/lib/types";
import { ColorPicker } from "@/components/color-picker";

interface HeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onAddTool: (tool: Omit<Tool, "id" | "category">) => void;
  cardColor: string | null;
  onCardColorChange: (color: string) => void;
  onClearCardColor: () => void;
}

export const Header = React.memo(function Header({
  searchTerm,
  onSearchTermChange,
  onAddTool,
  cardColor,
  onCardColorChange,
  onClearCardColor,
}: HeaderProps) {
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

        <div className="flex flex-shrink-0 items-center gap-2">
          <AddToolDialog onAddTool={onAddTool}>
            <Button>
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Tool</span>
            </Button>
          </AddToolDialog>
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
