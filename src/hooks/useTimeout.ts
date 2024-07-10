import { useCallback, useEffect, useRef } from 'react';
import { DEFAULT_DELAY } from '../constant';

/**
 *
 * @param callback The callback function to be executed after the delay.
 * @param delay The delay in milliseconds. Default is 300ms.
 * @returns [clear, reset] - The clear function to cancel the timeout, and the reset function to restart the
 * @example
 * const [clear, reset] = useTimeout(() => console.log('Hello, timeout'), 5000);
 */

export function useTimeout(
  callback: () => void,
  delay: number = DEFAULT_DELAY
) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [delay]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    set();
    return clear;
  }, [set, clear, delay]);
  return { clear, reset };
}
