
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, PlusCircle, MinusCircle, Rocket, Info } from "lucide-react";
import type { Tool } from "@/lib/types";
import { cn, getContrastingTextColor } from "@/lib/utils";

import {
  Card,
  CardContent,
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
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isInBundle: boolean;
  onToggleBundle: (id: string) => void;
  cardColor: string | null;
  onSummarize: (tool: Tool) => void;
}

export const ToolCard = React.memo(function ToolCard({
  tool,
  isFavorite,
  onToggleFavorite,
  isInBundle,
  onToggleBundle,
  cardColor,
  onSummarize,
}: ToolCardProps) {
  const handleInteraction = (e: React.MouseEvent, callback: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

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
      badge: {
        borderColor: subduedTextColor,
        color: textColor,
        backgroundColor: "transparent",
      },
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
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full shadow-lg"
                    onClick={(e) => handleInteraction(e, () => onSummarize(tool))}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Get AI Summary</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Get AI Summary</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full shadow-lg"
                    onClick={(e) =>
                      handleInteraction(e, () => onToggleBundle(tool.id))
                    }
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
                    className="h-9 w-9 rounded-full shadow-lg"
                    onClick={(e) =>
                      handleInteraction(e, () => onToggleFavorite(tool.id))
                    }
                  >
                    <Star
                      className={cn(
                        "h-4 w-4 text-muted-foreground",
                        isFavorite && "fill-amber-400 text-amber-500"
                      )}
                    />
                    <span className="sr-only">Toggle Favorite</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <CardHeader className="flex flex-col flex-grow p-4">
          <Badge
            variant="outline"
            className="mb-2 w-fit"
            style={styles?.badge}
          >
            {tool.category}
          </Badge>
          <CardTitle className="text-lg font-semibold" style={styles?.title}>
            {tool.name}
          </CardTitle>
          <CardDescription
            className="mt-1 line-clamp-2 text-sm"
            style={styles?.description}
          >
            {tool.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button
            className="w-full font-semibold rounded-full"
            style={styles?.button}
          >
            Launch Now
            <Rocket className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
});
