
"use client";

import Link from "next/link";
import { X, Layers, Rocket } from "lucide-react";
import type { Tool } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BundleBarProps {
  bundle: string[];
  tools: Tool[];
  onClear: () => void;
}

export function BundleBar({ bundle, tools, onClear }: BundleBarProps) {
  if (bundle.length === 0) {
    return null;
  }

  const bundledTools = bundle
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as Tool[];
  const bundleUrl = `/tool/${bundle.join("/")}`;

  return (
    <div className="fixed bottom-0 right-0 left-0 sm:left-auto sm:right-8 sm:bottom-8 z-50 p-4 sm:p-0">
      <Card className="shadow-2xl animate-in fade-in-0 slide-in-from-bottom-10 duration-500">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg">Tool Bundle</CardTitle>
              <CardDescription>
                {bundle.length} tool{bundle.length > 1 ? "s" : ""} selected
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear bundle</span>
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {bundledTools.map((tool) => (
                <Badge key={tool.id} variant="secondary">
                  {tool.name}
                </Badge>
              ))}
            </div>
            <Button asChild className="w-full">
              <Link href={bundleUrl}>
                <Rocket />
                Launch Bundle
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
