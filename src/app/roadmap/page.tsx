import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { roadmaps } from '@/data/roadmaps';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RoadmapsPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Developer Roadmaps
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Step-by-step guides and paths to becoming a developer, with curated tools from our collection.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {roadmaps.map((roadmap) => (
          <Card key={roadmap.slug} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{roadmap.title}</CardTitle>
              <CardDescription>{roadmap.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/roadmap/${roadmap.slug}`}>
                  View Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
