'use client';
import Link from 'next/link';
import type { RoadmapNode as RoadmapNodeType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { tools } from '@/data/tools';
import { Badge } from '@/components/ui/badge';

interface RoadmapNodeProps {
  node: RoadmapNodeType;
  isFirst?: boolean;
}

export function RoadmapNode({ node, isFirst = false }: RoadmapNodeProps) {
  const isHub = node.type === 'hub';

  const nodeClasses = cn(
    'relative w-full max-w-sm text-center px-6 py-4 border-2 rounded-xl shadow-md bg-card hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1',
    isHub
      ? 'bg-yellow-400/10 border-yellow-500/50 hover:border-yellow-500'
      : {
          'border-purple-500': node.recommendation === 'recommended',
          'border-green-500': node.recommendation === 'alternative',
          'border-muted-foreground/50': node.recommendation === 'optional',
          'border-border': !node.recommendation,
        }
  );

  const verticalLineClasses =
    'absolute left-1/2 -translate-x-1/2 w-[2px] bg-border';
  const horizontalLineClasses =
    'absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-border';

  return (
    <div className="relative flex flex-col items-center group w-full">
      {!isFirst && (
        <div className={cn(verticalLineClasses, 'top-0 -translate-y-full h-8')} />
      )}

      <div className={nodeClasses}>
        <h3
          className={cn(
            'text-lg font-bold text-card-foreground',
            isHub && 'text-xl text-yellow-300'
          )}
        >
          {node.title}
        </h3>
        {node.description && (
          <p className="text-sm text-muted-foreground mt-2">
            {node.description}
          </p>
        )}
        
        {/* Render children as chips for Hub nodes */}
        {isHub && node.children && node.children.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {node.children.map((child) => {
              const chipClasses = cn(
                'border text-xs font-medium h-auto px-3 py-1 rounded-full transition-colors',
                {
                  'border-purple-500/50 bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20':
                    child.recommendation === 'recommended',
                  'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20':
                    child.recommendation === 'alternative',
                  'border-border bg-muted/50 text-muted-foreground hover:bg-muted':
                    child.recommendation === 'optional',
                  'bg-card border-border': !child.recommendation,
                }
              );
              return (
                <Badge
                  key={child.title}
                  variant="outline"
                  className={chipClasses}
                >
                  {child.title}
                </Badge>
              );
            })}
          </div>
        )}

        {node.tools && node.tools.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {node.tools.map((toolRef) => {
              const toolData = tools.find((t) => t.id === toolRef.id);
              return toolData ? (
                <Button
                  key={toolRef.id}
                  size="sm"
                  variant="secondary"
                  asChild
                  className="h-auto px-3 py-1 text-xs font-semibold rounded-full hover:bg-accent"
                >
                  <Link
                    href={toolData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {toolRef.name}
                  </Link>
                </Button>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Render children as separate nodes for non-hub nodes */}
      {!isHub && node.children && node.children.length > 0 && (
        <div className="relative mt-8 w-full">
          {/* Vertical line from parent to horizontal line */}
          <div className={cn(verticalLineClasses, 'bottom-full h-8')} />

          {/* Horizontal line connecting children */}
          {node.children.length > 1 && (
            <div className={cn(horizontalLineClasses, 'w-[calc(100%-4rem)]')} />
          )}

          <div className="flex justify-center gap-x-8 gap-y-16 pt-8 flex-wrap">
            {node.children.map((childNode) => (
              <div
                key={childNode.title}
                className="relative flex flex-col items-center max-w-xs"
              >
                {/* Vertical line from horizontal line to child */}
                <div className={cn(verticalLineClasses, 'bottom-full h-8')} />

                {/* Small dot connector for multi-child connections */}
                {node.children.length > 1 && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 w-2 h-2 rounded-full bg-border" />
                )}

                <RoadmapNode node={childNode} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
