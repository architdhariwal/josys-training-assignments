import { useState, useEffect } from 'react';

interface StorageOperations<T> {
  item: T | null;
  setItem: (value: T) => void;
  removeItem: () => void;
  clear: () => void;
}

export function useStorage<T>(key: string, initialValue?: T): StorageOperations<T> {
  const [item, setStoredItem] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue || null;
    }
  });

  useEffect(() => {
    if (item === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(item));
    }
  }, [key, item]);

  const setItem = (value: T) => {
    setStoredItem(value);
  };

  const removeItem = () => {
    setStoredItem(null);
  };

  const clear = () => {
    window.localStorage.clear();
    setStoredItem(null);
  };

  return {
    item,
    setItem,
    removeItem,
    clear
  };
}