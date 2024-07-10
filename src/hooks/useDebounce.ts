import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * A hook that delays updating a value for the specified time.
 *
 * @param value The value to debounce.
 * @param delay The number of milliseconds to delay. Default is 300ms.
 * @returns The debounced value.
 *
 * @example
 * const [text, setText] = useState('');
 * const debouncedText = useDebounce(text);
 *
 * // Or with custom delay:
 * // const debouncedText = useDebounce(text, 500);
 *
 * // debouncedText will update only if text doesn't change for delay times (default: 300ms)
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const valueRef = useRef<T>(value);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const debouncedSetValue = useCallback(() => {
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(valueRef.current);
    }, delay || 300);
  }, [delay, clearTimer]);

  useEffect(() => {
    valueRef.current = value;
    debouncedSetValue();

    return clearTimer;
  }, [value, debouncedSetValue, clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return debouncedValue;
}
