"use client";

import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

// A custom event to trigger state updates across hooks
const CUSTOM_STORAGE_EVENT_NAME = 'onLocalStorageChange';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // This state is initialized on the client, preventing hydration mismatches.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Memoize the setter function to avoid unnecessary re-renders.
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      // Allow value to be a function, mirroring useState's API.
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update state and localStorage.
      setStoredValue(valueToStore);
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Dispatch a custom event to notify other instances of this hook.
          window.dispatchEvent(new StorageEvent('storage', { key }));
          window.dispatchEvent(new CustomEvent(CUSTOM_STORAGE_EVENT_NAME, { detail: { key, value: valueToStore } }));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );
  
  // This effect runs once on component mount to load the initial value
  // from localStorage, ensuring it's only done on the client-side.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        // If no value is in localStorage, set the initial value.
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      // Fallback to initialValue if parsing fails.
      setStoredValue(initialValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures this runs only once.

  // This effect handles synchronization across browser tabs.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      const eventKey = 'detail' in event ? event.detail.key : event.key;
      if (eventKey === key) {
        try {
          if ('detail' in event) {
             setStoredValue(event.detail.value);
          } else {
            const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
            setStoredValue(newValue);
          }
        } catch (error) {
          console.warn(`Error parsing stored value for key “${key}”:`, error);
        }
      }
    };
    
    // Listen to both the standard 'storage' event and our custom event.
    window.addEventListener(CUSTOM_STORAGE_EVENT_NAME, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listeners on component unmount.
    return () => {
      window.removeEventListener(CUSTOM_STORAGE_EVENT_NAME, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue];
}
