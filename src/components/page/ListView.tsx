
'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUp, BookOpen } from 'lucide-react';
import type { Tool, ToolCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ListViewProps {
  tools: Tool[];
  categories: ToolCategory[];
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function ListView({ tools, categories }: ListViewProps) {
  const [activeCategory, setActiveCategory] = React.useState('');

  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.current?.observe(section));

    return () => {
      sections.forEach((section) => observer.current?.unobserve(section));
    };
  }, [tools]); // Rerun observer setup if tools change (e.g., due to search)

  const allCategories = categories.filter(category => tools.some(tool => tool.category === category));

  return (
    <div className="container mx-auto flex max-w-7xl gap-12 py-8 px-4">
      <aside className="hidden w-64 flex-shrink-0 md:block">
        <div className="sticky top-24">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <nav className="flex flex-col gap-1">
            {allCategories.map((category) => {
              const categorySlug = slugify(category);
              return (
                <Link
                  key={categorySlug}
                  href={`#${categorySlug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(categorySlug)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                  className={cn(
                    'text-sm rounded-md px-3 py-1.5 transition-colors',
                    activeCategory === categorySlug
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {category}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1" id="top">
        {tools.length === 0 ? (
           <div className="flex h-full min-h-[40vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Tools Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-headings:scroll-mt-24">
            {allCategories.map((category) => {
              const categorySlug = slugify(category);
              const toolsForCategory = tools.filter(
                (tool) => tool.category === category
              );
              if (toolsForCategory.length === 0) return null;

              // Group by subcategory if it exists
              const subCategories = Array.from(new Set(toolsForCategory.map(t => t.subcategory).filter(Boolean))) as string[];

              return (
                <section key={categorySlug} id={categorySlug} className="mb-16">
                  <h2 className="text-3xl font-bold tracking-tight border-b pb-3 mb-6">
                    {category}
                  </h2>

                  {subCategories.length > 0 ? (
                    subCategories.map(subCat => (
                      <div key={subCat} className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">{subCat}</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {toolsForCategory.filter(t => t.subcategory === subCat).map((tool) => (
                              <li key={tool.id}>
                                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                                    <strong>{tool.name}</strong>
                                  </a>
                                  — {tool.description}
                                </li>
                            ))}
                          </ul>
                      </div>
                    ))
                  ) : (
                    <ul className="list-disc pl-5 space-y-2">
                      {toolsForCategory.map((tool) => (
                        <li key={tool.id}>
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <strong>{tool.name}</strong>
                          </a>
                          — {tool.description}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="text-right mt-6">
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
    </div>
  );
}
