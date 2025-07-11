import { packages } from '@/data/packages';
import { PackageCard } from '@/components/packages/PackageCard';

export default function PackagesPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tool Packages
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Curated bundles of the best tools to kickstart your projects and learning.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.slug} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
