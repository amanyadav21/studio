
import Link from 'next/link';
import {
  Code,
  Server,
  CloudCog,
  Layers,
  BrainCircuit,
  BarChartBig,
  FlaskConical,
  Smartphone,
  Apple,
  Database,
  Link as LinkIcon,
  CheckCircle,
  ShieldCheck,
  Lock,
  Palette,
  Gamepad2,
  BookUser,
  BotMessageSquare,
  PenTool,
  ArrowRight,
} from 'lucide-react';
import { roadmaps } from '@/data/roadmaps';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const roadmapIcons: Record<string, { icon: ReactNode; className: string }> = {
  frontend: {
    icon: <Code className="h-6 w-6" />,
    className: 'bg-blue-500/10 text-blue-400',
  },
  backend: {
    icon: <Server className="h-6 w-6" />,
    className: 'bg-green-500/10 text-green-400',
  },
  'full-stack': {
    icon: <Layers className="h-6 w-6" />,
    className: 'bg-purple-500/10 text-purple-400',
  },
  devops: {
    icon: <CloudCog className="h-6 w-6" />,
    className: 'bg-orange-500/10 text-orange-400',
  },
  postgresql: {
    icon: <Database className="h-6 w-6" />,
    className: 'bg-sky-500/10 text-sky-400',
  },
  'ai-engineer': {
    icon: <BrainCircuit className="h-6 w-6" />,
    className: 'bg-rose-500/10 text-rose-400',
  },
  'data-analyst': {
    icon: <BarChartBig className="h-6 w-6" />,
    className: 'bg-teal-500/10 text-teal-400',
  },
  'ai-and-data-scientist': {
    icon: <FlaskConical className="h-6 w-6" />,
    className: 'bg-pink-500/10 text-pink-400',
  },
  mlops: {
    icon: <BotMessageSquare className="h-6 w-6" />,
    className: 'bg-indigo-500/10 text-indigo-400',
  },
  android: {
    icon: <Smartphone className="h-6 w-6" />,
    className: 'bg-emerald-500/10 text-emerald-400',
  },
  ios: {
    icon: <Apple className="h-6 w-6" />,
    className: 'bg-slate-400/10 text-slate-300',
  },
  'game-developer': {
    icon: <Gamepad2 className="h-6 w-6" />,
    className: 'bg-amber-500/10 text-amber-400',
  },
  blockchain: {
    icon: <LinkIcon className="h-6 w-6" />,
    className: 'bg-yellow-500/10 text-yellow-400',
  },
  qa: {
    icon: <CheckCircle className="h-6 w-6" />,
    className: 'bg-lime-500/10 text-lime-400',
  },
  'cyber-security': {
    icon: <Lock className="h-6 w-6" />,
    className: 'bg-red-500/10 text-red-400',
  },
  'ux-design': {
    icon: <Palette className="h-6 w-6" />,
    className: 'bg-violet-500/10 text-violet-400',
  },
  'product-manager': {
    icon: <BookUser className="h-6 w-6" />,
    className: 'bg-cyan-500/10 text-cyan-400',
  },
  'technical-writer': {
    icon: <PenTool className="h-6 w-6" />,
    className: 'bg-fuchsia-500/10 text-fuchsia-400',
  },
  'developer-relations': {
    icon: <BotMessageSquare className="h-6 w-6" />,
    className: 'bg-indigo-500/10 text-indigo-400',
  },
  'software-architect': {
    icon: <BotMessageSquare className="h-6 w-6" />,
    className: 'bg-gray-400/10 text-gray-300',
  },
  'engineering-manager': {
    icon: <ShieldCheck className="h-6 w-6" />,
    className: 'bg-blue-500/10 text-blue-400',
  },
};

export default function RoadmapsPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Role Based Roadmaps
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your ultimate guide to mastering new skills. Curated step-by-step
          paths for every role in the tech industry.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {roadmaps.map((roadmap) => {
          const { icon, className } = roadmapIcons[roadmap.slug] || {
            icon: <Code className="h-6 w-6" />,
            className: 'bg-gray-500/10 text-gray-400',
          };
          return (
            <Link
              key={roadmap.slug}
              href={`/roadmap/${roadmap.slug}`}
              passHref
              className="group"
            >
              <Card className="relative flex flex-col h-full bg-card/60 hover:bg-card/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {roadmap.isNew && (
                  <Badge variant="outline" className="absolute top-3 right-3 border-blue-500/50 bg-blue-500/10 text-blue-400 z-10">NEW</Badge>
                )}
                <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                  <div className={cn('flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg', className)}>
                    {icon}
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">{roadmap.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {roadmap.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center gap-1 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                    <span>Explore Path</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
