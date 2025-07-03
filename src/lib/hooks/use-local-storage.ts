
"use client";

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

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

  // 2. The setter function. It is the single source of truth for updates.
  // It updates the React state, and a side effect persists it to localStorage.
  // The empty dependency array ensures this function is stable and doesn't
  // cause unnecessary re-renders in child components.
  const setValue: Dispatch<SetStateAction<T>> = useCallback((value) => {
    setStoredValue(value);
  }, []);

  // 3. Persist state to localStorage whenever it changes. This effect
  // decouples the state update from the side-effect of writing to storage.
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}
