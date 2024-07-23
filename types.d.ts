declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_DOMAIN: string;
    readonly NEXT_PUBLIC_AUTHENTIC_KEY: string;
  }
}

declare type RootState = ReturnType<
  typeof import("shared-core")["store"]["getState"]
> &
  import("shared-core").ReturnRootState<
    typeof import("./src/store")["reducers"]
  >;

declare interface String {
  replaceBetween: (start: number, end: number, content: string) => string;
  replaceAsync(
    searchValue: string | RegExp,
    replaceValue: string
  ): Promise<string>;
  replaceAsync(
    searchValue: string | RegExp,
    replacer: (substring: string, ...args: any[]) => Promise<string> | string
  ): Promise<string>;
}

declare interface Array<T> {
  changeIndex: (oldIndex: number, newIndex: number) => T[];
  insert: (item: T, index?: number) => T[];
  sum: () => number;
}
