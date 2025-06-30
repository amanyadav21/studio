import Link from "next/link";
import { tools } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { AppLogo } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const isBundle = matchedTools.length > 1;

  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <header className="flex h-16 w-full flex-shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-3">
            <AppLogo className="h-7 w-7 text-muted-foreground" />
            <span className="text-lg font-semibold">
              {matchedTools.map((t) => t?.name).join(" & ")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isBundle ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <span>Open Tool</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {matchedTools.map(
                  (tool) =>
                    tool && (
                      <DropdownMenuItem key={tool.id} asChild>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex cursor-pointer items-center justify-between"
                        >
                          <span>{tool.name}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      </DropdownMenuItem>
                    )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            matchedTools[0] && (
              <Button asChild variant="outline">
                <a
                  href={matchedTools[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in new tab
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )
          )}
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
