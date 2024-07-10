import { useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IUseAsyncReturnType<T = any> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}

/**
 *
 * @param callback the async function to call
 * @param deps the dependencies of the callback function. The callback will only be called if any of these dependencies change.
 * @returns [object] isLoading, error, and data properties.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsync<T = any>(
  callback: () => Promise<T>,
  deps: any[] = []
): IUseAsyncReturnType<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const callbackMemo = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setData(null);
    callback()
      .then((result: T) => {
        setData(result);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    callbackMemo();
  }, [callbackMemo]);

  return { isLoading, error, data };
}
