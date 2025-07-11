import {
  Code,
  Server,
  BrainCircuit,
  Palette,
  GraduationCap,
  Zap,
  Package as PackageIcon,
  Check,
} from 'lucide-react';
import type { Package } from '@/lib/types';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const packageIcons: Record<string, { icon: ReactNode; className: string }> = {
  Code: {
    icon: <Code className="h-6 w-6" />,
    className: 'bg-blue-500/10 text-blue-400',
  },
  Server: {
    icon: <Server className="h-6 w-6" />,
    className: 'bg-green-500/10 text-green-400',
  },
  BrainCircuit: {
    icon: <BrainCircuit className="h-6 w-6" />,
    className: 'bg-rose-500/10 text-rose-400',
  },
  Palette: {
    icon: <Palette className="h-6 w-6" />,
    className: 'bg-violet-500/10 text-violet-400',
  },
  GraduationCap: {
    icon: <GraduationCap className="h-6 w-6" />,
    className: 'bg-orange-500/10 text-orange-400',
  },
  Zap: {
    icon: <Zap className="h-6 w-6" />,
    className: 'bg-yellow-500/10 text-yellow-400',
  },
  Default: {
    icon: <PackageIcon className="h-6 w-6" />,
    className: 'bg-gray-500/10 text-gray-400',
  },
};

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const { icon, className } = packageIcons[pkg.icon] || packageIcons.Default;
  return (
    <Card className="flex flex-col h-full bg-card/60 hover:bg-card/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex-row items-start gap-4 space-y-0 p-6">
        <div className={cn('flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg', className)}>
          {icon}
        </div>
        <div>
          <CardTitle>{pkg.title}</CardTitle>
          <CardDescription className="mt-1 line-clamp-2">
            {pkg.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Includes:</h4>
        <ul className="space-y-2">
            {pkg.tools.map((tool, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-card-foreground">{tool}</span>
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
