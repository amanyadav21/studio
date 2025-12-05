"use client";

import * as React from "react";
import type { Tool } from "@/lib/types";

// Cache for search results
const searchCache = new Map<string, Tool[]>();
const CACHE_SIZE_LIMIT = 100;

// Debounced search hook with caching
export function useOptimizedSearch(tools: Tool[], searchTerm: string, delay = 300) {
  const [debouncedTerm, setDebouncedTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  // Debounce the search term
  React.useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsSearching(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  // Memoized search with caching
  const searchResults = React.useMemo(() => {
    if (!debouncedTerm) return tools;

    const lowercasedTerm = debouncedTerm.toLowerCase();
    
    // Check cache first
    if (searchCache.has(lowercasedTerm)) {
      return searchCache.get(lowercasedTerm)!;
    }

    // Perform search
    const results = tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(lowercasedTerm) ||
        tool.description.toLowerCase().includes(lowercasedTerm) ||
        tool.category.toLowerCase().includes(lowercasedTerm) ||
        (tool.subcategory && tool.subcategory.toLowerCase().includes(lowercasedTerm))
    );

    // Cache results (with size limit)
    if (searchCache.size >= CACHE_SIZE_LIMIT) {
      // Remove oldest entry
      const firstKey = searchCache.keys().next().value;
      if (firstKey) {
        searchCache.delete(firstKey);
      }
    }
    searchCache.set(lowercasedTerm, results);

    return results;
  }, [tools, debouncedTerm]);

  return { searchResults, isSearching, debouncedTerm };
}

// Clear cache when tools data changes
export function clearSearchCache() {
  searchCache.clear();
}