import type { ExperienceEvent } from '@atlassian/experience-tracker';

import { createExperienceTrackerAnalyticsEventPayload } from '../createExperienceTrackerAnalyticsEventPayload';

const mockExperienceEvent = (props?: Partial<ExperienceEvent>) =>
  ({
    action: 'taskStart',
    name: 'view-page',
    id: '123',
    attributes: {
      parentProduct: 'JSM',
    },
    ...props,
  } as ExperienceEvent);

const mockedUserAgentInfo = 'Mocked Browser';

beforeEach(() => {
  Object.defineProperty(window.document, 'visibilityState', {
    writable: true,
    value: 'visible',
  });
  Object.defineProperty(window.navigator, 'userAgent', {
    writable: true,
    value: mockedUserAgentInfo,
  });
});

it('should include attributes from experience tracker event', () => {
  const mockedEvent = mockExperienceEvent();

  expect(createExperienceTrackerAnalyticsEventPayload(mockedEvent)).toEqual({
    source: 'ui',
    actionSubject: 'ui',
    action: 'taskStart',
    eventType: 'operational',
    attributes: {
      task: 'view-page',
      taskId: '123',
      parentProduct: 'JSM',
      isActiveTab: true,
      browserInfo: mockedUserAgentInfo,
    },
  });
});

it('should include error info in attributes from experience tracker event', () => {
  const mockedErrorEvent = mockExperienceEvent({
    action: 'taskFail',
    error: {
      name: 'mockedError',
      traceId: 'trace-123',
    } as any,
  });

  expect(
    createExperienceTrackerAnalyticsEventPayload(mockedErrorEvent),
  ).toEqual({
    source: 'ui',
    actionSubject: 'ui',
    action: 'taskFail',
    eventType: 'operational',
    attributes: {
      task: 'view-page',
      taskId: '123',
      parentProduct: 'JSM',
      isActiveTab: true,
      browserInfo: mockedUserAgentInfo,
      errorName: 'mockedError',
      traceId: 'trace-123',
    },
  });
});
