'use client';
import Link from 'next/link';
import type { RoadmapNode as RoadmapNodeType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { tools } from '@/data/tools';

interface RoadmapNodeProps {
  node: RoadmapNodeType;
  isFirst?: boolean;
}

export function RoadmapNode({ node, isFirst = false }: RoadmapNodeProps) {
  const nodeClasses = cn(
    'relative w-full max-w-xs text-center px-6 py-4 border-2 rounded-xl shadow-md bg-card hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1',
    {
      'border-purple-500/80 bg-purple-500/10 hover:border-purple-500': node.isRecommended,
      'border-dashed border-sky-500/80 bg-sky-500/10 hover:border-sky-500': !node.isRecommended && node.isOptional,
      'border-dashed border-muted-foreground/30 bg-muted/20 text-muted-foreground': !node.isRecommended && !node.isOptional && node.title.match(/\?$/),
      'border-border': !node.isRecommended && !node.isOptional && !node.title.match(/\?$/),
    }
  );

  const verticalLineClasses = "absolute left-1/2 -translate-x-1/2 w-[2px] bg-border";
  const horizontalLineClasses = "absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-border";

  return (
    <div className="relative flex flex-col items-center group">
      {!isFirst && (
        <div className={cn(verticalLineClasses, "top-0 -translate-y-full h-8")} />
      )}

      <div className={nodeClasses}>
        <h3 className="text-base font-bold text-card-foreground">{node.title}</h3>
        {node.description && (
          <p className="text-sm text-muted-foreground mt-2">{node.description}</p>
        )}
        {node.tools && node.tools.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {node.tools.map((toolRef) => {
              const toolData = tools.find(t => t.id === toolRef.id);
              return toolData ? (
                <Button key={toolRef.id} size="sm" variant="secondary" asChild className="h-auto px-2 py-1 text-xs font-semibold rounded-full hover:bg-accent">
                  <Link href={toolData.url} target="_blank" rel="noopener noreferrer">
                    {toolRef.name}
                  </Link>
                </Button>
              ) : null;
            })}
          </div>
        )}
      </div>

      {node.children && node.children.length > 0 && (
        <div className="relative mt-8 w-full">
          {/* Vertical line from parent to horizontal line */}
          <div className={cn(verticalLineClasses, "bottom-full h-8")} />

          {/* Horizontal line connecting children */}
          {node.children.length > 1 && (
            <div className={cn(horizontalLineClasses, "w-[calc(100%-4rem)]")} />
          )}
          
          <div className="flex justify-center gap-x-8 gap-y-16 pt-8 flex-wrap">
            {node.children.map((childNode) => (
              <div key={childNode.title} className="relative flex flex-col items-center">
                 {/* Vertical line from horizontal line to child */}
                <div className={cn(verticalLineClasses, "bottom-full h-8")} />
                
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
