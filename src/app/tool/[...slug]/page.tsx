import Link from "next/link";
import { tools } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { AppLogo } from "@/components/icons";

export default function ToolPage({ params }: { params: { slug: string[] } }) {
  const toolIds = params.slug || [];
  const matchedTools = toolIds
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean);

  if (matchedTools.length === 0) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
        <h2 className="text-xl font-semibold">Tool not found</h2>
        <p className="text-muted-foreground">
          The tool you are looking for does not exist.
        </p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <header className="flex h-14 w-full flex-shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-8 w-8">
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <AppLogo className="h-6 w-6 text-muted-foreground" />
            <span className="font-semibold">
              {matchedTools.map((t) => t?.name).join(" & ")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           {matchedTools.map(tool => tool && (
              <Button asChild key={tool.id} variant="ghost" size="sm">
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  Open {tool.name} in new tab
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
           ))}
        </div>
      </header>
      <main className="flex flex-1">
        {matchedTools.map((tool) =>
          tool ? (
            <div
              key={tool.id}
              className="flex-1 border-l border-border first:border-l-0"
            >
              <iframe
                src={tool.url}
                title={tool.name}
                className="h-full w-full"
                sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
              />
            </div>
          ) : null
        )}
      </main>
    </div>
  );
}
