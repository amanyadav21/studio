
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  ChevronLeft,
  Layers,
  LayoutGrid,
  LayoutPanelLeft,
  Palette,
  Plus,
  Search,
  Star,
  SunMoon,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export default function DocsPage() {
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
      <main className="container mx-auto max-w-5xl py-12 px-6 sm:py-16">
        <div className="mb-16 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            How to Use LocalOpen
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A quick guide to help you get the most out of your instant web
            toolkit.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <CardTitle>Finding Your Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              <p>
                Use the global search bar to instantly find any tool by name or
                description. You can also browse by category in the sidebar.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400/10 text-amber-500">
                <Star className="h-6 w-6" />
              </div>
              <CardTitle>Managing Favorites</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              <p>
                Click the{' '}
                <Star className="inline-block h-4 w-4 fill-amber-400 text-amber-500" />{' '}
                icon on any tool to add it to your favorites for quick access.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-6 w-6" />
              </div>
              <CardTitle>Bundling Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              <p>
                Group multiple tools into a "bundle" by clicking the{' '}
                <Plus className="inline-block h-4 w-4" /> icon. Launch them all
                at once from the bundle bar.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <CardTitle>Multi-Tool Views</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              <p>
                When you launch a bundle, switch between{' '}
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-1"
                >
                  <LayoutPanelLeft className="h-3 w-3" />
                  Single
                </Badge>{' '}
                and{' '}
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-1"
                >
                  <LayoutGrid className="h-3 w-3" />
                  Parallel
                </Badge>{' '}
                views.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Plus className="h-6 w-6" />
              </div>
              <CardTitle>Adding Your Own Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              <p>
                Expand your toolkit by clicking the <Badge>Add Tool</Badge>{' '}
                button. Your custom tools are saved locally in your browser.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Palette className="h-6 w-6" />
              </div>
              <CardTitle>Personalization</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              <p>
                Customize the dashboard using the{' '}
                <SunMoon className="inline-block h-4 w-4" /> theme toggle and the{' '}
                <Palette className="inline-block h-4 w-4" /> color picker for
                tool cards.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
