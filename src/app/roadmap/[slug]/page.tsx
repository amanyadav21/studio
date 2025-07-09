import { notFound } from 'next/navigation';
import { roadmaps } from '@/data/roadmaps';
import { RoadmapDisplay } from '@/components/roadmap/RoadmapDisplay';

interface RoadmapPageProps {
  params: {
    slug: string;
  };
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const roadmap = roadmaps.find((r) => r.slug === params.slug);

  if (!roadmap) {
    notFound();
  }

  return <RoadmapDisplay roadmap={roadmap} />;
}

export function generateStaticParams() {
  return roadmaps.map((roadmap) => ({
    slug: roadmap.slug,
  }));
}
