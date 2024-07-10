import { useEffect } from 'react';
import { DEFAULT_DELAY } from '../constant';
import { useTimeout } from './useTimeout';

/**
 *
 * @param fn The function to debounce.
 * @param delay The delay in milliseconds. Default is 300ms.
 * @param deps The dependencies array.
 * @example
 * const debouncedFn = useDebounceFn(() => console.log('Debounced'),500, [someValue]  // Depends on someValue to trigger the debouncing.)
 *
 */

export function useDebounceFn<T>(
  fn: (...args: any[]) => T,
  delay: number = DEFAULT_DELAY,
  deps: readonly any[] = []
) {
  const { clear, reset } = useTimeout(fn, delay);
  useEffect(reset, [fn, delay, ...deps]);
  useEffect(clear, []);
}
