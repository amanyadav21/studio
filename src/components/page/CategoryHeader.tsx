
import type { Category } from "@/lib/types";
import * as React from "react";

const categoryDescriptions: Partial<Record<Category, string>> = {
    All: "A collection of powerful, browser-based tools for your daily tasks.",
    Favorites: "Your hand-picked tools for quick and easy access.",
    "Dev Utilities": "Tools for developers to format, test, and debug code.",
    "Design & UI Tools": "Generate palettes, shapes, and assets for your designs.",
    "Writing & Notes": "Markdown editors and notepads that work offline.",
    "Productivity Tools": "Timers, to-do lists, and utilities to help you focus.",
    "Utility Tools": "A variety of converters and generators for everyday use.",
  };

interface CategoryHeaderProps {
    selectedCategory: Category;
}

export const CategoryHeader = React.memo(function CategoryHeader({ selectedCategory }: CategoryHeaderProps) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {selectedCategory}
            </h1>
            <p className="text-muted-foreground mt-1">
              {categoryDescriptions[selectedCategory] || `Browse all tools in the ${selectedCategory} category.`}
            </p>
        </div>
    );
});
