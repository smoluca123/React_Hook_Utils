import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((prevValue: T) => T);

/**
 * Custom hook to manage state in localStorage.
 *
 * @template T The data type of the stored value
 * @param {string} key The key to store and retrieve the value from localStorage
 * @param {T} initialValue The initial value if no value exists in localStorage
 * @returns {[T, (value: SetValue<T>) => void]} An array containing the current value and a function to update the value
 *
 * @example
 * const [name, setName] = useLocalStorage('name', 'John Doe');
 * // Use name as a normal state
 * // Call setName to update both state and localStorage
 */

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  // Hàm để lấy giá trị từ localStorage
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // State để lưu trữ giá trị hiện tại
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Hàm để cập nhật cả state và localStorage
  const setValue = useCallback(
    (value: SetValue<T>) => {
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a client`
        );
      }

      try {
        // Cho phép value là một function
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Lưu vào state
        setStoredValue(newValue);

        // Lưu vào localStorage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        }

        // Kích hoạt sự kiện để các tab/window khác có thể lắng nghe
        window.dispatchEvent(new Event('local-storage'));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    // Lắng nghe sự thay đổi trong localStorage
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [readValue]);

  return [storedValue, setValue];
}
