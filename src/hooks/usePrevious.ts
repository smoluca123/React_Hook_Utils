import { useEffect, useRef } from 'react';

/**
 * Hook usePrevious
 *
 * Stores and returns the previous value of a variable.
 *
 * @param value The value to track
 * @returns The previous value of the variable
 * @example
 * const [count, setCount] = useState(0);
 * const previousCount = usePrevious(count);
 */

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
