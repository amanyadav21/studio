
import * as React from "react";

interface CategoryHeaderProps {
    title: string;
    description: string;
}

export const CategoryHeader = React.memo(function CategoryHeader({ title, description }: CategoryHeaderProps) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {description}
            </p>
        </div>
    );
});
