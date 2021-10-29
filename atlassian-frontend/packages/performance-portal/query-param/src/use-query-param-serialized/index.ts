import { useCallback, useMemo } from 'react';

import { useQueryParam } from 'react-resource-router';
import {
  BooleanParam,
  decodeQueryParams,
  encodeQueryParams,
  QueryParamConfig,
  StringParam,
  withDefault,
} from 'serialize-query-params';

import { UTCDateParam } from '../utc-date-param';

export const useQueryParamSerialized = <T extends unknown>(
  param: string,
  queryParamConfig: QueryParamConfig<
    T | null | undefined,
    T | null | undefined
  >,
  defaultValue?: T,
): [T, (value?: T) => void] => {
  const [value, setValue] = useQueryParam(param);

  const queryParamConfigMap = useMemo(() => {
    const queryParamConfigDefault = withDefault(queryParamConfig, defaultValue);
    return { [param]: queryParamConfigDefault };
  }, [defaultValue, param, queryParamConfig]);

  const decoded = useMemo(
    () => decodeQueryParams(queryParamConfigMap, { [param]: value }),
    [param, queryParamConfigMap, value],
  );

  if (defaultValue !== undefined) {
    const encoded = encodeQueryParams(queryParamConfigMap, decoded);
    if (encoded[param] && value !== encoded[param]) {
      setValue(encoded[param] as string, 'replace');
    }
  }

  const setEncodedParam = useCallback(
    (value?: T) => {
      const encodedParam = encodeQueryParams(queryParamConfigMap, {
        [param]: value,
      })[param];
      setValue(encodedParam as string | undefined, 'replace');
    },
    [param, queryParamConfigMap, setValue],
  );
  // @ts-ignore
  return [decoded[param] ?? defaultValue, setEncodedParam];
};

export const useStringQueryParam = <T = string>(
  param: string,
  defaultValue?: T,
) => {
  return useQueryParamSerialized(
    param,
    StringParam as QueryParamConfig<T | null | undefined, T | null | undefined>,
    defaultValue,
  );
};

export const useBooleanQueryParam = (param: string, defaultValue?: boolean) => {
  return useQueryParamSerialized(param, BooleanParam, defaultValue);
};

export const useUTCDateQueryParam = (param: string, defaultValue?: Date) => {
  return useQueryParamSerialized(param, UTCDateParam, defaultValue);
};
