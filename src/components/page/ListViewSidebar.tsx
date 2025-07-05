
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
import { Badge } from '@/components/ui/badge';

interface ListViewSidebarProps {
  categories: ToolCategory[];
  activeCategory: string;
  onCategoryClick: (slug: string) => void;
  categoryCounts: Record<string, number>;
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
  categoryCounts,
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
            const isActive = activeCategory === categorySlug;

            return (
              <Link
                key={categorySlug}
                href={`#${categorySlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryClick(categorySlug);
                }}
                className={cn(
                  'group relative flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-muted font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <div className="flex items-center gap-3 truncate">
                  {Icon && (
                    <Icon
                      className={cn(
                        'h-4 w-4 flex-shrink-0',
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-foreground'
                      )}
                    />
                  )}
                  <span className="truncate">{category}</span>
                </div>
                {categoryCounts[category] > 0 && (
                  <Badge
                    variant={isActive ? 'default' : 'secondary'}
                    className="h-5 rounded-md px-2 text-xs font-normal"
                  >
                    {categoryCounts[category]}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
