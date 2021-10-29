import {
  UIAnalyticsEvent,
  CreateUIAnalyticsEvent,
  AnalyticsEventPayload,
} from '@atlaskit/analytics-next';

const mock: CreateUIAnalyticsEvent = (
  payload: AnalyticsEventPayload,
): UIAnalyticsEvent => ({
  _isAnalyticsEvent: true,
  _isUIAnalyticsEvent: true,
  context: [],
  handlers: [],
  hasFired: false,
  payload,
  clone() {
    return null;
  },
  fire() {},
  update(_updater) {
    return mock(payload);
  },
});

export default function createAnalyticsEventMock(): jest.Mock<
  UIAnalyticsEvent
> {
  return jest.fn(mock);
}
