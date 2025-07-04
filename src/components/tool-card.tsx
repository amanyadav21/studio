
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pin, PlusCircle, MinusCircle, Rocket } from "lucide-react";
import type { Tool } from "@/lib/types";
import { cn, getContrastingTextColor } from "@/lib/utils";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolCardProps {
  tool: Tool;
  isPinned: boolean;
  onTogglePinned: (id: string) => void;
  isInBundle: boolean;
  onToggleBundle: (id: string) => void;
  cardColor: string | null;
}

export const ToolCard = React.memo(function ToolCard({
  tool,
  isPinned,
  onTogglePinned,
  isInBundle,
  onToggleBundle,
  cardColor,
}: ToolCardProps) {
  const handleToggleBundle = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleBundle(tool.id);
    },
    [onToggleBundle, tool.id]
  );

  const handleTogglePinned = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onTogglePinned(tool.id);
    },
    [onTogglePinned, tool.id]
  );

  const styles = React.useMemo(() => {
    if (!cardColor) return null;
    const textColor = getContrastingTextColor(cardColor);
    const subduedTextColor = `${textColor}B3`; // 70% opacity

    return {
      card: {
        backgroundColor: cardColor,
        borderColor: subduedTextColor,
      },
      title: { color: textColor },
      description: { color: subduedTextColor },
      button: {
        backgroundColor: textColor,
        color: cardColor,
      },
    };
  }, [cardColor]);

  return (
    <Link href={`/tool/${tool.id}`} className="group block h-full">
      <Card
        className="relative flex h-full flex-col overflow-hidden rounded-xl transition-all duration-300 group-hover:z-10 group-hover:shadow-2xl group-hover:-translate-y-1.5"
        style={styles?.card}
      >
        <div className="relative overflow-hidden">
          <Image
            src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(
              tool.url
            )}?w=600&h=400`}
            alt={tool.name}
            width={600}
            height={400}
            className="aspect-video w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <Badge
            variant="outline"
            className="absolute bottom-3 left-3 border-border/30 bg-background/50 backdrop-blur-sm"
          >
            {tool.category}
          </Badge>
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full shadow-lg"
                    onClick={handleToggleBundle}
                  >
                    {isInBundle ? (
                      <MinusCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <PlusCircle className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {isInBundle ? "Remove from bundle" : "Add to bundle"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isInBundle ? "Remove from bundle" : "Add to bundle"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full shadow-lg"
                    onClick={handleTogglePinned}
                  >
                    <Pin
                      className={cn(
                        "h-4 w-4 text-muted-foreground",
                        isPinned && "fill-primary text-primary"
                      )}
                    />
                    <span className="sr-only">Toggle Pinned</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isPinned ? "Unpin tool" : "Pin tool"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <CardHeader className="flex flex-col flex-grow p-4">
          <CardTitle className="text-lg font-semibold" style={styles?.title}>
            {tool.name}
          </CardTitle>
          <CardDescription
            className="mt-1 text-sm"
            style={styles?.description}
          >
            {tool.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 mt-auto">
          <Button
            className="w-full font-semibold rounded-full"
            style={styles?.button}
          >
            <Rocket className="h-4 w-4 mr-2" />
            Launch
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
});
