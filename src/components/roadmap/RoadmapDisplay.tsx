import type { Roadmap } from '@/lib/types';
import { RoadmapLegend } from './RoadmapLegend';
import { RoadmapNode } from './RoadmapNode';

interface RoadmapDisplayProps {
  roadmap: Roadmap;
}

export function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {roadmap.title}
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
          {roadmap.description}
        </p>
      </header>

      <RoadmapLegend legendItems={roadmap.legend} />

      <div className="mt-16">
        {roadmap.sections.map((section, sectionIndex) => (
          <div key={section.title || sectionIndex} className="mb-16">
            {section.title && (
              <div className="relative text-center mb-12">
                <span className="absolute inset-x-0 top-1/2 h-px bg-border -z-10"></span>
                <h2 className="inline-block bg-background px-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {section.title}
                </h2>
              </div>
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
