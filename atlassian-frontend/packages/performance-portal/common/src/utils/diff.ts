import { G300, N70, R300 } from '@atlaskit/theme/colors';

import { DIFF_THRESHOLD, NOT_APPLICABLE } from '../constants';
import { IconProps } from '../types';
import { ArrowDownIcon, ArrowUpIcon, EqualIcon } from '../ui';

import { isNumber, roundNumber } from './number';

export const calculateAbsoluteDiff = (
  newVal: number,
  oldVal: number,
): number | null => {
  if (isNumber(newVal) && isNumber(oldVal)) {
    return roundNumber(newVal - oldVal);
  }
  return null;
};

export const calculatePercentageDiff = (
  newVal: number,
  oldVal: number,
): number | null => {
  const diff = calculateAbsoluteDiff(newVal, oldVal);
  if (diff !== null) {
    if (diff !== 0) {
      const percent = (diff / oldVal) * 100;
      return roundNumber(percent);
    }
    return 0;
  }
  return null;
};

export const getDiffColor = (
  absoluteDiff: number,
  percentageDiff: number,
  absoluteThreshold = DIFF_THRESHOLD.absoluteDiff,
  percentageThreshold = DIFF_THRESHOLD.percentageDiff,
) => {
  if (
    absoluteDiff > absoluteThreshold ||
    percentageDiff > percentageThreshold
  ) {
    return R300;
  } else if (
    absoluteDiff < -absoluteThreshold ||
    percentageDiff < -percentageThreshold
  ) {
    return G300;
  }
  return N70;
};

export const getDiffIcon = (
  absoluteDiff: number,
): React.ComponentType<IconProps> => {
  if (absoluteDiff > 0) {
    return ArrowUpIcon;
  }
  if (absoluteDiff < 0) {
    return ArrowDownIcon;
  }
  return EqualIcon;
};

export const getLocalisedAbsoluteDiff = (
  absoluteDiff: number,
  unit: string,
) => {
  return `${absoluteDiff > 0 ? '+' : ''}${absoluteDiff.toLocaleString()}${
    unit ? ' ' + unit : ''
  }`;
};

export const getLocalisedPercentageDiff = (percentageDiff: number) => {
  return `${percentageDiff > 0 ? '+' : ''}${percentageDiff.toLocaleString()}%`;
};

export const getDiffData = (
  num: number | undefined,
  numToCompareAgainst: number | undefined,
  unit: string,
): {
  absoluteDiff: number | null;
  percentageDiff: number | null;
  absoluteDiffStr: string;
  percentageDiffStr: string;
  color: string;
  Icon: React.ComponentType<IconProps>;
} => {
  if (num !== undefined && numToCompareAgainst !== undefined) {
    const absoluteDiff = calculateAbsoluteDiff(num, numToCompareAgainst);
    const percentageDiff = calculatePercentageDiff(num, numToCompareAgainst);

    if (absoluteDiff !== null && percentageDiff !== null) {
      const color = getDiffColor(
        absoluteDiff,
        percentageDiff,
        undefined,
        num > DIFF_THRESHOLD.smallValueMax
          ? DIFF_THRESHOLD.percentageDiff
          : DIFF_THRESHOLD.smallValuePercentageDiff,
      );
      const Icon = getDiffIcon(absoluteDiff);
      const absoluteDiffStr = getLocalisedAbsoluteDiff(absoluteDiff, unit);
      const percentageDiffStr = getLocalisedPercentageDiff(percentageDiff);

      return {
        absoluteDiff,
        percentageDiff,
        absoluteDiffStr,
        percentageDiffStr,
        color,
        Icon,
      };
    }
  }

  return {
    absoluteDiff: null,
    percentageDiff: null,
    absoluteDiffStr: NOT_APPLICABLE,
    percentageDiffStr: NOT_APPLICABLE,
    color: N70,
    Icon: EqualIcon,
  };
};
