
"use client";

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

// A custom event to trigger state updates across hooks on the same page,
// as the 'storage' event only works for other tabs.
const CUSTOM_STORAGE_EVENT_NAME = 'onLocalStorageChange';

declare global {
  interface WindowEventMap {
    [CUSTOM_STORAGE_EVENT_NAME]: CustomEvent<{ key: string; value: any }>;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // State to store our value. We use a lazy initializer to read from localStorage
  // only on the client, which prevents hydration mismatches with server rendering.
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

  // The setter function is wrapped in useCallback to ensure it is stable and
  // doesn't change on every render, preventing unnecessary re-renders in consumer components.
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        // The `setStoredValue` from `useState` can take a function,
        // which receives the current state. This avoids needing `storedValue` in the dependencies.
        setStoredValue(currentValue => {
            const valueToStore = value instanceof Function ? value(currentValue) : value;
            
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                // Dispatch a custom event so other instances of the hook on the same page can sync up.
                window.dispatchEvent(
                    new CustomEvent(CUSTOM_STORAGE_EVENT_NAME, {
                    detail: { key, value: valueToStore },
                    })
                );
            }
            return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key]
  );

  // This effect synchronizes state across browser tabs (via 'storage' event)
  // and within the same page (via our custom event).
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
        const eventKey = 'detail' in event ? event.detail.key : event.key;
        if(eventKey !== key) return;
        
        try {
            const newValue = 'detail' in event 
                ? event.detail.value 
                : (event.newValue ? JSON.parse(event.newValue) : initialValue);
            setStoredValue(newValue);
        } catch (error) {
            console.warn(`Error handling storage change for key “${key}”:`, error);
        }
    };

    window.addEventListener(CUSTOM_STORAGE_EVENT_NAME, handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener(CUSTOM_STORAGE_EVENT_NAME, handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}
