
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
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
  isSaved: boolean;
  onToggleSaved: (id: string) => void;
  cardColor: string | null;
}

export const ToolCard = React.memo(function ToolCard({
  tool,
  isSaved,
  onToggleSaved,
  cardColor,
}: ToolCardProps) {
  const [imgSrc, setImgSrc] = React.useState(
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(tool.url)}?w=600&h=400`
  );

  const handleImageError = React.useCallback(() => {
    setImgSrc(`https://placehold.co/600x400.png`);
  }, []);

  const handleToggleSaved = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleSaved(tool.id);
      
      if (isSaved) {
        toast.success(`Removed ${tool.name} from saved tools`, {
          icon: '🗑️',
        });
      } else {
        toast.success(`Added ${tool.name} to saved tools`, {
          icon: '🔖',
        });
      }
    },
    [onToggleSaved, tool.id, tool.name, isSaved]
  );

  const styles = React.useMemo(() => {
    if (!cardColor) return null;
    const textColor = getContrastingTextColor(cardColor);
    const subduedTextColor = `${textColor}B3`; // 70% opacity

    // Tonal badge styles that work on any card color
    const baseBadgeStyle = {
      backgroundColor: `${textColor}26`, // ~15% opacity version of the text color
      borderColor: "transparent",
      color: textColor,
    };
    
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
      categoryBadge: baseBadgeStyle,
      pricingBadge: {
        free: baseBadgeStyle,
        // "Freemium" badge pops more, like the button
        freemium: {
          ...baseBadgeStyle,
          backgroundColor: textColor,
          color: cardColor,
        },
        // "Paid" badge uses a consistent, distinct color
        paid: {
          ...baseBadgeStyle,
          backgroundColor: 'rgba(220, 38, 38, 0.9)', // Tailwind red-600
          color: '#ffffff',
        },
      }
    };
  }, [cardColor]);

  const hasFreeTier =
    (tool.pricing === "Freemium" && tool.freeUrl) || tool.pricing === "Free";

  const pricingVariant =
    tool.pricing === "Paid"
      ? "destructive"
      : tool.pricing === "Freemium"
      ? "default"
      : "secondary";

  const getPricingBadgeStyle = () => {
    if (!cardColor || !styles) return {};
    switch (tool.pricing) {
        case "Paid":
            return styles.pricingBadge.paid;
        case "Freemium":
            return styles.pricingBadge.freemium;
        case "Free":
        default:
            return styles.pricingBadge.free;
    }
  }

  return (
    <Card
      className="group relative flex h-full flex-col overflow-hidden rounded-xl transition-all duration-300 hover:z-10 hover:shadow-2xl hover:-translate-y-1.5"
      style={styles?.card}
    >
      <div className="relative overflow-hidden">
        <Link href={tool.url} target="_blank" rel="noopener noreferrer">
          <Image
            src={imgSrc}
            onError={handleImageError}
            alt={tool.name}
            width={600}
            height={400}
            className="aspect-video w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {tool.isRecommended && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute top-3 left-3 h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Recommended</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1">
          <Badge
            variant="outline"
            className={cn("border-border/30 bg-background/50 backdrop-blur-sm", {
              "border-transparent": cardColor,
            })}
            style={cardColor ? styles?.categoryBadge : {}}
          >
            {tool.category}
          </Badge>
          {tool.subcategory && (
            <Badge
                variant="outline"
                className={cn("border-border/30 bg-background/50 backdrop-blur-sm", {
                    "border-transparent": cardColor,
                })}
                style={cardColor ? styles?.categoryBadge : {}}
            >
                {tool.subcategory}
            </Badge>
          )}
          {tool.pricing && (
            <Badge
              variant={!cardColor ? pricingVariant : "outline"}
              className={cn({ "backdrop-blur-sm": !cardColor })}
              style={getPricingBadgeStyle()}
            >
              {tool.pricing}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full shadow-lg transition-colors",
                    isSaved && "bg-primary/10 hover:bg-primary/20"
                  )}
                  onClick={handleToggleSaved}
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-all",
                      isSaved && "fill-primary text-primary scale-110"
                    )}
                  />
                  <span className="sr-only">Toggle Saved</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isSaved ? "Unsave tool" : "Save tool"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <CardHeader className="flex flex-col flex-grow p-4">
        <CardTitle className="text-lg font-semibold" style={styles?.title}>
           <Link href={tool.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
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
      <CardFooter className="px-4 pt-0 pb-4">
        {tool.pricing === 'Freemium' && tool.freeUrl ? (
          <div className="flex w-full items-center gap-2">
            <Button
              asChild
              variant="secondary"
              size="default"
              className="font-semibold rounded-xl w-1/2"
            >
              <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Site
              </Link>
            </Button>
            <Button
              asChild
              size="default"
              className="font-semibold rounded-xl w-1/2"
              style={styles?.button}
            >
              <Link href={tool.freeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Free
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-end">
            <Button
              asChild
              size="default"
              className="w-full font-semibold rounded-xl"
              style={styles?.button}
            >
              <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                {hasFreeTier ? 'Free' : 'Visit Site'}
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
});
