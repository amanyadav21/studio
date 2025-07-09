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
  const getLegendItemClasses = (className: string) => {
    switch (className) {
      case 'recommended':
        return 'bg-purple-500/20 border-purple-500';
      case 'alternative':
        return 'bg-green-500/20 border-green-500';
      case 'optional':
        return 'bg-muted border-muted-foreground/50';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="p-6 border rounded-xl bg-card/50 backdrop-blur-sm">
      <h3 className="text-lg font-bold mb-4">Legend</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
        {legendItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div
              className={cn(
                'w-5 h-5 shrink-0 rounded-md border-2',
                getLegendItemClasses(item.className)
              )}
            />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
