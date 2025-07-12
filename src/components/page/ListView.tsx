
'use client';

import * as React from 'react';
import type { Tool, ToolCategory } from '@/lib/types';
import { slugify, cn } from '@/lib/utils';
import { ListViewSidebar } from './ListViewSidebar';
import { ListViewContent } from './ListViewContent';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface ListViewProps {
  tools: Tool[];
  categories: ToolCategory[];
  savedTools: string[];
  onToggleSaved: (id: string) => void;
}

export function ListView({
  tools,
  categories,
  savedTools,
  onToggleSaved,
}: ListViewProps) {
  const [activeCategory, setActiveCategory] = React.useState('');
  const [showScroll, setShowScroll] = React.useState(false);
  const contentRef = React.useRef<HTMLElement>(null);

  const allCategories = React.useMemo(() => {
    return categories.filter(category => tools.some(tool => tool.category === category));
  }, [categories, tools]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    allCategories.forEach(category => {
      counts[category] = tools.filter(
        tool => tool.category === category
      ).length;
    });
    return counts;
  }, [allCategories, tools]);


  React.useEffect(() => {
    if (allCategories.length > 0 && !activeCategory) {
        setActiveCategory(slugify(allCategories[0]));
    }
  }, [allCategories, activeCategory]);

  React.useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 200) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 200) {
        setShowScroll(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      // This config means the section at the top 20% of the screen is considered "active"
      { rootMargin: '-20% 0px -80% 0px' } 
    );

    const sections = contentRef.current?.querySelectorAll('section[id]');
    sections?.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', checkScrollTop);

    return () => {
      sections?.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [tools, showScroll]); 

  const handleCategoryClick = React.useCallback((slug: string) => {
      document.getElementById(slug)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
      });
  }, []);
  
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex w-full gap-8 py-8 px-6 lg:px-8 xl:gap-12 xl:px-12">
      <ListViewSidebar
        categories={allCategories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        categoryCounts={categoryCounts}
      />
      <ListViewContent
        ref={contentRef}
        tools={tools}
        categories={allCategories}
        savedTools={savedTools}
        onToggleSaved={onToggleSaved}
      />
      <Button
        variant="secondary"
        size="icon"
        onClick={scrollTop}
        className={cn(
          'fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full shadow-lg transition-opacity duration-300',
          showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <ArrowUp className="h-6 w-6" />
        <span className="sr-only">Scroll to top</span>
      </Button>
    </div>
  );
}
