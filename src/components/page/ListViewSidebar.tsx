
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
  MousePointerClick,
  Mail,
  GraduationCap,
  GitBranch,
  ClipboardCheck,
  ListChecks,
  Languages,
  Shield,
  Server,
  Database,
  Map,
  Globe,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { slugify } from '@/lib/utils';
import type { ToolCategory } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ListViewSidebarProps {
  categories: ToolCategory[];
  activeCategory: string;
  onCategoryClick: (slug: string) => void;
  categoryCounts: Record<string, number>;
}

const categoryIcons: Record<string, React.ElementType> = {
  'UI & UX': Palette,
  'Writing & Notes': PenSquare,
  'Productivity Tools': Zap,
  'No-Code / Low-Code': MousePointerClick,
  'Frameworks & Libraries': Package,
  'AI & ML': BrainCircuit,
  APIs: Share2,
  'Major Cloud Providers': Cloud,
  Email: Mail,
  'Educational Plan': GraduationCap,
  'Source Code Repos': GitBranch,
  'Code Quality': ClipboardCheck,
  'Log Management': ListChecks,
  'Translation Management': Languages,
  'CDN and Protection': Shield,
  'Web Hosting': Server,
  'Storage and Media Processing': Database,
  'Data Visualization on Maps': Map,
  'Free Domains': Globe,
};

export function ListViewSidebar({
  categories,
  activeCategory,
  onCategoryClick,
  categoryCounts,
}: ListViewSidebarProps) {
  return (
    <aside className="hidden w-72 flex-shrink-0 md:block min-w-72 border-r-2 border-border">
      <div className="sticky top-24">
        <h3 className="mb-3 px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          On this page
        </h3>
        <ScrollArea className="h-auto max-h-[calc(100vh-8rem)] pb-4">
            <nav className="flex flex-col gap-1 pr-3">
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
                    'group relative flex items-center justify-between gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive
                        ? 'bg-muted font-semibold text-primary'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                >
                    {isActive && (
                    <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    <div className="flex items-center gap-2 truncate flex-1 min-w-0">
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
                        variant={isActive ? 'default' : 'outline'}
                        className="h-5 rounded-md px-2 text-xs font-normal"
                    >
                        {categoryCounts[category]}
                    </Badge>
                    )}
                </Link>
                );
            })}
            </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
