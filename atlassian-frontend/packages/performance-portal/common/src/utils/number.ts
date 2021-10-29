import { NOT_APPLICABLE } from '../constants';

export const roundNumber = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const isNumber = (num: unknown): boolean => Number.isFinite(num);

export const formatNumberWithUnit = (
  num: unknown,
  unit: string = '',
  naStr: string = NOT_APPLICABLE,
): string => {
  return isNumber(num) ? `${roundNumber(Number(num))} ${unit}` : naStr;
};
