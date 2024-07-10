import { useEffect } from 'react';
import { DEFAULT_DELAY } from '../constant';
import { useTimeout } from './useTimeout';

export function useDebounceFn<T>(
  fn: (...args: any[]) => T,
  delay: number = DEFAULT_DELAY,
  deps: readonly any[] = []
) {
  const { clear, reset } = useTimeout(fn, delay);
  useEffect(reset, [fn, delay, ...deps]);
  useEffect(clear, []);
}
