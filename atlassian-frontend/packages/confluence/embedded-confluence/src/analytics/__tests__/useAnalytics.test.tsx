import { renderHook } from '@testing-library/react-hooks';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ExperienceTracker } from '@atlassian/experience-tracker';

import { createExperienceTrackerAnalyticsEventPayload } from '../createExperienceTrackerAnalyticsEventPayload';
import { useAnalytics } from '../useAnalytics';

jest.mock('@atlaskit/analytics-next', () => ({
  ...jest.requireActual<any>('@atlaskit/analytics-next'),
  useAnalyticsEvents: jest.fn(),
}));

jest.mock('../createExperienceTrackerAnalyticsEventPayload', () => ({
  ...jest.requireActual<any>('../createExperienceTrackerAnalyticsEventPayload'),

  createExperienceTrackerAnalyticsEventPayload: jest.fn(),
}));

let mockedFireEvent: jest.Mock;
let mockedCreateAnalyticEvent: jest.Mock;

beforeEach(() => {
  mockedFireEvent = jest.fn();
  mockedCreateAnalyticEvent = jest.fn().mockReturnValue({
    fire: mockedFireEvent,
  });

  (useAnalyticsEvents as jest.Mock).mockReturnValue({
    createAnalyticsEvent: mockedCreateAnalyticEvent,
  });

  (createExperienceTrackerAnalyticsEventPayload as jest.Mock).mockImplementation(
    ({ name, action, id }) => ({
      action,
      attributes: {
        task: name,
        taskId: id,
      },
    }),
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

it('should trigger function to send experience tracker analytic event if the experience name is EP experience', () => {
  const experienceTracker = new ExperienceTracker();

  renderHook(() => useAnalytics(experienceTracker));

  experienceTracker.start({
    name: 'embedded-confluence/view-page',
    id: '123',
  });

  expect(mockedCreateAnalyticEvent).toHaveBeenCalledTimes(1);
  expect(mockedCreateAnalyticEvent).toHaveBeenCalledWith({
    action: 'taskStart',
    attributes: {
      task: 'embedded-confluence/view-page',
      taskId: '123',
    },
  });
  expect(mockedFireEvent).toHaveBeenCalledTimes(1);
  expect(mockedFireEvent).toHaveBeenCalledWith('embeddedConfluence');
});

it('should not trigger function to send experience tracker analytic event if the experience name is not EP experience', () => {
  const experienceTracker = new ExperienceTracker();

  renderHook(() => useAnalytics(experienceTracker));

  experienceTracker.start({
    name: 'random experience name',
    id: '123',
  });

  expect(mockedCreateAnalyticEvent).not.toHaveBeenCalled();
  expect(mockedFireEvent).not.toHaveBeenCalled();
});
