"use client";

import * as React from "react";
import Link from "next/link";
import { tools as defaultTools } from "@/data/tools";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import type { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
} from "lucide-react";
import { AppLogo } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ToolPage({ params }: { params: { slug: string[] } }) {
  const [customTools] = useLocalStorage<Tool[]>("custom-tools", []);
  const allTools = React.useMemo(
    () => [...defaultTools, ...customTools],
    [customTools]
  );

  const toolIds = params.slug || [];
  const matchedTools = toolIds
    .map((id) => allTools.find((t) => t.id === id))
    .filter(Boolean) as Tool[];

  const [viewport, setViewport] = React.useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const iframeRefs = React.useRef<(HTMLIFrameElement | null)[]>([]);

  React.useEffect(() => {
    iframeRefs.current = iframeRefs.current.slice(0, matchedTools.length);
  }, [matchedTools]);

  if (matchedTools.length === 0) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
        <h2 className="text-xl font-semibold">Tool not found</h2>
        <p className="text-muted-foreground">
          The tool you are looking for does not exist.
        </p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    );
  }

  const isBundle = matchedTools.length > 1;

  const handleRefresh = (index: number) => {
    const iframe = iframeRefs.current[index];
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const viewportConfig = {
    desktop: { width: "100%", icon: Monitor },
    tablet: { width: "768px", icon: Tablet },
    mobile: { width: "375px", icon: Smartphone },
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-muted/30">
      <header className="flex h-14 w-full flex-shrink-0 items-center justify-between border-b bg-background px-4">
        <div className="flex flex-1 items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-3">
            <AppLogo className="h-7 w-7 text-muted-foreground" />
            <span className="font-semibold md:text-lg">
              {matchedTools.map((t) => t?.name).join(" & ")}
            </span>
          </div>
        </div>

        {!isBundle && (
          <div className="hidden items-center gap-2 rounded-lg border bg-background p-1 shadow-sm md:flex">
            <TooltipProvider delayDuration={0}>
              {(
                Object.keys(viewportConfig) as Array<
                  keyof typeof viewportConfig
                >
              ).map((key) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewport === key ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setViewport(key)}
                      className="h-8 w-8"
                    >
                      <viewportConfig[key].icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{key.charAt(0).toUpperCase() + key.slice(1)} view</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        )}

        <div className="flex flex-1 items-center justify-end gap-2">
          {isBundle ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <span>Open Tool</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {matchedTools.map(
                  (tool) =>
                    tool && (
                      <DropdownMenuItem key={tool.id} asChild>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex cursor-pointer items-center justify-between"
                        >
                          <span>{tool.name}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      </DropdownMenuItem>
                    )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            matchedTools[0] && (
              <Button asChild variant="outline">
                <a
                  href={matchedTools[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in new tab
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )
          )}
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div
          className={cn(
            "mx-auto flex h-full gap-6 transition-all duration-300 ease-in-out",
            isBundle ? "w-full flex-row" : "max-w-full justify-center"
          )}
        >
          {matchedTools.map((tool, index) =>
            tool ? (
              <div
                key={tool.id}
                className={cn(
                  "flex flex-1 flex-col transition-all duration-300 ease-in-out",
                  isBundle ? "min-w-0" : "items-center"
                )}
                style={
                  !isBundle ? { maxWidth: viewportConfig[viewport].width } : {}
                }
              >
                <div className="flex h-full w-full flex-col rounded-xl border bg-background shadow-lg">
                  <div className="flex h-10 flex-shrink-0 items-center justify-between border-b bg-muted/50 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                      <span className="h-3 w-3 rounded-full bg-green-500"></span>
                    </div>
                    {!isBundle && (
                      <div className="flex-1 truncate px-4 text-center text-sm text-muted-foreground">
                        {tool.url.replace(/^https?:\/\//, "")}
                      </div>
                    )}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleRefresh(index)}
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Refresh</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <iframe
                    ref={(el) => (iframeRefs.current[index] = el)}
                    src={tool.url}
                    title={tool.name}
                    className="h-full w-full bg-white"
                    sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                  />
                </div>
              </div>
            ) : null
          )}
        </div>
      </main>
    </div>
  );
}
