"use client";

import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // Initialize state with the initialValue.
  // This is important for SSR/Next.js to avoid hydration errors.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // The setValue function is memoized and uses the functional update form
  // to avoid needing `storedValue` in its dependency array.
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        // Allow value to be a function so we have the same API as useState
        setStoredValue((current) => {
          const valueToStore =
            value instanceof Function ? value(current) : value;

          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }

          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key]
  );

  // This useEffect runs only once on the client side after hydration.
  // It reads the value from localStorage and updates the state.
  // This is the correct way to handle client-side state without causing
  // an infinite loop or hydration mismatch.
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
    }
  // We want this to run only once on mount, so we pass an empty dependency array.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This effect handles the cross-tab sync.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === window.localStorage) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error parsing stored value for key “${key}”:`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  // The key is stable, and we assume initialValue is conceptually static.
  // Adding initialValue to the array would cause the listener to be re-added on every render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue];
}
