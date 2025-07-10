
import Link from 'next/link';
import {
  Bookmark,
  Code,
  Smartphone,
  Database,
  BrainCircuit,
  ShieldCheck,
  Briefcase,
  GitBranch,
  Map as MapIcon,
  Palette,
  BotMessageSquare,
  PenTool,
} from 'lucide-react';
import { roadmaps } from '@/data/roadmaps';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const roadmapCategories = [
  {
    title: 'Web Development',
    description: 'Learn to build modern web applications from frontend to backend.',
    icon: <Code className="h-6 w-6" />,
    roadmaps: [
      'frontend',
      'backend',
      'full-stack',
      'devops',
      'postgresql',
    ],
  },
  {
    title: 'AI & Data Science',
    description: 'Dive into the world of artificial intelligence, data analysis, and MLOps.',
    icon: <BrainCircuit className="h-6 w-6" />,
    roadmaps: [
      'ai-engineer',
      'data-analyst',
      'ai-and-data-scientist',
      'mlops',
    ],
  },
  {
    title: 'Mobile & Desktop',
    description: 'Create applications for mobile devices and desktop operating systems.',
    icon: <Smartphone className="h-6 w-6" />,
    roadmaps: ['android', 'ios', 'game-developer'],
  },
  {
    title: 'Specialized Engineering',
    description: 'Explore specialized fields like blockchain, security, and quality assurance.',
    icon: <ShieldCheck className="h-6 w-6" />,
    roadmaps: ['blockchain', 'qa', 'cyber-security'],
  },
  {
    title: 'Product & Design',
    description: 'Focus on user experience, product management, and design principles.',
    icon: <Palette className="h-6 w-6" />,
    roadmaps: ['ux-design', 'product-manager'],
  },
  {
    title: 'Community & Content',
    description: 'Roles centered around community building, content creation, and developer advocacy.',
    icon: <BotMessageSquare className="h-6 w-6" />,
    roadmaps: ['technical-writer', 'developer-relations'],
  },
   {
    title: 'Leadership & Architecture',
    description: 'Guides for senior roles focused on architecture and team leadership.',
    icon: <GitBranch className="h-6 w-6" />,
    roadmaps: ['software-architect', 'engineering-manager'],
  },
];

export default function RoadmapsPage() {
  const roadmapMap = new Map(roadmaps.map((r) => [r.slug, r]));

  return (
    <div className="space-y-16">
      <header className="text-center">
        <Badge
          variant="outline"
          className="mb-6 border-primary/50 text-primary py-1 px-3 text-sm font-semibold"
        >
          <MapIcon className="mr-2 h-4 w-4" />
          Learning Paths
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer Roadmaps
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Step-by-step guides and curated resources to help you learn and
          advance in your developer career.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {roadmapCategories.map((category) => (
          <Card key={category.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
               <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                {category.icon}
              </div>
              <div>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription className="mt-1">{category.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-col gap-3">
                {category.roadmaps
                  .map((slug) => roadmapMap.get(slug))
                  .filter(Boolean)
                  .map((roadmap) => (
                    <Link
                      key={roadmap!.slug}
                      href={`/roadmap/${roadmap!.slug}`}
                      className="group flex items-center gap-3 rounded-md p-2 -m-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Bookmark className="h-4 w-4 flex-shrink-0 text-primary/70 group-hover:text-primary transition-colors" />
                      <span className="flex-grow truncate">{roadmap!.title}</span>
                      {roadmap!.isNew && <Badge>New</Badge>}
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
