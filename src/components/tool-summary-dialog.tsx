"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Tool } from "@/lib/types";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

interface ToolInfoDialogProps {
  tool: Tool | null;
  onOpenChange: (open: boolean) => void;
}

export function ToolInfoDialog({
  tool,
  onOpenChange,
}: ToolInfoDialogProps) {
  return (
    <Dialog open={!!tool} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tool?.name}</DialogTitle>
          <DialogDescription>
            {tool?.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button asChild className="w-full">
            <a href={tool?.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              Visit Website
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
