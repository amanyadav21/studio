
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pin, PlusCircle, MinusCircle, Rocket, Trash2, Pencil } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface ToolCardProps {
  tool: Tool;
  isPinned: boolean;
  onTogglePinned: (id: string) => void;
  isInBundle: boolean;
  onToggleBundle: (id: string) => void;
  cardColor: string | null;
  onDeleteTool?: (id: string) => void;
  onEditTool?: (tool: Tool) => void;
}

export const ToolCard = React.memo(function ToolCard({
  tool,
  isPinned,
  onTogglePinned,
  isInBundle,
  onToggleBundle,
  cardColor,
  onDeleteTool,
  onEditTool,
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

  const handleDeleteTool = React.useCallback(() => {
    if (onDeleteTool) {
      onDeleteTool(tool.id);
    }
  }, [onDeleteTool, tool.id]);

  const handleEditTool = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onEditTool) {
        onEditTool(tool);
      }
    },
    [onEditTool, tool]
  );

  const isCustomTool = tool.id.startsWith("custom-");

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
            {isCustomTool && onEditTool && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 rounded-full shadow-lg"
                      onClick={handleEditTool}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit tool</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit tool</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {isCustomTool && onDeleteTool && (
              <AlertDialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-9 w-9 rounded-full shadow-lg"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete tool</span>
                        </Button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Delete tool</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently delete the "{tool.name}" tool
                      and cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteTool}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full shadow-lg"
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
                    className="h-9 w-9 rounded-full shadow-lg"
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
            <Rocket />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
});
