import { ExperiencePerformanceTypes } from '@atlassian/ufo-experimental';
import {
  ExperienceData,
  FMP_MARK,
  INLINE_RESPONSE_MARK,
  PageLoadExperienceData,
} from '@atlassian/ufo-experimental/types';

import { SSRConfig } from '../../types';
import { isInitialPageLoad } from '../utils/is-initial-page-load';

import { navigationMetrics } from './plugins/navigation-metrics';

const LoadMetricKeys = {
  tti: 'metric:tti',
  fmp: 'metric:fmp',
};

const InlineResultMetricKeys = {
  result: 'metric:result',
  response: 'metric:response',
};

const CustomMetricKeys = {
  duration: 'metric:duration',
};

export const getLoadMetrics = (
  data: ExperienceData | PageLoadExperienceData,
  ssr: SSRConfig | null,
) => {
  if (data.metrics.endTime === null || data.metrics.startTime === null) {
    return null;
  }

  const fmpMark =
    data.metrics.marks.find(mark => mark.name === FMP_MARK)?.time ||
    (isInitialPageLoad(data) && ssr?.getDoneMark());
  const tti = data.metrics.endTime - data.metrics.startTime;
  const fmp =
    typeof fmpMark === 'number' ? fmpMark - data.metrics.startTime : tti;
  return {
    [LoadMetricKeys.tti]: Math.round(tti),
    [LoadMetricKeys.fmp]: Math.round(fmp),
  };
};

export const getInlineResultMetrics = (
  data: ExperienceData | PageLoadExperienceData,
) => {
  if (data.metrics.endTime === null || data.metrics.startTime === null) {
    return null;
  }

  const responseMark = data.metrics.marks.find(
    mark => mark.name === INLINE_RESPONSE_MARK,
  );
  const result = data.metrics.endTime - data.metrics.startTime;
  const response = responseMark
    ? responseMark.time - data.metrics.startTime
    : result;
  return {
    [InlineResultMetricKeys.result]: Math.round(result),
    [InlineResultMetricKeys.response]: Math.round(response),
  };
};

export const getCustomMetrics = (
  data: ExperienceData | PageLoadExperienceData,
) => {
  if (data.metrics.endTime === null || data.metrics.startTime === null) {
    return null;
  }

  const duration = data.metrics.endTime - data.metrics.startTime;
  return {
    [CustomMetricKeys.duration]: Math.round(duration),
  };
};

const getPerformanceMetrics = (
  data: ExperienceData | PageLoadExperienceData,
  ssr: SSRConfig | null,
) => {
  switch (data.performanceType) {
    case ExperiencePerformanceTypes.PageLoad:
    case ExperiencePerformanceTypes.PageSegmentLoad:
      return getLoadMetrics(data, ssr);
    case ExperiencePerformanceTypes.InlineResult:
      return getInlineResultMetrics(data);
    case ExperiencePerformanceTypes.Custom:
      return getCustomMetrics(data);
  }
};

export const getPerformancePayload = (
  data: ExperienceData | PageLoadExperienceData,
  ssr: SSRConfig | null,
) => {
  return {
    ...getPerformanceMetrics(data, ssr),
    ...(isInitialPageLoad(data) ? navigationMetrics() : null),
  };
};
