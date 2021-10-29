import { renderHook } from '@testing-library/react-hooks';

import { ExperienceTracker } from '@atlassian/experience-tracker';
import { ExperienceTrackerAPI } from '@atlassian/experience-tracker/ExperienceTracker';

import { ExperienceNames } from '../ExperienceNames';
import { useSetUpExperience } from '../useSetUpExperience';

const contentId = '123';
const spaceKey = 'TEST';
const experience = 'foo' as ExperienceNames;
const ccExperience = 'bar' as ExperienceNames;

let experienceTracker: ExperienceTrackerAPI;
beforeEach(() => {
  experienceTracker = new ExperienceTracker();
});

it('should start embedded confluence experience only at the first render', () => {
  const mockedStart = jest.spyOn(experienceTracker, 'start');
  const { rerender } = renderHook(() =>
    useSetUpExperience({
      experienceTracker,
      contentId,
      spaceKey,
      experience,
      ccExperience,
    }),
  );

  expect(mockedStart).toHaveBeenCalledTimes(1);
  expect(mockedStart).toHaveBeenCalledWith(
    expect.objectContaining({
      name: experience,
      id: 'TEST-123',
    }),
  );

  rerender();

  expect(mockedStart).toHaveBeenCalledTimes(1);

  mockedStart.mockRestore();
});

it('should start a new embedded confluence experience if contentId or spaceKey has changed', () => {
  const mockedStart = jest.spyOn(experienceTracker, 'start');

  const { rerender } = renderHook(
    ({ contentId, spaceKey }) =>
      useSetUpExperience({
        experienceTracker,
        contentId,
        spaceKey,
        experience,
        ccExperience,
      }),
    {
      initialProps: {
        contentId,
        spaceKey,
      },
    },
  );

  rerender({
    contentId: '345',
    spaceKey: 'TEST',
  });

  expect(mockedStart).toHaveBeenCalledWith(
    expect.objectContaining({
      name: experience,
      id: 'TEST-345',
    }),
  );

  rerender({
    contentId: '345',
    spaceKey: 'DEMO',
  });

  expect(mockedStart).toHaveBeenCalledWith(
    expect.objectContaining({
      name: experience,
      id: 'DEMO-345',
    }),
  );

  mockedStart.mockRestore();
});

it('should trigger abort experience if unmount before cc experience started', () => {
  const mockedAbort = jest.spyOn(experienceTracker, 'abort');

  const { unmount } = renderHook(() =>
    useSetUpExperience({
      experienceTracker,
      contentId,
      spaceKey,
      experience,
      ccExperience,
    }),
  );

  unmount();

  expect(mockedAbort).toHaveBeenCalledTimes(1);
  expect(mockedAbort).toHaveBeenCalledWith({
    name: experience,
    reason: 'User navigated away before starting to load',
  });

  mockedAbort.mockRestore();
});

it('should not trigger abort experience if unmount after cc experience has started', () => {
  const mockedAbort = jest.spyOn(experienceTracker, 'abort');

  const { unmount } = renderHook(() =>
    useSetUpExperience({
      experienceTracker,
      contentId,
      spaceKey,
      experience,
      ccExperience,
    }),
  );

  experienceTracker.start({
    name: ccExperience,
    id: contentId,
  });

  unmount();

  expect(mockedAbort).not.toHaveBeenCalled();

  mockedAbort.mockRestore();
});
