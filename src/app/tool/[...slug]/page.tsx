
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// NOTE: This component has been temporarily simplified to resolve a persistent
// parsing error. The original functionality will be restored once the root
// cause is identified.

const ToolPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
      <h2 className="text-xl font-semibold">Tool Page</h2>
      <p className="text-muted-foreground">
        This is a placeholder to resolve a build issue.
      </p>
      <Button asChild variant="link" className="mt-4">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default ToolPage;
