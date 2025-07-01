"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Maximize, Minimize, X } from "lucide-react";

import { tools as defaultTools } from "@/data/tools";
import type { Tool } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ToolPage = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const toolIds = Array.isArray(slug) ? slug : slug ? [slug] : [];

  const [customTools] = useLocalStorage<Tool[]>("custom-tools", []);
  const allTools = React.useMemo(
    () => [...defaultTools, ...customTools],
    [customTools]
  );

  const bundledTools = React.useMemo(() => {
    return toolIds
      .map((id) => allTools.find((tool) => tool.id === id))
      .filter((tool): tool is Tool => !!tool);
  }, [toolIds, allTools]);

  const [activeTab, setActiveTab] = React.useState<string>(
    bundledTools[0]?.id || ""
  );
  const [isFullscreen, setIsFullscreen] = React.useState(false);

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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

  const header = (
    <header
      className={cn(
        "flex h-14 w-full flex-shrink-0 items-center justify-between border-b bg-background px-4",
        isFullscreen && "hidden"
      )}
    >
      <div className="flex flex-1 items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/">
            <ChevronLeft />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
        <h1 className="hidden sm:block text-lg font-semibold">
          {bundledTools.length > 1 ? "Tool Bundle" : bundledTools[0].name}
        </h1>
      </div>

      {bundledTools.length > 1 && (
        <div className="hidden md:flex flex-1 justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              {bundledTools.map((tool) => (
                <TabsTrigger key={tool.id} value={tool.id}>
                  {tool.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      <div className="flex flex-1 items-center justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize /> : <Maximize />}
                <span className="sr-only">
                  {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/")}
        >
          <X />
          <span className="sr-only">Close Bundle</span>
        </Button>
      </div>
    </header>
  );

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
          "mx-4 mt-4 self-center md:hidden",
          isFullscreen && "hidden"
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

  return (
    <div
      className={cn(
        "flex h-screen w-screen flex-col bg-muted/30",
        isFullscreen && "fixed inset-0 z-50 bg-background"
      )}
    >
      {header}
      {bundledTools.length > 1 ? multiToolView : singleToolView}
    </div>
  );
};

export default ToolPage;
