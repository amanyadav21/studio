
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  ChevronLeft,
  Code2,
  Heart,
  Layers,
  LayoutGrid,
  LayoutPanelLeft,
  Palette,
  Plus,
  Search,
  SunMoon,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Button asChild variant="outline">
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to App
            </Link>
          </Button>
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <BookOpen className="h-5 w-5" />
            How to Use LocalOpen
          </h1>
          <div className="w-[115px]" />
        </div>
      </header>
      <main className="container mx-auto max-w-4xl py-12">
        <div className="space-y-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Search className="h-6 w-6 text-primary" />
                Finding Your Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Quickly find any tool using the global search bar at the top of
                the page. Start typing, and the list of tools will instantly
                filter based on their name or description.
              </p>
              <p>
                You can also browse tools by category using the sidebar on the
                left. Click on a category like{' '}
                <Badge variant="secondary">
                  <Code2 className="mr-1 h-3 w-3" />
                  Dev Utilities
                </Badge>{' '}
                to see all related tools.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-red-500" />
                Managing Favorites
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Hover over any tool card and click the{' '}
                <Badge variant="outline">Star</Badge> icon to add it to your
                favorites. This makes it easy to access your most-used tools.
              </p>
              <p>
                Click on the{' '}
                <Badge variant="secondary">
                  <Heart className="mr-1 h-3 w-3" />
                  Favorites
                </Badge>{' '}
                category in the sidebar to view all your favorited tools in one
                place.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Layers className="h-6 w-6 text-primary" />
                Bundling Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                LocalOpen allows you to group multiple tools together into a
                "bundle" for simultaneous use. To add a tool to your current
                bundle, hover over its card and click the{' '}
                <Badge variant="outline">Add to bundle</Badge> icon.
              </p>
              <p>
                Once you've added tools, a bundle bar will appear at the bottom
                of the screen. Click <Badge>Launch Bundle</Badge> to open all
                selected tools.
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I use multiple tools at once?
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 text-muted-foreground">
                    <p>
                      On the bundle page, you can switch between two viewing
                      modes using the header controls:
                    </p>
                    <ul className="list-inside list-disc space-y-1 pl-2">
                      <li>
                        <strong>Single View</strong> (
                        <LayoutPanelLeft className="inline-block h-4 w-4" />
                        ): View one tool at a time and switch between them using
                        tabs.
                      </li>
                      <li>
                        <strong>Parallel View</strong> (
                        <LayoutGrid className="inline-block h-4 w-4" />
                        ): View all bundled tools side-by-side in a
                        split-screen layout. This is great for tasks like
                        converting JSON while taking notes.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Plus className="h-6 w-6 text-green-500" />
                Adding Your Own Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Your toolkit is not limited to the defaults. Click the{' '}
                <Badge>Add Tool</Badge> button in the main header to add any
                website or web app to your collection.
              </p>
              <p>
                Simply provide a name, description, and URL. Your custom tool
                will appear on the dashboard alongside the others, and it's saved
                locally in your browser.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-purple-500" />
                Personalizing Your Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Make LocalOpen your own by customizing the appearance of the
                tool cards.
              </p>
              <ul className="list-inside list-disc space-y-2 pl-2">
                <li>
                  <strong>Card Color</strong> (
                  <Palette className="inline-block h-4 w-4" />
                  ): Click the palette icon in the header to open the color
                  picker. Choose any color to apply it as the background for all
                  tool cards. Click "Reset Color" to go back to the default.
                </li>
                <li>
                  <strong>Theme</strong> (
                  <SunMoon className="inline-block h-4 w-4" />
                  ): Switch between light and dark modes using the theme toggle
                  in the header to match your preference.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
