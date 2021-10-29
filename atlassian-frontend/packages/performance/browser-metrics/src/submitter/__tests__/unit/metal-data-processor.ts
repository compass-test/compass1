import { StorableBMEventsType } from '../../../types';
import { metalDataProcessor } from '../../metal-data-processor';

const pageLoadHistograms = {
  initial: {
    'metric:fmp:histogramBuckets': '5_10_15',
    'metric:tti:histogramBuckets': '15_20_25',
  },
  transition: {
    'metric:fmp:histogramBuckets': '35_40_45',
    'metric:tti:histogramBuckets': '45_50_55',
  },
};

const interactionHistograms = {
  'metric:result:histogramBuckets': '60_65_70',
  'metric:response:histogramBuckets': '70_75_80',
};

const customHistograms = {
  'metric:duration:histogramBuckets': '90_95_100',
};

describe('data processor for METAL lib', () => {
  describe('page load', () => {
    test('generates fmp and tti', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'page-load',
            'event:route': 'page-load',
            'event:type': StorableBMEventsType.PAGE_LOAD,
            'event:initial': true,
            'metric:fmp': 1000,
            'metric:tti': 2000,
            'pageVisible:value': true,
            'pageVisible:state': 'visible',
            ...pageLoadHistograms.initial,
          },
          false,
        ),
      ).toEqual([
        {
          isActiveTab: true,
          isInitial: true,
          name: 'fe.perf.first_meaningful_paint',
          page: 'page-load',
          value: 1000,
          histogramBuckets: '5_10_15',
        },
        {
          isActiveTab: true,
          isInitial: true,
          name: 'fe.perf.time_to_interactive',
          page: 'page-load',
          value: 2000,
          histogramBuckets: '15_20_25',
        },
      ]);
    });

    test('generates empty array when buckets not provided', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'page-load',
            'event:route': 'page-load',
            'event:type': StorableBMEventsType.PAGE_LOAD,
            'event:initial': true,
            'metric:fmp': 1000,
            'metric:tti': 2000,
            'pageVisible:value': true,
            'pageVisible:state': 'visible',
          },
          true,
        ),
      ).toEqual([]);
    });

    test('generates fmp and tti and slos', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'page-load',
            'event:route': 'page-load',
            'event:type': StorableBMEventsType.PAGE_LOAD,
            'event:initial': true,
            'metric:fmp': 1000,
            'metric:fmp:slo': false,
            'metric:tti': 2000,
            'metric:tti:slo': true,
            'pageVisible:value': true,
            'pageVisible:state': 'visible',
            ...pageLoadHistograms.initial,
          },
          true,
        ),
      ).toEqual([
        {
          isActiveTab: true,
          isInitial: true,
          name: 'fe.perf.first_meaningful_paint',
          page: 'page-load',
          value: 1000,
          histogramBuckets: '5_10_15',
        },
        {
          isActiveTab: true,
          isInitial: true,
          name: 'fe.perf.first_meaningful_paint.slo',
          page: 'page-load',
          success: false,
          value: 1,
        },
        {
          isActiveTab: true,
          isInitial: true,
          name: 'fe.perf.time_to_interactive',
          page: 'page-load',
          value: 2000,
          histogramBuckets: '15_20_25',
        },
        {
          isActiveTab: true,
          isInitial: true,
          name: 'fe.perf.time_to_interactive.slo',
          page: 'page-load',
          success: true,
          value: 1,
        },
      ]);
    });

    test('generates slos when buckets not provided', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'page-load',
            'event:route': 'page-load',
            'event:type': StorableBMEventsType.PAGE_LOAD,
            'event:initial': true,
            'metric:fmp': 1000,
            'metric:fmp:slo': false,
            'metric:tti': 2000,
            'metric:tti:slo': true,
            'pageVisible:value': true,
            'pageVisible:state': 'visible',
          },
          false,
        ),
      ).toEqual([
        {
          isActiveTab: true,
          isInitial: true,
          name: 'fe.perf.first_meaningful_paint.slo',
          page: 'page-load',
          success: false,
          value: 1,
        },
        {
          isActiveTab: true,
          isInitial: true,
          name: 'fe.perf.time_to_interactive.slo',
          page: 'page-load',
          success: true,
          value: 1,
        },
      ]);
    });
  });

  describe('interactions', () => {
    test('generates result for interaction', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'interaction',
            'event:route': 'page',
            'event:type': StorableBMEventsType.INLINE_RESULT,
            'metric:result': 1000,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
            ...interactionHistograms,
          },
          false,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.time_to_complete',
          task: 'interaction',
          page: 'page',
          value: 1000,
          histogramBuckets: '60_65_70',
        },
      ]);
    });

    test('adds empty string to required page when it is not provided', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'interaction',
            'event:route': '',
            'event:type': StorableBMEventsType.INLINE_RESULT,
            'metric:result': 1000,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
            ...interactionHistograms,
          },
          false,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.time_to_complete',
          task: 'interaction',
          page: '',
          value: 1000,
          histogramBuckets: '60_65_70',
        },
      ]);
    });

    test('generates result and response for interaction', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'interaction',
            'event:route': 'page',
            'event:type': StorableBMEventsType.INLINE_RESULT,
            'metric:result': 1000,
            'metric:response': 100,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
            ...interactionHistograms,
          },
          false,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.time_to_feedback',
          task: 'interaction',
          page: 'page',
          value: 100,
          histogramBuckets: '70_75_80',
        },
        {
          name: 'fe.user.task.time_to_complete',
          task: 'interaction',
          page: 'page',
          value: 1000,
          histogramBuckets: '60_65_70',
        },
      ]);
    });

    test('generates empty array when histograms not defined', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'interaction',
            'event:route': 'page',
            'event:type': StorableBMEventsType.INLINE_RESULT,
            'metric:result': 1000,
            'metric:response': 100,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
          },
          false,
        ),
      ).toStrictEqual([]);
    });

    test('generates result and response and slos for interaction', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'interaction',
            'event:route': 'page',
            'event:type': StorableBMEventsType.INLINE_RESULT,
            'metric:result': 1000,
            'metric:result:slo': false,
            'metric:response': 100,
            'metric:response:slo': true,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
            ...interactionHistograms,
          },
          false,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.time_to_feedback',
          page: 'page',
          task: 'interaction',
          value: 100,
          histogramBuckets: '70_75_80',
        },
        {
          name: 'fe.user.task.time_to_feedback.slo',
          page: 'page',
          success: true,
          task: 'interaction',
          value: 1,
        },
        {
          name: 'fe.user.task.time_to_complete',
          page: 'page',
          task: 'interaction',
          value: 1000,
          histogramBuckets: '60_65_70',
        },
        {
          name: 'fe.user.task.time_to_complete.slo',
          page: 'page',
          success: false,
          task: 'interaction',
          value: 1,
        },
      ]);
    });

    test('generates slos only, when slo values specified and histograms not defined', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'interaction',
            'event:route': 'page',
            'event:type': StorableBMEventsType.INLINE_RESULT,
            'metric:result': 1000,
            'metric:result:slo': false,
            'metric:response': 100,
            'metric:response:slo': true,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
          },
          true,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.time_to_feedback.slo',
          page: 'page',
          success: true,
          task: 'interaction',
          value: 1,
        },
        {
          name: 'fe.user.task.time_to_complete.slo',
          page: 'page',
          success: false,
          task: 'interaction',
          value: 1,
        },
      ]);
    });
  });

  describe('custom event type', () => {
    test('generates empty array when buckets not provided', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'custom',
            'event:route': 'route',
            'event:type': StorableBMEventsType.CUSTOM,
            'metric:duration': 2000,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
          },
          false,
        ),
      ).toEqual([]);
    });

    test('generates event with histogram buckets', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'custom',
            'event:route': 'route',
            'event:type': StorableBMEventsType.CUSTOM,
            'metric:duration': 2000,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
            ...customHistograms,
          },
          true,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.duration',
          page: 'route',
          task: 'custom',
          value: 2000,
          histogramBuckets: '90_95_100',
        },
      ]);
    });

    test('generates events with slo failure when value above threshold', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'custom',
            'event:route': 'route',
            'event:type': StorableBMEventsType.CUSTOM,
            'metric:duration': 2000,
            'metric:duration:slo': false,
            'metric:duration:slo:threshold': 1,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
            ...customHistograms,
          },
          true,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.duration',
          page: 'route',
          task: 'custom',
          value: 2000,
          histogramBuckets: '90_95_100',
        },
        {
          name: 'fe.user.task.failure',
          page: 'route',
          task: 'custom',
          value: 1,
        },
      ]);
    });

    test('generates events with slo success when value below or equal threshold', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'custom',
            'event:route': 'route',
            'event:type': StorableBMEventsType.CUSTOM,
            'metric:duration': 2000,
            'metric:duration:slo': true,
            'metric:duration:slo:threshold': 10000,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
            ...customHistograms,
          },
          false,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.duration',
          page: 'route',
          task: 'custom',
          value: 2000,
          histogramBuckets: '90_95_100',
        },
        {
          name: 'fe.user.task.success',
          page: 'route',
          task: 'custom',
          value: 1,
        },
      ]);
    });

    test('generates slo events only when buckets not provided', () => {
      expect(
        metalDataProcessor(
          {
            'event:id': 'custom',
            'event:route': 'route',
            'event:type': StorableBMEventsType.CUSTOM,
            'metric:duration': 2000,
            'metric:duration:slo': true,
            'metric:duration:slo:threshold': 10000,
            'pageVisible:value': false,
            'pageVisible:state': 'visible',
          },
          true,
        ),
      ).toEqual([
        {
          name: 'fe.user.task.success',
          page: 'route',
          task: 'custom',
          value: 1,
        },
      ]);
    });
  });
});
