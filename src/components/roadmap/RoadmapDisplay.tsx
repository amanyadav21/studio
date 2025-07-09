import type { Roadmap } from '@/lib/types';
import { RoadmapLegend } from './RoadmapLegend';
import { RoadmapNode } from './RoadmapNode';

interface RoadmapDisplayProps {
  roadmap: Roadmap;
}

export function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {roadmap.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {roadmap.description}
        </p>
      </header>

      <RoadmapLegend legendItems={roadmap.legend} />

      <div className="mt-12">
        {roadmap.sections.map((section, sectionIndex) => (
          <div key={section.title || sectionIndex} className="mb-8">
            {section.title && (
              <h2 className="text-2xl font-semibold text-center mb-8 pb-2 border-b">
                {section.title}
              </h2>
            )}
            <div className="flex flex-col items-center">
              {section.nodes.map((node, nodeIndex) => (
                <RoadmapNode
                  key={node.title}
                  node={node}
                  isFirst={sectionIndex === 0 && nodeIndex === 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
