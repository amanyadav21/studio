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
  Map,
  Palette,
  BotMessageSquare,
  PenTool,
} from 'lucide-react';
import { roadmaps } from '@/data/roadmaps';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
          <Map className="mr-2 h-4 w-4" />
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

      <div className="space-y-12">
        {roadmapCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {category.icon}
              </div>
              <div>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.roadmaps
                  .map((slug) => roadmapMap.get(slug))
                  .filter(Boolean)
                  .map((roadmap) => (
                    <Button
                      key={roadmap!.slug}
                      variant="outline"
                      asChild
                      className="justify-start gap-2 h-auto py-2"
                    >
                      <Link href={`/roadmap/${roadmap!.slug}`}>
                        <Bookmark className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{roadmap!.title}</span>
                        {roadmap!.isNew && <Badge className="ml-auto">New</Badge>}
                      </Link>
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
