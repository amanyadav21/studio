
"use client";

import * as React from 'react';
import {
  BookOpen,
  ChevronLeft,
  Layers,
  LayoutGrid,
  LayoutPanelLeft,
  Palette,
  Search,
  Star,
  SunMoon,
  Rocket,
  Pin,
  PlusCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

// Define the structure for each documentation section
interface FeatureDoc {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

// Content for each feature
const features: FeatureDoc[] = [
  {
    id: 'finding-tools',
    title: 'Finding Your Tools',
    icon: Search,
    content: (
      <>
        <p className="text-lg text-muted-foreground">
          Quickly locate any tool you need using our powerful search and intuitive categorization.
        </p>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Global Search</h3>
            <p className="text-muted-foreground">
              Use the global search bar at the top of the page to instantly find any tool by its name or description. The search is designed to be fast and fuzzy, so you don't have to be exact. Just start typing, and results will appear instantly.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Browsing by Category</h3>
            <p className="text-muted-foreground">
              All tools are organized into logical categories like "Dev Utilities," "Design & UI Tools," and "Frameworks & Libraries." Simply click on a category in the sidebar to view all the tools within that group.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'managing-favorites',
    title: 'Managing Favorites',
    icon: Star,
    content: (
      <>
        <p className="text-lg text-muted-foreground">
          Keep your most-used tools just a click away by adding them to your favorites.
        </p>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Pinning a Tool</h3>
            <p className="text-muted-foreground">
              Hover over any tool card, and you'll see a <Pin className="inline-block h-4 w-4" /> icon appear. Click it to "pin" the tool. The icon will fill in, indicating it's now a favorite.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Accessing Pinned Tools</h3>
            <p className="text-muted-foreground">
              Click on the "Pinned" category at the top of the sidebar to see a dedicated view of all your favorite tools. This is the fastest way to get to the tools you use every day. To unpin a tool, simply click the pin icon again.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'bundling-tools',
    title: 'Bundling Tools',
    icon: Layers,
    content: (
       <>
        <p className="text-lg text-muted-foreground">
          Combine multiple tools into a single "bundle" for powerful, side-by-side workflows.
        </p>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Creating a Bundle</h3>
            <p className="text-muted-foreground">
              Hover over a tool and click the <PlusCircle className="inline-block h-4 w-4" /> icon to add it to your current bundle. You'll see a "Bundle Bar" appear at the bottom of the screen showing the tools you've selected.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Launching a Bundle</h3>
            <p className="text-muted-foreground">
              Once you've added all the tools you need, click the <Rocket className="inline-block h-4 w-4" /> "Launch Bundle" button in the Bundle Bar. This will open all selected tools in a new view.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'multi-tool-views',
    title: 'Multi-Tool Views',
    icon: LayoutGrid,
    content: (
       <>
        <p className="text-lg text-muted-foreground">
          When you launch a bundle of tools, you have two powerful ways to view them.
        </p>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Single View</h3>
            <p className="text-muted-foreground">
              The default view is a tabbed interface. Use the tabs at the top (or in the floating sidebar) to switch between your open tools, giving each one the full screen space. This is represented by the <LayoutPanelLeft className="inline-block h-4 w-4" /> icon.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Parallel View</h3>
            <p className="text-muted-foreground">
              For ultimate productivity, switch to Parallel View by clicking the <LayoutGrid className="inline-block h-4 w-4" /> icon in the floating sidebar. This splits the screen, allowing you to see and interact with multiple tools simultaneously. This is perfect for tasks like comparing code, referencing documentation while writing, or converting data from one format to another.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'personalization',
    title: 'Personalization',
    icon: Palette,
    content: (
       <>
        <p className="text-lg text-muted-foreground">
          Customize the look and feel of your LocalOpen dashboard to match your preferences.
        </p>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Dark/Light Theme</h3>
            <p className="text-muted-foreground">
              Switch between a light and dark theme using the <SunMoon className="inline-block h-4 w-4" /> theme toggle in the main header. The app will remember your choice for your next visit.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Custom Card Colors</h3>
            <p className="text-muted-foreground">
              Use the <Palette className="inline-block h-4 w-4" /> color picker in the header to set a custom background color for all tool cards. This allows you to personalize the dashboard to your liking. The app automatically ensures the text color contrasts correctly for readability.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

export default function DocsPage() {
  const [selectedFeatureId, setSelectedFeatureId] = React.useState<string>(features[0].id);

  const selectedFeature = features.find(f => f.id === selectedFeatureId) || features[0];
  const SelectedIcon = selectedFeature.icon;

  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-start">
          <Button asChild variant="outline">
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to App
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto flex max-w-7xl gap-16 py-12 px-6">
        <aside className="hidden w-64 flex-shrink-0 md:block">
          <div className="sticky top-28">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              App Features
            </h3>
            <nav className="flex flex-col gap-1">
              {features.map((feature) => (
                <Button
                  key={feature.id}
                  variant={selectedFeatureId === feature.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFeatureId(feature.id)}
                >
                  <feature.icon className="mr-3 h-4 w-4" />
                  {feature.title}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="max-w-3xl">
            <div className="mb-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SelectedIcon className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">{selectedFeature.title}</h1>
            </div>
            <div className="space-y-6 text-base">
                {selectedFeature.content}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
