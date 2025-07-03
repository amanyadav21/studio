
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

// This hook has been re-architected for maximum stability by removing the
// cross-tab synchronization feature that was causing data corruption and race conditions.
// State is now managed reliably within a single browser tab.

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // 1. Initialize state from localStorage. This runs only once on the client.
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // 2. Persist state to localStorage whenever it changes.
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  // 3. Return the state and the setter function from useState.
  // React guarantees that the setter function identity is stable and won't
  // change on re-renders, making it safe to use in dependency arrays.
  return [storedValue, setStoredValue];
}
