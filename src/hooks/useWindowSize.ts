import { useState, useEffect, useCallback, useMemo } from 'react';
import { DEFAULT_DELAY } from '../constant';

interface WindowSize {
  width: number;
  height: number;
}

// Hàm debounce
const debounce = (fn: Function, ms = DEFAULT_DELAY) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * A hook return the current window size. It uses a debounce function to prevent unnecessary re-renders.
 *
 * @param {string} debounceMs The number of milliseconds to delay. Default is 300ms.
 * @returns {{ width: number, height: number }} The current window size.
 *
 * @example asgsg
 */
/**
 * A hook that delays updating a value for the specified time.
 *
 * @param debounceMs The number of milliseconds to delay. Default is 300ms.
 * @returns {{ width: number, height: number }} The current window size.
 *
 * @example
 * const {width, height} = useWindowSize(text);
 *
 * // Or with custom delay:
 * // const {width, height} = useWindowSize(text, 500);
 *
 * // useWindowSize will update only if window size doesn't change for delay times (default: 300ms)
 */

export function useWindowSize(debounceMs = DEFAULT_DELAY): WindowSize {
  // Lazy initialization
  const getSize = (): WindowSize => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    return typeof window !== 'undefined' ? getSize() : { width: 0, height: 0 };
  });

  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setWindowSize(getSize());
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const debouncedHandleResize = debounce(() => {
      requestAnimationFrame(handleResize);
    }, debounceMs);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [handleResize, debounceMs]);

  // Memoize the return value
  return useMemo(() => windowSize, [windowSize]);
}
