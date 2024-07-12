import { prevFn, TPrevFn } from "./createArrayZustand";
import { create } from "zustand";
import equal from "fast-deep-equal";

type ICreateObject<T> = [
  () => T | undefined,
  () => T | undefined,
  (item: TPrevFn<T>) => void,
  () => void
];

/*  -- create Array store -- */
interface IStore<T> {
  state: T | undefined;
}

export function createObjectZustand<T>(initialState: T): ICreateObject<T> {
  const useStore = create<IStore<T>>((set) => ({
    state: initialState,
  }));

  const getItem = () => {
    return useStore.getState().state;
  };

  const useItem = () => {
    return useStore((state) => {
      return state?.state;
    }, equal) as any;
  };

  const syncItem = (item: TPrevFn<T>) => {
    return useStore.setState((prev) => {
      return {
        state: prevFn((prev.state || {}) as T, item),
      } as IStore<T>;
    });
  };

  const reset = () => {
    return useStore.setState({
      state: initialState,
    });
  };

  return [useItem, getItem, syncItem, reset];
}
