import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import type { ComponentProps } from 'react';

interface LegendItem {
  title: string;
  className: string;
  description: string;
}

interface RoadmapLegendProps {
  legendItems: LegendItem[];
}

const LegendIcon = ({ className, ...props }: ComponentProps<typeof CheckCircle2>) => {
  return <CheckCircle2 className={cn("h-6 w-6 shrink-0", className)} {...props} />
}

export function RoadmapLegend({ legendItems }: RoadmapLegendProps) {
  const ICONS: Record<string, React.ReactNode> = {
    recommended: <LegendIcon className="text-purple-500" />,
    alternative: <LegendIcon className="text-green-500" />,
    optional: <LegendIcon className="text-muted-foreground" />,
  };

  return (
    <div className="p-6 border rounded-xl bg-card/50 backdrop-blur-sm">
      <h3 className="text-lg font-bold mb-4">Legend</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
        {legendItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            {ICONS[item.className] ? (
              ICONS[item.className]
            ) : (
              <div
                className={cn('w-5 h-5 shrink-0 rounded-md border-2', item.className)}
              />
            )}
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
