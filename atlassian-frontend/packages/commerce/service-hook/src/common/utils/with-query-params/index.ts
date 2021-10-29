const filterUndefinedProps = <T>(
  object: Record<string, T | undefined>,
): Record<string, T> =>
  Object.keys(object).reduce((result, key) => {
    const value = object[key];
    if (value !== undefined) {
      result[key] = value;
    }
    return result;
  }, {} as Record<string, T>);

const mapProps = <T, S>(
  object: Record<string, T>,
  map: (v: T) => S,
): Record<string, S> =>
  Object.keys(object).reduce((result, key) => {
    const value = object[key];
    if (value !== undefined) {
      result[key] = map(value);
    }
    return result;
  }, {} as Record<string, S>);

/**
 * Add query params to an url
 * @param url
 * @param params
 */
export const withQueryParams = (
  url: string,
  params: Record<string, string | undefined | number | boolean>,
): string => {
  const definedParams = filterUndefinedProps(params);
  return Object.keys(definedParams).length === 0
    ? url
    : `${url}?${new URLSearchParams(
        mapProps(definedParams, (prop) => prop.toString()),
      ).toString()}`;
};
