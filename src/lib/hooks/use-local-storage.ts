
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";

// This hook is designed to be hydration-safe for Next.js applications.
// It prevents hydration mismatches by initializing with a default value on the server
// and then safely reading from localStorage on the client after the component has mounted.
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false);
  
  // On component mount, we set isMounted to true and read from localStorage.
  // This ensures that we only access localStorage on the client side, after hydration.
  useEffect(() => {
    setIsMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
    }
  }, [key]);

  // When value changes, and if the component is mounted, update localStorage.
  useEffect(() => {
    if (isMounted) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    }
  }, [key, value, isMounted]);

  return [value, setValue];
}
