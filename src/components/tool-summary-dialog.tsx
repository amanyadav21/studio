"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import { summarizeTool } from "@/ai/flows/tool-summarizer";
import type { Tool } from "@/lib/types";

interface ToolSummaryDialogProps {
  tool: Tool | null;
  onOpenChange: (open: boolean) => void;
}

export function ToolSummaryDialog({
  tool,
  onOpenChange,
}: ToolSummaryDialogProps) {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (tool) {
      setIsLoading(true);
      setSummary(null);
      setError(null);
      summarizeTool({ toolUrl: tool.url })
        .then((result) => {
          setSummary(result.summary);
        })
        .catch((e) => {
          console.error(e);
          setError("Sorry, we couldn't generate a summary for this tool. The website might be blocking automated access.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [tool]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setSummary(null);
      setIsLoading(false);
      setError(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={!!tool} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Summary: {tool?.name}</DialogTitle>
          <DialogDescription>
            An AI-generated summary of this tool. This is experimental and may not be perfect.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {summary && <p className="text-sm text-muted-foreground">{summary}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
