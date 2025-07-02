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
  // only on the client, which prevents hydration mismatches.
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

  // This setter function is stable because its dependency (key) does not change.
  // It uses a functional update for setting state, so it doesn't need 'storedValue'
  // from its outer scope, preventing re-renders.
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        setStoredValue(currentValue => {
            const valueToStore = value instanceof Function ? value(currentValue) : value;

            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
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

  // This effect synchronizes state across browser tabs and within the same page.
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
