
"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { tools as defaultTools } from "@/data/tools";
import type { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolHeader } from "@/components/page/ToolHeader";

const ToolPage = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const toolIds = Array.isArray(slug) ? slug : slug ? [slug] : [];

  const allTools = defaultTools;

  const bundledTools = React.useMemo(() => {
    return toolIds
      .map((id) => allTools.find((tool) => tool.id === id))
      .filter((tool): tool is Tool => !!tool && (tool.embeddable ?? true));
  }, [toolIds, allTools]);

  const [activeTab, setActiveTab] = React.useState<string>(
    bundledTools[0]?.id || ""
  );
  const [viewMode, setViewMode] = React.useState<"single" | "parallel">(
    "single"
  );

  React.useEffect(() => {
    if (bundledTools.length > 0 && !activeTab) {
      setActiveTab(bundledTools[0].id);
    }
  }, [bundledTools, activeTab]);

  React.useEffect(() => {
    if (
      bundledTools.length > 0 &&
      bundledTools.findIndex((t) => t.id === activeTab) === -1
    ) {
      setActiveTab(bundledTools[0].id);
    }
  }, [activeTab, bundledTools]);

  const handleViewModeChange = React.useCallback((mode: "single" | "parallel") => {
    setViewMode(mode);
  }, []);

  const handleDraw = React.useCallback(() => {
    if (toolIds.includes('tldraw')) {
        setActiveTab('tldraw');
    } else {
        const newToolIds = [...toolIds, 'tldraw'];
        router.push(`/tool/${newToolIds.join('/')}`);
    }
  }, [toolIds, router, setActiveTab]);


  if (bundledTools.length === 0) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
        <h2 className="text-xl font-semibold">Tool Not Found</h2>
        <p className="text-muted-foreground">
          The tool you are looking for does not exist, or you haven't selected
          any.
        </p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    );
  }

  // This view is for a single tool, no tabs or special views needed.
  const singleToolView = (
    <div className="flex-1">
      <iframe
        key={bundledTools[0].id}
        src={bundledTools[0].url}
        title={bundledTools[0].name}
        className="h-full w-full border-0"
      />
    </div>
  );
  
  // This view shows multiple tools side-by-side.
  const parallelView = (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex h-full w-full flex-row">
        {bundledTools.map((tool) => (
          <div
            key={tool.id}
            className="h-full flex-1 border-r last:border-r-0 dark:border-slate-800"
          >
            <iframe
              src={tool.url}
              title={tool.name}
              className="h-full w-full border-0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const multiToolViewContent = (
     <div className="flex-1 bg-background">
        {bundledTools.map((tool) => (
          <TabsContent
            key={tool.id}
            value={tool.id}
            className="h-full w-full m-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <iframe
              src={tool.url}
              title={tool.name}
              className="h-full w-full border-0"
            />
          </TabsContent>
        ))}
      </div>
  );

  // Render with tabs if multiple tools and in single view mode
  if (bundledTools.length > 1 && viewMode === "single") {
      return (
        <div className="flex h-screen w-screen flex-col bg-background">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
                <ToolHeader 
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                    bundledTools={bundledTools}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onDraw={handleDraw}
                />
                <main className="flex-1 flex flex-col bg-muted/30 overflow-hidden">
                    {multiToolViewContent}
                </main>
            </Tabs>
        </div>
      )
  }

  // Render without tabs for single tool or parallel view
  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <ToolHeader 
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        bundledTools={bundledTools}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onDraw={handleDraw}
      />
      
      <main className="flex-1 flex flex-col bg-muted/30 overflow-hidden">
        {bundledTools.length > 1
          ? parallelView
          : singleToolView}
      </main>
    </div>
  );
};

export default ToolPage;
