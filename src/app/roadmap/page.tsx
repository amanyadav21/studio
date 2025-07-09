import Link from 'next/link';
import { Bookmark, Map } from 'lucide-react';
import { roadmaps } from '@/data/roadmaps';
import { Badge } from '@/components/ui/badge';

export default function RoadmapsPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <Badge variant="outline" className="mb-6 border-primary/50 text-primary py-1 px-3 text-sm font-semibold">
            <Map className="mr-2 h-4 w-4" />
            Learning Paths
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer Roadmaps
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Step-by-step guides and curated resources to help you learn and advance in your developer career.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roadmaps.map((roadmap) => (
          <Link
            key={roadmap.slug}
            href={`/roadmap/${roadmap.slug}`}
            className="group flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all duration-200 ease-in-out hover:border-primary/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold">{roadmap.title}</span>
              {roadmap.isNew && <Badge>New</Badge>}
            </div>
            <Bookmark className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
