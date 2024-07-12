import { create } from "zustand";
import equal from "fast-deep-equal";

export type TPrevFn<T> = ((prev: T) => T) | T;
export type TPrevPFn<P, T> = ((prev: P) => T) | T;

// usage: get prevState when use set function
export function prevFn<T>(prev: T, value: TPrevFn<T>): T {
  // @ts-ignore
  return typeof value === "function" ? value(prev) : value;
}

export function prevPFn<P, T>(prev: P, value: TPrevPFn<P, T>): T {
  // @ts-ignore
  return typeof value === "function" ? value(prev) : value;
}

/*  -- create Array store -- */
interface IStore<T, ID = string> {
  byKey: Record<string, T | undefined>;
  query: Record<string, ID[] | undefined>;
}

type ICreateArray<T, ID = string> = [
  (id?: ID, keyName?: keyof T) => T | undefined,
  (id?: ID, keyName?: keyof T) => T | undefined,
  (query: string) => ID[],
  (query: string) => ID[],
  (items: TPrevPFn<Record<string, T | undefined>, Partial<T>[]>) => void,
  (query: TPrevFn<Record<string, ID[] | undefined>>) => void,
  (items: T[]) => void,
  // (queries: string[]) => void,
  () => void,
  () => Record<string, T | undefined>,
  () => Record<string, T | undefined>,
  () => Record<string, ID[] | undefined>,
  () => Record<string, ID[] | undefined>,
  ReturnType<typeof create>
];

export function createArrayZustand<T extends Record<string, any>, ID = string>(
  mainKeys: string[]
): ICreateArray<T, ID> {
  const useStore = create<IStore<T, ID>>((set) => ({
    byKey: {},
    query: {},
  }));

  const getItems = (id?: ID) => {
    if (id === undefined || id === null) return undefined;
    return useStore.getState().byKey?.[id?.toString() || ""];
  };

  const useItems = (id?: ID, key?: keyof T) => {
    return useStore((state) => {
      if (id === undefined || id === null) return undefined;

      if (key) return state?.byKey?.[id?.toString() || ""]?.[key] as T[keyof T];

      return state?.byKey?.[id?.toString() || ""] as T | undefined;
    }, equal) as any;
  };

  const getItemsByQuery = (query: string) => {
    return useStore.getState().query?.[query] || [];
  };

  const useItemsByQuery = (query: string) => {
    return useStore((state) => (state.query?.[query] || []) as ID[], equal);
  };

  const syncItems = (
    items: TPrevPFn<Record<string, T | undefined>, Partial<T>[]>
  ) => {
    return useStore.setState((prev) => {
      let pairs: any = {};

      for (let mainKey of mainKeys) {
        for (let item of prevPFn(prev.byKey, items)) {
          const newKey = item[mainKey]?.toString();
          if (newKey !== undefined && newKey !== null) {
            pairs[newKey] = {
              ...item,
              [mainKey]: newKey,
            };
          }
        }
      }

      return {
        ...prev,
        byKey: {
          ...prev.byKey,
          ...pairs,
        },
      } as IStore<T, ID>;
    });
  };

  const deleteItems = (items: T[]) => {
    return useStore.setState((prev) => {
      let pairs: any = {};

      for (let mainKey of mainKeys) {
        for (let item of items) {
          const key = item[mainKey]?.toString();
          if (key !== undefined && key !== null) {
            pairs[key] = undefined;
          }
        }
      }

      return {
        ...prev,
        byKey: {
          ...prev.byKey,
          ...pairs,
        },
      };
    });
  };

  const resetItems = () => {
    return useStore.setState({
      byKey: {},
      query: {},
    });
  };

  const setItemsQuery = (query: TPrevFn<Record<string, ID[] | undefined>>) => {
    return useStore.setState((prev) => {
      const newQuery = prevFn(prev.query, query);
      return {
        ...prev,
        query: {
          ...prev.query,
          ...newQuery,
        },
      };
    });
  };

  const useItemsMap = (): Record<string, T | undefined> => {
    return useStore((state) => state?.byKey, equal);
  };

  const getItemsMap = (): Record<string, T | undefined> => {
    return useStore.getState().byKey;
  };

  const useItemsQueryMap = (): Record<string, ID[] | undefined> => {
    return useStore((state) => state?.query, equal);
  };

  const getItemsQueryMap = (): Record<string, ID[] | undefined> => {
    return useStore.getState().query;
  };

  return [
    useItems,
    getItems,
    useItemsByQuery,
    getItemsByQuery,
    syncItems,
    setItemsQuery,
    deleteItems,
    resetItems,
    useItemsMap,
    getItemsMap,
    useItemsQueryMap,
    getItemsQueryMap,
    useStore,
  ];
}
