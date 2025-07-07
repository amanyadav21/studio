
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
  const [imgSrc, setImgSrc] = React.useState(
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(tool.url)}?w=600&h=400`
  );

  const handleImageError = React.useCallback(() => {
    setImgSrc(`https://placehold.co/600x400.png`);
  }, []);

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

  const isEmbeddable = tool.embeddable ?? true;
  const launchUrl = `/tool/${tool.id}`;
  const externalUrl = tool.url;

  const primaryActionProps = isEmbeddable
    ? { href: launchUrl }
    : { href: externalUrl, target: "_blank", rel: "noopener noreferrer" };

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
        <Link {...primaryActionProps}>
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
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5">
          <Badge
            variant="outline"
            className={cn({
              "border-border/30 bg-background/50 backdrop-blur-sm": !cardColor,
            })}
            style={cardColor ? styles?.categoryBadge : {}}
          >
            {tool.category}
          </Badge>
          {tool.subcategory && (
            <Badge
                variant="outline"
                className={cn({
                "border-border/30 bg-background/50 backdrop-blur-sm": !cardColor,
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
            <div className="flex w-full items-center justify-end gap-2">
              <Button
                asChild
                variant="secondary"
                size="default"
                className="font-semibold rounded-full"
              >
                <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Site
                </Link>
              </Button>
              <Button
                asChild
                size="default"
                className="font-semibold rounded-full"
                style={styles?.button}
              >
                <Link href={launchUrl}>
                  <Rocket className="h-4 w-4 mr-2" />
                  Launch
                </Link>
              </Button>
            </div>
          ) : (
            <Button
              asChild
              size="default"
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
