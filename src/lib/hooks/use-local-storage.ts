"use client";

import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

// Custom event to trigger state updates across hooks on the same page,
// as the 'storage' event only works for other tabs.
const CUSTOM_STORAGE_EVENT_NAME = 'onLocalStorageChange';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // This state is initialized on the client, preventing hydration mismatches.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Effect to read the value from localStorage on mount.
  // This runs only on the client-side after initial render.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // A stable setter function that updates state, localStorage, and notifies other hooks/tabs.
  // It is wrapped in useCallback with only `key` as a dependency to ensure it is stable
  // and doesn't cause re-renders for components that depend on it.
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        // We use a functional update to ensure we have the latest previous value.
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Dispatch a custom event to notify other instances of this hook on the same page.
          window.dispatchEvent(new CustomEvent(CUSTOM_STORAGE_EVENT_NAME, { detail: { key, value: valueToStore } }));
          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key]
  );

  // This effect handles synchronization across browser tabs and within the same page.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      const eventKey = 'detail' in event ? event.detail.key : event.key;
      
      if (eventKey === key) {
        try {
          const newValue = 'detail' in event 
            ? event.detail.value 
            : event.newValue ? JSON.parse(event.newValue) : initialValue;
          
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error parsing stored value for key “${key}”:`, error);
        }
      }
    };
    
    // Listen to our custom event for same-page updates.
    window.addEventListener(CUSTOM_STORAGE_EVENT_NAME, handleStorageChange);
    // Listen to the standard 'storage' event for cross-tab updates.
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
