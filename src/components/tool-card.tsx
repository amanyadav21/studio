
"use client";

import * as React from "react";
import Link from "next/link";
import { Star, ExternalLink, Info, Loader2, ServerCrash, PlusCircle, MinusCircle } from "lucide-react";
import type { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toolSummarizer } from "@/ai/flows/tool-summarizer";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isInBundle: boolean;
  onToggleBundle: (id: string) => void;
}

export function ToolCard({ tool, isFavorite, onToggleFavorite, isInBundle, onToggleBundle }: ToolCardProps) {
  const [summary, setSummary] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleGetSummary = async () => {
    setIsDialogOpen(true);
    if (summary) return; // Don't re-fetch if we already have it

    setIsLoading(true);
    setError("");
    try {
      const result = await toolSummarizer({ url: tool.url });
      setSummary(result.summary);
    } catch (e) {
      console.error(e);
      setError("Could not generate a summary for this tool.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">
            <span className="pr-2">{tool.name}</span>
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-7 w-7 flex-shrink-0",
                        isInBundle && "bg-accent/20 text-accent-foreground"
                      )}
                      onClick={() => onToggleBundle(tool.id)}
                    >
                      {isInBundle ? <MinusCircle className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                      <span className="sr-only">
                        {isInBundle ? "Remove from bundle" : "Add to bundle"}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isInBundle ? "Remove from bundle" : "Add to bundle"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 flex-shrink-0"
                      onClick={() => onToggleFavorite(tool.id)}
                    >
                      <Star
                        className={cn(
                          "h-5 w-5 text-muted-foreground transition-all duration-200 hover:text-amber-500",
                          isFavorite && "fill-amber-400 text-amber-500"
                        )}
                      />
                      <span className="sr-only">Toggle Favorite</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardTitle>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow"></CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" onClick={handleGetSummary}>
            <Info className="mr-2 h-4 w-4" />
            Info
          </Button>
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link href={`/tool/${tool.id}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Launch
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tool.name}</DialogTitle>
            <DialogDescription>
              AI-generated summary based on the tool's website.
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert">
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {error && (
               <div className="flex flex-col items-center justify-center p-8 text-center">
                 <ServerCrash className="h-8 w-8 text-destructive" />
                 <p className="mt-4 text-sm font-medium text-destructive">{error}</p>
                 <p className="text-xs text-muted-foreground mt-1">Please try again later.</p>
               </div>
            )}
            {summary && <p>{summary}</p>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
