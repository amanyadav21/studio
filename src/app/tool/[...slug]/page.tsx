
"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  LayoutGrid,
  LayoutPanelLeft,
} from "lucide-react";

import { tools as defaultTools } from "@/data/tools";
import type { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FloatingSidebar } from "@/components/floating-sidebar";

const ToolPage = () => {
  const params = useParams();
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

  const handleToggleViewMode = React.useCallback(() => {
    setViewMode((prev) => (prev === "single" ? "parallel" : "single"));
  }, []);

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

  const singleToolView = (
    <main className="flex-1">
      <iframe
        key={bundledTools[0].id}
        src={bundledTools[0].url}
        title={bundledTools[0].name}
        className="h-full w-full border-0"
      />
    </main>
  );

  const multiToolView = (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <TabsList
        className={cn(
          "mx-4 mt-4 self-center"
        )}
      >
        {bundledTools.map((tool) => (
          <TabsTrigger key={tool.id} value={tool.id}>
            {tool.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <main className="flex-1 bg-background">
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
      </main>
    </Tabs>
  );

  const parallelView = (
    <main className="flex flex-1 overflow-hidden">
      <div className="flex h-full w-full flex-row">
        {bundledTools.map((tool) => (
          <div
            key={tool.id}
            className="h-full flex-1 border-r last:border-r-0"
          >
            <iframe
              src={tool.url}
              title={tool.name}
              className="h-full w-full border-0"
            />
          </div>
        ))}
      </div>
    </main>
  );

  return (
    <div
      className="flex h-screen w-screen flex-col bg-muted/30"
    >
      <FloatingSidebar 
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {bundledTools.length > 1
        ? viewMode === "single"
          ? multiToolView
          : parallelView
        : singleToolView}
    </div>
  );
};

export default ToolPage;
