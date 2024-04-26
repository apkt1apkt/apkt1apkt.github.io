/* eslint-disable @typescript-eslint/no-explicit-any */

type Obj<T = any> = {
  [key: string]: T;
};

type Nullable<T> = T | null | undefined;

type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type NullableValues<T> = {
  [P in keyof T]?: T[P] | null;
};

type DeepNullable<T> = {
  [K in keyof T]?: T[K] extends object ? DeepNullable<T[K]> | null | undefined : T[K] | null | undefined;
};
