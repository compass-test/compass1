export type Modify<TOriginal, TOverrides> = Omit<TOriginal, keyof TOverrides> &
  TOverrides;
