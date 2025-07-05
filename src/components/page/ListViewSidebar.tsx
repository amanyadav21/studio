
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Palette,
  PenSquare,
  Zap,
  Package,
  BrainCircuit,
  Cloud,
  Share2,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { slugify } from '@/lib/utils';
import type { ToolCategory } from '@/lib/types';

interface ListViewSidebarProps {
  categories: ToolCategory[];
  activeCategory: string;
  onCategoryClick: (slug: string) => void;
}

const categoryIcons: Record<ToolCategory, React.ElementType> = {
  'UI & UX': Palette,
  'Writing & Notes': PenSquare,
  'Productivity Tools': Zap,
  'Frameworks & Libraries': Package,
  'AI & ML': BrainCircuit,
  APIs: Share2,
  'Cloud Provider': Cloud,
};

export function ListViewSidebar({
  categories,
  activeCategory,
  onCategoryClick,
}: ListViewSidebarProps) {
  return (
    <aside className="hidden w-64 flex-shrink-0 md:block">
      <div className="sticky top-24">
        <h3 className="mb-4 text-lg font-semibold tracking-tight">
          On this page
        </h3>
        <nav className="flex flex-col gap-1">
          {categories.map((category) => {
            const categorySlug = slugify(category);
            const Icon = categoryIcons[category];
            return (
              <Link
                key={categorySlug}
                href={`#${categorySlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryClick(categorySlug);
                }}
                className={cn(
                  'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  activeCategory === categorySlug
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'h-4 w-4 flex-shrink-0',
                      activeCategory === categorySlug
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                )}
                <span className="truncate">{category}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
