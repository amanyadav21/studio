"use client";

import * as React from "react";

import { tools as defaultTools } from "@/data/tools";
import type { Tool } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { BundleBar } from "@/components/bundle-bar";
import { Header } from "@/components/page/Header";
import { Sidebar } from "@/components/page/Sidebar";
import { CategoryHeader } from "@/components/page/CategoryHeader";
import { ToolGrid } from "@/components/page/ToolGrid";

export default function Home() {
  const [pinnedTools, setPinnedTools] = useLocalStorage<string[]>(
    "pinned-tools",
    []
  );
  const [customTools, setCustomTools] = useLocalStorage<Tool[]>(
    "custom-tools",
    []
  );
  const [cardColor, setCardColor] = useLocalStorage<string | null>(
    "card-color",
    null
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeView, setActiveView] = React.useState<"All" | "Pinned">(
    "All"
  );
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [bundle, setBundle] = React.useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const { toast } = useToast();

  const allTools = React.useMemo(
    () => [...defaultTools, ...customTools],
    [customTools]
  );

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const addTool = React.useCallback(
    (newToolData: Omit<Tool, "id" | "category">) => {
      const newTool: Tool = {
        ...newToolData,
        id: `custom-${new Date().getTime()}`,
        category: "Dev Utilities",
      };
      setCustomTools((prev) => [...prev, newTool]);
      toast({
        title: "Tool Added!",
        description: `${newTool.name} has been added to your collection.`,
      });
    },
    [setCustomTools, toast]
  );

  const togglePinned = React.useCallback(
    (toolId: string) => {
      setPinnedTools((prev) =>
        prev.includes(toolId)
          ? prev.filter((id) => id !== toolId)
          : [...prev, toolId]
      );
    },
    [setPinnedTools]
  );

  const toggleBundle = React.useCallback(
    (toolId: string) => {
      setBundle((prev) =>
        prev.includes(toolId)
          ? prev.filter((id) => id !== toolId)
          : [...prev, toolId]
      );
    },
    [setBundle]
  );

  const clearBundle = React.useCallback(() => {
    setBundle([]);
  }, [setBundle]);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const onClearCardColor = React.useCallback(() => {
    setCardColor(null);
  }, [setCardColor]);

  const filteredTools = React.useMemo(() => {
    let currentTools = allTools;

    if (activeView === "Pinned") {
      currentTools = allTools.filter((tool) => pinnedTools.includes(tool.id));
    }

    if (debouncedSearchTerm) {
      return currentTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          tool.description
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
      );
    }

    return currentTools;
  }, [debouncedSearchTerm, activeView, pinnedTools, allTools]);

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground">
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onAddTool={addTool}
        cardColor={cardColor}
        onCardColorChange={setCardColor}
        onClearCardColor={onClearCardColor}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
      <div className="flex">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          pinnedCount={pinnedTools.length}
          isCollapsed={isSidebarCollapsed}
        />

        <main
          className={cn(
            "flex-1 p-6 transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          )}
        >
          <CategoryHeader activeView={activeView} />
          <ToolGrid
            tools={filteredTools}
            pinnedTools={pinnedTools}
            onTogglePinned={togglePinned}
            bundle={bundle}
            onToggleBundle={toggleBundle}
            cardColor={cardColor}
          />
        </main>
      </div>
      <BundleBar bundle={bundle} onClear={clearBundle} tools={allTools} />
    </div>
  );
}
