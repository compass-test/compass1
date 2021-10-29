import {
  interactionMetricMock,
  interactionPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import { BaseMetricDataWithStartAndStop } from '../../../../types';
import { productCustomData } from '../../custom';

describe('plugin for custom data on product level', () => {
  test('returns null when empty data', () => {
    const metric = interactionMetricMock();
    metric.start();
    metric.stop();
    expect(
      productCustomData(
        interactionPerformanceConfigMock(),
        metric.getData() as BaseMetricDataWithStartAndStop,
        shareableGlobalConfigMock({ product: 'jira' }),
      ),
    ).toEqual(null);
  });
  test('adds prefix `[product]:` to provided object properties', () => {
    const metric = interactionMetricMock();
    metric.start();
    metric.stop();
    expect(
      productCustomData(
        interactionPerformanceConfigMock(),
        metric.getData() as BaseMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          product: 'jira',
          custom: { custom_key: 1 },
        }),
      ),
    ).toEqual({
      'jira:custom_key': 1,
    });
  });
});
