
'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { slugify } from '@/lib/utils';
import type { ToolCategory } from '@/lib/types';

interface ListViewSidebarProps {
  categories: ToolCategory[];
  activeCategory: string;
  onCategoryClick: (slug: string) => void;
}

export function ListViewSidebar({
  categories,
  activeCategory,
  onCategoryClick,
}: ListViewSidebarProps) {
  return (
    <aside className="hidden w-64 flex-shrink-0 md:block">
      <div className="sticky top-24">
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <nav className="flex flex-col gap-1">
          {categories.map((category) => {
            const categorySlug = slugify(category);
            return (
              <Link
                key={categorySlug}
                href={`#${categorySlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryClick(categorySlug);
                }}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
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
  );
}
