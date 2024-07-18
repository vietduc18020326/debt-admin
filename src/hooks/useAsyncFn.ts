import { DependencyList, useCallback, useState } from "react";

type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never;
type FunctionReturningPromise = (...args: any[]) => Promise<any>;
type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };
type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> =
  AsyncState<PromiseType<ReturnType<T>>>;
type AsyncFnReturn<
  T extends FunctionReturningPromise = FunctionReturningPromise
> = [StateFromFunctionReturningPromise<T>, T];

export function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  deps?: DependencyList,
  initialState?: StateFromFunctionReturningPromise<T>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [value, setValue] = useState<any>(undefined);

  const requestFn = useCallback(
    async function requestFn(...params: any) {
      try {
        setLoading(true);
        const value = await fn(...params);
        setValue(value);
        return value;
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [fn, ...(deps || [])]
  );

  return [{ loading, error, value }, requestFn] as AsyncFnReturn<T>;
}
