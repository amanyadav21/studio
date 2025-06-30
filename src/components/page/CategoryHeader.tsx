
import type { Category } from "@/lib/types";

interface CategoryHeaderProps {
    selectedCategory: Category;
}

export function CategoryHeader({ selectedCategory }: CategoryHeaderProps) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {selectedCategory}
            </h1>
            <p className="text-muted-foreground mt-1">
              {selectedCategory === "Favorites"
                ? "Your favorite tools for quick access."
                : `Browse all tools in the ${selectedCategory} category.`}
            </p>
        </div>
    );
}
