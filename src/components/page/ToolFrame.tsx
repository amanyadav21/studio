
import * as React from 'react';
import type { Tool } from '@/lib/types';

interface ToolFrameProps {
  tool: Tool;
}

export const ToolFrame = React.memo(function ToolFrame({ tool }: ToolFrameProps) {
  return (
    <iframe
      src={tool.url}
      title={tool.name}
      className="h-full w-full border-0"
    />
  );
});
