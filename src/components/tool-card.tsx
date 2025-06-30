"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, PlusCircle, MinusCircle } from "lucide-react";
import type { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
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
  const handleInteraction = (e: React.MouseEvent, callback: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <Link href={`/tool/${tool.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <Image
            src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(tool.url)}?w=600&h=400`}
            alt={tool.name}
            width={600}
            height={400}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
        <CardHeader className="flex-grow">
          <CardTitle>{tool.name}</CardTitle>
          <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
           <div className={cn(buttonVariants({ variant: 'default' }), "w-full")}>
            Launch Now
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
