'use client';

import * as React from 'react';
import { ArrowUp, BookOpen, ExternalLink } from 'lucide-react';
import type { Tool, ToolCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ListViewContentProps {
  tools: Tool[];
  categories: ToolCategory[];
}

export const ListViewContent = React.forwardRef<
  HTMLElement,
  ListViewContentProps
>(function ListViewContent({ tools, categories }, ref) {
  const renderToolItem = (tool: Tool) => {
    const hasFreeTier =
      (tool.pricing === 'Freemium' && tool.freeUrl) || tool.pricing === 'Free';
    const primaryLink = hasFreeTier && tool.freeUrl ? tool.freeUrl : tool.url;
    const primaryActionText = hasFreeTier ? 'Try Free' : 'Visit Site';

    return (
      <div key={tool.id} className="py-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
          <div className="flex-1">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <h4 className="text-lg font-semibold text-primary group-hover:underline">
                {tool.name}
              </h4>
            </a>
            <p className="mt-1 text-muted-foreground line-clamp-3">
              {tool.description}
            </p>
            {tool.pricing && (
                <div className="mt-3">
                    <Badge
                        variant={
                            tool.pricing === "Paid"
                            ? "destructive"
                            : tool.pricing === "Freemium"
                            ? "default"
                            : "secondary"
                        }
                    >
                        {tool.pricing}
                    </Badge>
                </div>
            )}
          </div>
          <div className="flex w-full flex-shrink-0 sm:w-auto">
            <Button asChild size="sm" className="w-full sm:w-auto">
              <a href={primaryLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                {primaryActionText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex-1" id="top" ref={ref}>
      {tools.length === 0 ? (
        <div className="flex h-full min-h-[40vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Tools Found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => {
            const categorySlug = slugify(category);
            const toolsForCategory = tools.filter(
              (tool) => tool.category === category
            );
            if (toolsForCategory.length === 0) return null;

            // Group by subcategory if it exists
            const subCategories = Array.from(
              new Set(toolsForCategory.map((t) => t.subcategory).filter(Boolean))
            ) as string[];

            return (
              <section
                key={categorySlug}
                id={categorySlug}
                className="scroll-mt-24"
              >
                <h2 className="border-b pb-2 text-2xl font-bold tracking-tight">{category}</h2>

                {subCategories.length > 0 ? (
                  <>
                    {subCategories.map((subCat) => (
                      <div key={subCat} className="mt-6">
                        <h3 className="text-lg font-semibold tracking-tight text-muted-foreground">{subCat}</h3>
                        <div className="divide-y">
                          {toolsForCategory
                            .filter((t) => t.subcategory === subCat)
                            .map(renderToolItem)}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="divide-y">{toolsForCategory.map(renderToolItem)}</div>
                )}

                <div className="mt-6 text-right">
                  <Button asChild variant="ghost" size="sm">
                    <a href="#top">
                      <ArrowUp className="mr-2 h-4 w-4" /> Back to Top
                    </a>
                  </Button>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
});

ListViewContent.displayName = 'ListViewContent';
