
import * as React from "react";

const viewDescriptions: Record<'All' | 'Pinned', string> = {
    All: "A collection of powerful, browser-based tools for your daily tasks.",
    Pinned: "Your hand-picked tools for quick and easy access.",
  };
  
const viewTitles: Record<'All' | 'Pinned', string> = {
    All: "All Tools",
    Pinned: "Pinned Tools",
};

interface CategoryHeaderProps {
    activeView: 'All' | 'Pinned';
}

export const CategoryHeader = React.memo(function CategoryHeader({ activeView }: CategoryHeaderProps) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {viewTitles[activeView]}
            </h1>
            <p className="text-muted-foreground mt-1">
              {viewDescriptions[activeView]}
            </p>
        </div>
    );
});
