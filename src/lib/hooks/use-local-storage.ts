
"use client";

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

// This hook has been simplified to remove faulty custom event logic that was causing
// race conditions and data corruption. It now uses the standard 'storage' event
// for robust cross-tab synchronization.

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
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

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        // Use the functional update form of useState's setter to ensure we always
        // have the latest state, preventing race conditions.
        setStoredValue((currentValue) => {
          const valueToStore =
            value instanceof Function ? value(currentValue) : value;
          
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            // The 'storage' event will automatically be fired in other tabs,
            // which is handled by the useEffect below.
          }
          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          // When storage changes in another tab, update the state here.
          // If the item was removed, newValue will be null, so we fall back to initialValue.
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error handling storage change for key “${key}”:`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    // initialValue is required here to ensure that if the component is remounted
    // with a different initialValue, it gets the correct state.
  }, [key, initialValue]);

  return [storedValue, setValue];
}
