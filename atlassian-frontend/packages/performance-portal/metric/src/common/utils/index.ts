import isBefore from 'date-fns/isBefore';

import { PopupProps } from '@atlaskit/popup';

import { TooltipType } from '../types';

import { getEndOfDayUTC } from './date-utils';

export const getTooltipPlacement = (
  tooltipType: TooltipType,
  selectedDateTime: string | undefined | null,
  hoverDateTime: string | undefined | null,
): PopupProps['placement'] => {
  let tooltipPlacement = 'right-start';

  if (hoverDateTime && selectedDateTime) {
    if (hoverDateTime >= selectedDateTime) {
      if (tooltipType === TooltipType.SELECTED_TOOLTIP) {
        tooltipPlacement = 'left-start';
      } else if (tooltipType === TooltipType.HOVER_TOOLTIP) {
        tooltipPlacement = 'right-start';
      }
    } else {
      if (tooltipType === TooltipType.SELECTED_TOOLTIP) {
        tooltipPlacement = 'right-start';
      } else if (tooltipType === TooltipType.HOVER_TOOLTIP) {
        tooltipPlacement = 'left-start';
      }
    }
  }

  return tooltipPlacement as PopupProps['placement'];
};

export const isPartialDayAggregation = (
  dataDateTime: Date,
  aggregatedAt: Date,
) => {
  return aggregatedAt && isBefore(aggregatedAt, getEndOfDayUTC(dataDateTime));
};

const PARTIAL_DAY_COHORT_SUFFIX = '__partial__';
export const getCohortWithoutPartialSuffix = (cohort: string) => {
  const indexOfPartialMarker = cohort.indexOf(PARTIAL_DAY_COHORT_SUFFIX);
  if (indexOfPartialMarker > 0) {
    return cohort.substr(0, indexOfPartialMarker);
  }
  return cohort;
};

export const getPartialDayCohortName = (cohort: string) => {
  return `${cohort}${PARTIAL_DAY_COHORT_SUFFIX}`;
};

export {
  dateTickFormatter,
  formatInUTC,
  formatNumber,
  tooltipDateLabelFormatter,
  tooltipNumberFormatter,
  toISODateString,
} from './formatter';

export { ComparisonParam } from './comparison-param';

export {
  getEndOfDayUTC,
  getStartOfDayUTC,
  getTimeOfDayUTC,
  isWeekendDate,
  getPreviousDate,
  getPreviousDateNonWeekend,
} from './date-utils';
