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
    return (
      <li key={tool.id}>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary no-underline hover:underline"
        >
          {tool.name}
        </a>
        {' - '}
        <span className="text-muted-foreground">{tool.description}</span>
      </li>
    );
  };

  const renderToolsList = (tools: Tool[]) => {
    if (tools.length === 0) return null;
    return (
      <ul className="list-disc space-y-2 py-2 pl-6">
        {tools.map(renderToolItem)}
      </ul>
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
        <div className="prose prose-slate dark:prose-invert max-w-none prose-a:font-semibold prose-a:text-primary prose-li:my-1 prose-h2:tracking-tight prose-h3:tracking-tight">
          {categories.map((category) => {
            const categorySlug = slugify(category);
            const toolsForCategory = tools.filter(
              (tool) => tool.category === category
            );
            if (toolsForCategory.length === 0) return null;

            const subCategories = Array.from(
              new Set(toolsForCategory.map((t) => t.subcategory).filter(Boolean))
            ) as string[];
            
            const toolsWithoutSubcategory = toolsForCategory.filter(t => !t.subcategory);

            return (
              <section
                key={categorySlug}
                id={categorySlug}
                className="scroll-mt-24"
              >
                <h2 className="!mt-12 !mb-4 border-b !pb-2 font-bold">{category}</h2>

                {renderToolsList(toolsWithoutSubcategory)}

                {subCategories.map((subCat) => (
                  <React.Fragment key={subCat}>
                    <h3 className="!mt-6 !mb-2 font-semibold">{subCat}</h3>
                    {renderToolsList(toolsForCategory.filter((t) => t.subcategory === subCat))}
                  </React.Fragment>
                ))}
                
                <div className="mt-6 text-right not-prose">
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
