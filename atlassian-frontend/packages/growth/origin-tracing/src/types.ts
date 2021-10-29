export type OriginVersioningAnalyticsAttributes = {
  originLibrary: string;
};

type DefaultOriginAnalyticsAttributes = OriginVersioningAnalyticsAttributes & {
  originId: string;
  originProduct: string;
};

type GeneratedOriginAnalyticsAttributes = OriginVersioningAnalyticsAttributes & {
  originIdGenerated: string;
  originProduct: string;
};

type MalformedOriginAnalyticsAttributes = OriginVersioningAnalyticsAttributes & {
  originMalformed: true;
};

type EmptyOriginAnalyticsAttributes = OriginVersioningAnalyticsAttributes;

export type OriginAnalyticsAttributes =
  | DefaultOriginAnalyticsAttributes
  | GeneratedOriginAnalyticsAttributes
  | MalformedOriginAnalyticsAttributes
  | EmptyOriginAnalyticsAttributes;

export type OriginConstructorOptions = OriginData & {
  dangerouslySkipValidation?: boolean;
};

export type OriginData = {
  id?: string | null;
  product?: string | null;
};

export type OriginJSONData = {
  i?: string | null;
  p?: string | null;
};

export type ToAnalyticsAttributesOptions = {
  hasGeneratedId?: boolean;
  transformValue?: (attribute: string | null | undefined) => string | undefined;
};

export type OriginEnv = {
  atob: typeof atob;
  btoa: typeof btoa;
  URLSearchParams: typeof URLSearchParams;
};
