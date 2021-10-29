import React from 'react';

// FwR -> Function with Return
type FwR = (...args: any) => any;

type RenderProps<T extends FwR> = React.ComponentType<{
  children: (props: ReturnType<T>) => React.ReactElement;
  params: Parameters<T>;
}>;

/**
 *```
 * const ReactState = hookToRenderProps(useState);
 * <ReactState params={[initialValue]}>{[val, setValue] => {...}}</ReactState>
 *```
 *
 * @param useHook Any React hook
 * @returns RenderProps<T>
 */
export const hookToRenderProps = <T extends FwR>(
  useHook: T,
): RenderProps<T> => ({ children, params = [] }) => {
  const output = useHook(...(params as []));
  return children(output);
};

const extractPrefix = '/static/';
const extractPrefixLength = extractPrefix.length;
export const extractKeyFromId = (id: string): string =>
  id.substr(extractPrefixLength + id.indexOf(extractPrefix));
