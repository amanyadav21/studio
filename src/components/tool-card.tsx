
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Info, Loader2, ServerCrash, PlusCircle, MinusCircle, ExternalLink } from "lucide-react";
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

  const handleInteraction = (e: React.MouseEvent, callback: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  const handleGetSummary = async () => {
    setIsDialogOpen(true);
    if (summary) return;

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

  const getToolHint = (name: string) => {
    return name.toLowerCase().split(/[ -]/).slice(0, 2).join(' ');
  }

  return (
    <>
      <Link href={`/tool/${tool.id}`} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
          <div className="relative overflow-hidden">
            <Image
              src={`https://placehold.co/600x400.png`}
              alt={tool.name}
              width={600}
              height={400}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={getToolHint(tool.name)}
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 rounded-full shadow-lg"
                      onClick={(e) => handleInteraction(e, () => onToggleBundle(tool.id))}
                    >
                      {isInBundle ? <MinusCircle className="h-4 w-4 text-primary" /> : <PlusCircle className="h-4 w-4" />}
                      <span className="sr-only">{isInBundle ? "Remove from bundle" : "Add to bundle"}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>{isInBundle ? "Remove from bundle" : "Add to bundle"}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 rounded-full shadow-lg"
                      onClick={(e) => handleInteraction(e, () => onToggleFavorite(tool.id))}
                    >
                      <Star className={cn("h-4 w-4 text-muted-foreground", isFavorite && "fill-amber-400 text-amber-500")} />
                      <span className="sr-only">Toggle Favorite</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <CardHeader>
            <CardTitle>{tool.name}</CardTitle>
            <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter className="border-t p-3">
             <div className="flex w-full justify-between items-center">
                <Button variant="ghost" size="sm" onClick={(e) => handleInteraction(e, handleGetSummary)}>
                    <Info className="mr-2 h-4 w-4" />
                    AI Summary
                </Button>
                 <div className="flex items-center text-sm text-muted-foreground">
                    Launch
                    <ExternalLink className="ml-2 h-4 w-4" />
                </div>
             </div>
          </CardFooter>
        </Card>
      </Link>
      
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
