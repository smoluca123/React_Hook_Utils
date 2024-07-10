import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IUseAsyncReturnType, useAsync } from './useAsync';

interface IUseFetchReturnType<T> extends IUseAsyncReturnType<T> {}

/**
 *
 * @param url the URL to fetch data from
 * @param options the AxiosRequestConfig to pass to axios instance. If not provided, a default axios instance will be used
 * @param deps the dependencies of the fetch request. The fetch request will only be called if any of these dependencies change
 * @param axiosIntance the axios instance to use for the fetch request. If not provided, a default axios instance will be used
 * @returns [object] isLoading, error, and data properties. If the request fails, the error will be thrown.
 *
 * @example
 * const { isLoading, error, data } = useFetch<Array<{ id: number; name:string }>>('https://jsonplaceholder.typicode.com/posts');
 */

export function useFetch<T>(
  url: string,
  options: AxiosRequestConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = [],
  axiosIntance?: AxiosInstance
): IUseFetchReturnType<T> {
  return useAsync<T>(() => {
    return (async () => {
      try {
        const intance = axiosIntance || axios;
        const response = await intance({ url, ...options });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    })();
  }, deps);
}
