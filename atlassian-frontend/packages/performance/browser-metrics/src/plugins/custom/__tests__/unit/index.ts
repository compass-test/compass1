import {
  interactionMetricMock,
  interactionPerformanceConfigMock,
} from '../../../../mocks';
import { BaseMetricDataWithStartAndStop } from '../../../../types';
import { customData } from '../../index';

describe('plugin for custom data', () => {
  test('returns null when empty data', () => {
    const metric = interactionMetricMock();
    metric.start();
    metric.stop();
    expect(
      customData(
        interactionPerformanceConfigMock(),
        metric.getData() as BaseMetricDataWithStartAndStop,
      ),
    ).toEqual(null);
  });
  test('adds prefix `custom:` to provided object properties', () => {
    const metric = interactionMetricMock();
    metric.start();
    metric.stop({ customData: { custom_key: 1 } });
    expect(
      customData(
        interactionPerformanceConfigMock(),
        metric.getData() as BaseMetricDataWithStartAndStop,
      ),
    ).toEqual({
      'custom:custom_key': 1,
    });
  });

  test('preserves nested objects in provided object properties', () => {
    const metric = interactionMetricMock();
    metric.start();
    metric.stop({
      customData: { custom_key: 1, custom_nested_obj: { key: 'value' } },
    });
    expect(
      customData(
        interactionPerformanceConfigMock(),
        metric.getData() as BaseMetricDataWithStartAndStop,
      ),
    ).toEqual({
      'custom:custom_key': 1,
      'custom:custom_nested_obj': {
        key: 'value',
      },
    });
  });
});
