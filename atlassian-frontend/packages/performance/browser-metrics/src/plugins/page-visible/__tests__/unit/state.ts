import { PageVisibleState } from '../../../../metric/base-metric';
import {
  pageLoadMetricMock,
  pageLoadPerformanceConfigMock,
} from '../../../../mocks';
import {
  BasePageLoadMetricDataWithStartAndStop,
  PerformanceEventConfig,
} from '../../../../types';
import { pageVisibleState } from '../../state';

describe('page visible state plugin', () => {
  test('should generate pageVisible:state key', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: function () {
        return 'visible';
      },
    });
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      pageVisibleState(
        pageLoadPerformanceConfigMock() as PerformanceEventConfig,
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
      ),
    ).toEqual({
      'pageVisible:state': PageVisibleState.VISIBLE,
    });
  });
});
