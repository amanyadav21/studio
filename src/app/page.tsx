
"use client";

import * as React from "react";

import { categories as defaultCategories, tools as defaultTools } from "@/data/tools";
import type { Tool, ToolCategory } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { BundleBar } from "@/components/bundle-bar";
import { Header } from "@/components/page/Header";
import { Sidebar } from "@/components/page/Sidebar";
import { CategoryHeader } from "@/components/page/CategoryHeader";
import { ToolGrid } from "@/components/page/ToolGrid";
import { AddToolDialog } from "@/components/add-tool-dialog";

type ToolFormData = Omit<Tool, "id" | "category">;

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
  const [selectedCategory, setSelectedCategory] = React.useState<
    "All" | "Pinned" | "My Tools" | ToolCategory
  >("All");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [bundle, setBundle] = React.useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const { toast } = useToast();

  const [isToolDialogOpen, setIsToolDialogOpen] = React.useState(false);
  const [editingTool, setEditingTool] = React.useState<Tool | null>(null);

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

  const handleSaveTool = React.useCallback(
    (data: ToolFormData) => {
      if (editingTool) {
        setCustomTools((prev) =>
          prev.map((t) => (t.id === editingTool.id ? { ...t, ...data } : t))
        );
        toast({
          title: "Tool Updated!",
          description: `"${data.name}" has been updated.`,
        });
        setEditingTool(null);
      } else {
        const newTool: Tool = {
          ...data,
          id: `custom-${new Date().getTime()}`,
          category: "My Tools",
        };
        setCustomTools((prev) => [...prev, newTool]);
        toast({
          title: "Tool Added!",
          description: `${newTool.name} has been added to your collection.`,
        });
        setSelectedCategory("My Tools");
      }
    },
    [editingTool, setCustomTools, toast]
  );

  const handleOpenAddToolDialog = React.useCallback(() => {
    setEditingTool(null);
    setIsToolDialogOpen(true);
  }, []);

  const handleOpenEditToolDialog = React.useCallback((tool: Tool) => {
    setEditingTool(tool);
    setIsToolDialogOpen(true);
  }, []);
  
  const deleteTool = React.useCallback(
    (toolId: string) => {
      setCustomTools((prev) => prev.filter((tool) => tool.id !== toolId));
      setPinnedTools((prev) => prev.filter((id) => id !== toolId));
      setBundle((prev) => prev.filter((id) => id !== toolId));
      toast({
        title: "Tool Deleted",
        description: "The custom tool has been removed from your collection.",
        variant: "destructive",
      });
    },
    [setCustomTools, setPinnedTools, setBundle, toast]
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

  const getFilteredTools = React.useCallback((category?: ToolCategory) => {
    let currentTools: Tool[] = allTools;
    
    if (selectedCategory === "Pinned") {
      currentTools = allTools.filter((tool) => pinnedTools.includes(tool.id));
    } else if (selectedCategory === "My Tools") {
      currentTools = customTools;
    } else if (category) {
      currentTools = allTools.filter((tool) => tool.category === category);
    } else if (selectedCategory !== "All") {
      currentTools = allTools.filter(
        (tool) => tool.category === selectedCategory
      );
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
  }, [allTools, customTools, debouncedSearchTerm, pinnedTools, selectedCategory]);
  
  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground">
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onAddTool={handleOpenAddToolDialog}
        cardColor={cardColor}
        onCardColorChange={setCardColor}
        onClearCardColor={onClearCardColor}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
      <div className="flex">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          pinnedCount={pinnedTools.length}
          customToolCount={customTools.length}
          isCollapsed={isSidebarCollapsed}
        />

        <main
          className={cn(
            "flex-1 p-6 transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          )}
        >
          {selectedCategory === "Pinned" ? (
            <>
              <CategoryHeader
                title="Pinned Tools"
                description="Your hand-picked tools for quick and easy access."
              />
              <ToolGrid
                tools={getFilteredTools()}
                pinnedTools={pinnedTools}
                onTogglePinned={togglePinned}
                bundle={bundle}
                onToggleBundle={toggleBundle}
                cardColor={cardColor}
                onDeleteTool={deleteTool}
                onEditTool={handleOpenEditToolDialog}
              />
            </>
          ) : selectedCategory === "My Tools" ? (
             <>
              <CategoryHeader
                title="My Tools"
                description="Your personal collection of added web tools."
              />
              <ToolGrid
                tools={getFilteredTools()}
                pinnedTools={pinnedTools}
                onTogglePinned={togglePinned}
                bundle={bundle}
                onToggleBundle={toggleBundle}
                cardColor={cardColor}
                onDeleteTool={deleteTool}
                onEditTool={handleOpenEditToolDialog}
              />
            </>
          ) : selectedCategory === "All" ? (
            <>
              {defaultCategories.map((category) => {
                const toolsForCategory = getFilteredTools(category);
                if (toolsForCategory.length === 0 && debouncedSearchTerm) return null;
                
                return (
                <div key={category} className="mb-12">
                  <CategoryHeader title={category} description={`A collection of tools for ${category.toLowerCase()}.`} />
                  <ToolGrid
                    tools={toolsForCategory}
                    pinnedTools={pinnedTools}
                    onTogglePinned={togglePinned}
                    bundle={bundle}
                    onToggleBundle={toggleBundle}
                    cardColor={cardColor}
                    onDeleteTool={deleteTool}
                    onEditTool={handleOpenEditToolDialog}
                  />
                </div>
              )})}
              {(() => {
                const myToolsFiltered = getFilteredTools("My Tools");
                if (myToolsFiltered.length > 0) {
                  return (
                    <div key="my-tools" className="mb-12">
                      <CategoryHeader
                        title="My Tools"
                        description="Your personal collection of added web tools."
                      />
                      <ToolGrid
                        tools={myToolsFiltered}
                        pinnedTools={pinnedTools}
                        onTogglePinned={togglePinned}
                        bundle={bundle}
                        onToggleBundle={toggleBundle}
                        cardColor={cardColor}
                        onDeleteTool={deleteTool}
                        onEditTool={handleOpenEditToolDialog}
                      />
                    </div>
                  );
                }
                return null;
              })()}
            </>
          ) : (
            <>
              <CategoryHeader
                title={selectedCategory}
                description={`A collection of tools for ${selectedCategory.toLowerCase()}.`}
              />
              <ToolGrid
                tools={getFilteredTools()}
                pinnedTools={pinnedTools}
                onTogglePinned={togglePinned}
                bundle={bundle}
                onToggleBundle={toggleBundle}
                cardColor={cardColor}
                onDeleteTool={deleteTool}
                onEditTool={handleOpenEditToolDialog}
              />
            </>
          )}
        </main>
      </div>
      <BundleBar bundle={bundle} onClear={clearBundle} tools={allTools} />
      <AddToolDialog
        isOpen={isToolDialogOpen}
        onOpenChange={setIsToolDialogOpen}
        onSave={handleSaveTool}
        initialData={editingTool}
      />
    </div>
  );
}
