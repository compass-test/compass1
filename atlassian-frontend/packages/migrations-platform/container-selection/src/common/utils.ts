import { OptionType } from './types';

export const createOption = <T extends any>(
  value: T,
): OptionType<T> | undefined => (value ? { label: value, value } : undefined);

export const createOptions = (
  values?: string | string[],
): Array<OptionType<string>> | undefined => {
  if (!values) {
    return undefined;
  }
  if (Array.isArray(values)) {
    return values.map((value) => {
      return { label: value, value };
    });
  }
  return [{ label: values, value: values }];
};
