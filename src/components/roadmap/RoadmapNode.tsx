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
    'min-w-[200px] max-w-sm text-center px-4 py-2 border-2 rounded-lg shadow-sm bg-card hover:shadow-xl transition-shadow duration-300',
    {
      'border-purple-500 bg-purple-500/10 hover:border-purple-600': node.isRecommended,
      'border-dashed border-sky-500 bg-sky-500/10 hover:border-sky-600': !node.isRecommended && node.isOptional,
      'border-dashed border-muted-foreground/50 bg-muted/50 text-muted-foreground': !node.isRecommended && !node.isOptional && node.title.match(/\?$/), // Heuristic for questions
      'border-border': !node.isRecommended && !node.isOptional && !node.title.match(/\?$/),
    }
  );

  return (
    <div className="relative flex flex-col items-center group">
      {!isFirst && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-8 w-0.5 bg-border" />
      )}

      <div className={nodeClasses}>
        <h3 className="font-semibold">{node.title}</h3>
        {node.description && (
          <p className="text-sm text-muted-foreground mt-1">{node.description}</p>
        )}
        {node.tools && node.tools.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {node.tools.map((toolRef) => {
              const toolData = tools.find(t => t.id === toolRef.id);
              return toolData ? (
                <Button key={toolRef.id} size="sm" variant="outline" asChild className="h-auto px-2 py-1 text-xs">
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
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 h-8 w-0.5 bg-border" />
          {/* Horizontal line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] h-0.5 bg-border" />
          
          <div className="flex justify-center gap-x-8 gap-y-12 pt-8 flex-wrap">
            {node.children.map((childNode) => (
              <div key={childNode.title} className="relative flex flex-col items-center">
                 {/* Vertical line from horizontal line to child */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 h-8 w-0.5 bg-border" />
                <RoadmapNode node={childNode} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
