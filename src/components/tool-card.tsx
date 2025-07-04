
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pin, PlusCircle, MinusCircle, Rocket, ExternalLink } from "lucide-react";
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
       badge: {
        backgroundColor: "hsla(0, 0%, 100%, 0.15)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderColor: "hsla(0, 0%, 100%, 0.2)",
        color: "#ffffff"
      }
    };
  }, [cardColor]);

  const isEmbeddable = tool.embeddable ?? true;
  const launchUrl = `/tool/${tool.id}`;
  const externalUrl = tool.url;

  const primaryActionProps = isEmbeddable
    ? { href: launchUrl }
    : { href: externalUrl, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Card
      className="group relative flex h-full flex-col overflow-hidden rounded-xl transition-all duration-300 hover:z-10 hover:shadow-2xl hover:-translate-y-1.5"
      style={styles?.card}
    >
      <div className="relative overflow-hidden">
        <Link {...primaryActionProps}>
          <Image
            src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(
              tool.url
            )}?w=600&h=400`}
            alt={tool.name}
            width={600}
            height={400}
            className="aspect-video w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <Badge
          variant="outline"
          className="absolute bottom-3 left-3 border-border/30 bg-background/50 backdrop-blur-sm"
          style={cardColor ? styles?.badge : {}}
        >
          {tool.category}
        </Badge>
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          {isEmbeddable && (
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
          )}
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
           <Link {...primaryActionProps} className="hover:underline">
            {tool.name}
          </Link>
        </CardTitle>
        <CardDescription
          className="mt-1 text-sm line-clamp-2"
          style={styles?.description}
        >
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 mt-auto">
        {isEmbeddable ? (
            <div className="flex w-full items-center gap-2">
              <Button
                asChild
                className="w-full font-semibold rounded-full"
                style={styles?.button}
              >
                <Link href={launchUrl}>
                  <Rocket className="h-4 w-4 mr-2" />
                  Launch
                </Link>
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="secondary"
                      size="icon"
                      className="rounded-full flex-shrink-0"
                    >
                      <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open site in new tab</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open site in new tab</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <Button
              asChild
              className="w-full font-semibold rounded-full"
              style={styles?.button}
            >
              <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Site
              </Link>
            </Button>
          )}
      </CardFooter>
    </Card>
  );
});
