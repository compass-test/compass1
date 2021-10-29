import { catalog } from '@atlassiansox/metal-client';

import {
  BMInteractionMetrics,
  BMPageLoadMetrics,
  StorableBMEventsType,
} from '../types';

type PageLoadMetricType = 'fmp' | 'tti';
type PageSegmentLoadMetricType = 'fmp' | 'tti';
type InteractionMetricType = 'response' | 'result';

const metricNameMatrix = {
  pageLoad: {
    fmp: {
      gauge: catalog.performance.FIRST_MEANINGFUL_PAINT,
      slo: catalog.performance.FIRST_MEANINGFUL_PAINT_SLO,
    },
    tti: {
      gauge: catalog.performance.TIME_TO_INTERACTIVE,
      slo: catalog.performance.TIME_TO_INTERACTIVE_SLO,
    },
  },
  pageSegmentLoad: {
    fmp: {
      gauge: catalog.performance.FIRST_MEANINGFUL_PAINT,
      slo: catalog.performance.FIRST_MEANINGFUL_PAINT_SLO,
    },
    tti: {
      gauge: catalog.performance.TIME_TO_INTERACTIVE,
      slo: catalog.performance.TIME_TO_INTERACTIVE_SLO,
    },
  },
  interaction: {
    response: {
      gauge: catalog.userInteraction.TASK_TIME_TO_FEEDBACK,
      slo: catalog.userInteraction.TASK_TIME_TO_FEEDBACK_SLO,
    },
    result: {
      gauge: catalog.userInteraction.TASK_TIME_TO_COMPLETE,
      slo: catalog.userInteraction.TASK_TIME_TO_COMPLETE_SLO,
    },
  },
  custom: {
    gauge: catalog.userInteraction.TASK_DURATION,
    sloSuccess: catalog.userInteraction.TASK_SUCCESS,
    sloFailure: catalog.userInteraction.TASK_FAILURE,
  },
};

export interface PageLoadMetalCommonPayload {
  name: string;
  value: number;
  page: string;
  isInitial: boolean;
  isActiveTab: boolean;
}

export interface PageLoadMetalHistogramPayload
  extends PageLoadMetalCommonPayload {
  histogramBuckets: string;
}

export interface PageLoadMetalSloPayload extends PageLoadMetalCommonPayload {
  value: 1;
  success: boolean;
}

export interface TaskMetalCommonPayload {
  name: string;
  value: number;
  task: string;
  page: string;
}

export interface TaskMetalHistogramPayload extends TaskMetalCommonPayload {
  histogramBuckets: string;
}

export interface TaskMetalSloPayload extends TaskMetalCommonPayload {
  value: 1;
  success: boolean;
}

export type MetalDataProcessorData =
  | TaskMetalSloPayload
  | TaskMetalHistogramPayload
  | PageLoadMetalSloPayload
  | PageLoadMetalHistogramPayload
  | TaskMetalCommonPayload;

type metricFMP = 'metric:fmp';
type metricTTI = 'metric:tti';
type metricResult = 'metric:result';
type metricResponse = 'metric:response';
type metricFMPSlo = 'metric:fmp:slo';
type metricTTISlo = 'metric:tti:slo';
type metricResultSlo = 'metric:result:slo';
type metricResponseSlo = 'metric:response:slo';
type metricFMPHistogram = 'metric:fmp:histogramBuckets';
type metricTTIHistogram = 'metric:tti:histogramBuckets';
type metricResultHistogram = 'metric:result:histogramBuckets';
type metricResponseHistogram = 'metric:response:histogramBuckets';

type PageLoadPayload = {
  'event:type': typeof StorableBMEventsType.PAGE_LOAD;
  'event:id': string;
  'event:route': string;
  'event:initial': boolean;
  'metric:fmp': number;
  'metric:tti': number;
  'metric:fmp:slo'?: boolean;
  'metric:tti:slo'?: boolean;
  'metric:fmp:histogramBuckets'?: string;
  'metric:tti:histogramBuckets'?: string;
  'pageVisible:value': boolean;
  'pageVisible:state': string;
};

type PageSegmentLoadPayload = {
  'event:type': typeof StorableBMEventsType.PAGE_SEGMENT_LOAD;
  'event:id': string;
  'event:route': string;
  'event:initial': boolean;
  'metric:fmp': number;
  'metric:tti': number;
  'metric:fmp:slo'?: boolean;
  'metric:tti:slo'?: boolean;
  'metric:fmp:histogramBuckets'?: string;
  'metric:tti:histogramBuckets'?: string;
  'pageVisible:value': boolean;
  'pageVisible:state': string;
};

type InteractionPayload = {
  'event:type': typeof StorableBMEventsType.INLINE_RESULT;
  'event:id': string;
  'event:route': string;
  'metric:result': number;
  'metric:response'?: number;
  'metric:result:slo'?: boolean;
  'metric:response:slo'?: boolean;
  'metric:result:histogramBuckets'?: string;
  'metric:response:histogramBuckets'?: string;
  'pageVisible:value': boolean;
  'pageVisible:state': string;
};

type CustomPayload = {
  'event:type': typeof StorableBMEventsType.CUSTOM;
  'event:id': string;
  'event:route': string;
  'metric:duration': number;
  'metric:duration:slo'?: boolean;
  'metric:duration:slo:threshold'?: number;
  'metric:duration:histogramBuckets'?: string;
  'pageVisible:value': boolean;
  'pageVisible:state': string;
};

export type MetalProcessorExpectedPayload =
  | PageLoadPayload
  | PageSegmentLoadPayload
  | InteractionPayload
  | CustomPayload;

const makePageLoadPayload = (
  payload: PageLoadPayload | PageSegmentLoadPayload,
  type: PageLoadMetricType | PageSegmentLoadMetricType,
  common: { page: string; isInitial: boolean; isActiveTab: boolean },
): Array<PageLoadMetalHistogramPayload | PageLoadMetalSloPayload> => {
  const metricName = `metric:${type}` as metricFMP | metricTTI;
  const metricNameSlo = `metric:${type}:slo` as metricFMPSlo | metricTTISlo;
  const histogramNameSlo = `metric:${type}:histogramBuckets` as
    | metricFMPHistogram
    | metricTTIHistogram;
  const metalPayload = {
    ...common,
    name: metricNameMatrix.pageLoad[type].gauge,
    value: payload[metricName],
  };

  const slo = payload[metricNameSlo];
  const histogram = payload[histogramNameSlo];

  const payloads = [];
  if (histogram !== undefined) {
    const histogramEvent: PageLoadMetalHistogramPayload = {
      ...metalPayload,
      histogramBuckets: histogram,
    };
    payloads.push(histogramEvent);
  }

  if (slo !== undefined) {
    const sloEvent: PageLoadMetalSloPayload = {
      ...metalPayload,
      name: metricNameMatrix.pageLoad[type].slo,
      value: 1,
      success: slo,
    };
    payloads.push(sloEvent);
  }
  return payloads;
};

const makeInteractionPayload = (
  payload: InteractionPayload,
  type: InteractionMetricType,
): Array<TaskMetalHistogramPayload | TaskMetalSloPayload> => {
  const metricName = `metric:${type}` as metricResult | metricResponse;
  const metricNameSlo = `metric:${type}:slo` as
    | metricResultSlo
    | metricResponseSlo;
  const histogramNameSlo = `metric:${type}:histogramBuckets` as
    | metricResultHistogram
    | metricResponseHistogram;
  const gaugeValue = metricName in payload && payload[metricName];
  if (!gaugeValue && typeof gaugeValue !== 'number') {
    return [];
  }

  const metalPayload: TaskMetalCommonPayload = {
    name: metricNameMatrix.interaction[type].gauge,
    value: gaugeValue,
    task: payload['event:id'],
    page: payload['event:route'] || '',
  };

  const payloads = [];

  const histogram = payload[histogramNameSlo];
  if (histogram !== undefined) {
    const histogramEvent: TaskMetalHistogramPayload = {
      ...metalPayload,
      histogramBuckets: histogram,
    };
    payloads.push(histogramEvent);
  }

  if (metricNameSlo in payload) {
    const sloPayload: TaskMetalSloPayload = {
      ...metalPayload,
      name: metricNameMatrix.interaction[type].slo,
      value: 1,
      success: !!payload[metricNameSlo],
    };
    payloads.push(sloPayload);
  }

  return payloads;
};

const makeCustomPayload = (
  payload: CustomPayload,
): Array<TaskMetalHistogramPayload | TaskMetalCommonPayload> => {
  const gaugeValue = payload['metric:duration'];
  if (!gaugeValue && typeof gaugeValue !== 'number') {
    return [];
  }

  const metalPayload: TaskMetalCommonPayload = {
    name: metricNameMatrix.custom.gauge,
    value: gaugeValue,
    task: payload['event:id'],
    page: payload['event:route'] || '',
  };

  const payloads = [];

  const histogram = payload['metric:duration:histogramBuckets'];
  if (histogram !== undefined) {
    const histogramEvent: TaskMetalHistogramPayload = {
      ...metalPayload,
      histogramBuckets: histogram,
    };
    payloads.push(histogramEvent);
  }

  if ('metric:duration:slo' in payload) {
    const sloPayload: TaskMetalCommonPayload = {
      ...metalPayload,
      name: payload['metric:duration:slo']
        ? metricNameMatrix.custom.sloSuccess
        : metricNameMatrix.custom.sloFailure,
      value: 1,
    };
    payloads.push(sloPayload);
  }

  return payloads;
};

export const metalDataProcessor = (
  payload: MetalProcessorExpectedPayload,
  useVisibleState: Boolean,
): MetalDataProcessorData[] => {
  if (
    payload['event:type'] === StorableBMEventsType.PAGE_LOAD ||
    payload['event:type'] === StorableBMEventsType.PAGE_SEGMENT_LOAD
  ) {
    // page segment reuses METAL page load events
    const prefix =
      payload['event:type'] === StorableBMEventsType.PAGE_SEGMENT_LOAD
        ? 'segment-'
        : '';

    const isActiveTab = useVisibleState
      ? payload['pageVisible:state'] === 'visible'
      : payload['pageVisible:value'];
    const common = {
      page: `${prefix}${payload['event:id']}`,
      isInitial: payload['event:initial'],
      isActiveTab,
    };

    return [
      ...makePageLoadPayload(payload, BMPageLoadMetrics.fmp, common),
      ...makePageLoadPayload(payload, BMPageLoadMetrics.tti, common),
    ];
  }

  if (payload['event:type'] === StorableBMEventsType.INLINE_RESULT) {
    const payloads = [];
    if (payload['metric:response']) {
      payloads.push(
        ...makeInteractionPayload(payload, BMInteractionMetrics.response),
      );
    }
    payloads.push(
      ...makeInteractionPayload(payload, BMInteractionMetrics.result),
    );
    return payloads;
  }

  if (payload['event:type'] === StorableBMEventsType.CUSTOM) {
    return makeCustomPayload(payload);
  }

  return [];
};
