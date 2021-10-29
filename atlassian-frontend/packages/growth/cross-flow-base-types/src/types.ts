export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [member: string]: JSONValue }
  | JSONValue[];

// Cross Flow Extension Types
export type CrossFlowExtensionsOptions = Record<string, JSONValue>;

// Cross Flow Plugin Types
export type Values<T> = T[keyof T];

export type DataPlugin<
  N extends string,
  I extends (...args: any) => Promise<any>
> = [N, I];

export type DataPluginNameType<
  R extends DataPlugin<any, any>
> = R extends DataPlugin<infer N, any> ? N : never;

export type DataPluginImplementationType<
  R extends DataPlugin<any, any>
> = R extends DataPlugin<any, infer I> ? I : never;

export type PluginCollection = DataPlugin<
  DataPluginNameType<any>,
  DataPluginImplementationType<any>
>[];
