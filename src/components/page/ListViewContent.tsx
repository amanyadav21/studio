
'use client';

import * as React from 'react';
import { ArrowUp, BookOpen } from 'lucide-react';
import type { Tool, ToolCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/utils';

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
      (tool.pricing === "Freemium" && tool.freeUrl) || tool.pricing === "Free";
    const freeLink = (
      tool.pricing === "Freemium" ? tool.freeUrl : tool.url
    ) as string;

    return (
      <li key={tool.id}>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tool.name}
        </a>{' '}
        — {tool.description}
        {tool.pricing && (
          <span className="ml-1 italic underline">{tool.pricing}</span>
        )}.
        {hasFreeTier && (
          <a
            href={freeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline"
          >
            Try Free
          </a>
        )}
      </li>
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
        <div className="prose dark:prose-invert max-w-none">
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
                <h2>{category}</h2>

                {subCategories.length > 0 ? (
                  <>
                    {subCategories.map((subCat) => (
                      <div key={subCat}>
                        <h3>{subCat}</h3>
                        <ul>
                          {toolsForCategory
                            .filter((t) => t.subcategory === subCat)
                            .map(renderToolItem)}
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <ul>{toolsForCategory.map(renderToolItem)}</ul>
                )}

                <div className="not-prose mt-6 text-right">
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
