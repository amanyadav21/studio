import { cn } from '@/lib/utils';

interface LegendItem {
  title: string;
  className: string;
  description: string;
}

interface RoadmapLegendProps {
  legendItems: LegendItem[];
}

export function RoadmapLegend({ legendItems }: RoadmapLegendProps) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-3">Legend</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {legendItems.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div
              className={cn('w-12 h-6 mt-1 shrink-0 rounded-md border-2', item.className)}
            />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
