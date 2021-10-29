import Cache from 'node-cache';

const CACHE_TTL = Number(process.env.TECHSTACK_CACHE_TTL) || 1200; // Cache Time To Live in seconds

const cacheConfig = {
  stdTTL: CACHE_TTL,
  checkperiod: 0,
  useClones: false,
};

export const cache = new Cache(cacheConfig);

export const PACKAGE_JSON_PREFIX = 'package-json';
export const EXAMPLE_CONFIG_PREFIX = 'example-config';
export const TSCONFIG_PREFIX = 'tsconfig';
export const BUILD_TSCONFIG_PREFIX = 'build-tsconfig';

type Options = {
  disableCache?: boolean;
};

type Value<T> = {
  value: T;
};

export const getFromCache = <T>(
  prefix: string,
  key: string,
  generator: (key: string) => T,
  options: Options = {},
) => {
  if (options.disableCache) {
    return generator(key);
  }
  const prefixedKey = `${prefix}:${key}`;
  const entry = cache.get<Value<T>>(prefixedKey);
  if (!entry) {
    const unwrappedValue = generator(key);
    cache.set<Value<T>>(prefixedKey, { value: unwrappedValue });
    return unwrappedValue;
  }
  return entry.value;
};
