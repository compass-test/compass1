import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  ExperienceTrackerContext,
  ExperienceTracker,
} from '@atlassian/experience-tracker';

import { setExperiencesForwarding } from '../setExperiencesForwarding';
import { useExperienceTracker } from '../useExperienceTracker';

jest.mock('../setExperiencesForwarding', () => ({
  ...jest.requireActual<any>('../setExperiencesForwarding'),
  setExperiencesForwarding: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

it('only calls setExperienceForwarding once if the embedding product experience tracker stays the same', () => {
  const embeddingProductET = new ExperienceTracker();

  const hook = renderHook(() => useExperienceTracker(), {
    wrapper: ({ children }) => (
      <ExperienceTrackerContext.Provider value={embeddingProductET}>
        {children}
      </ExperienceTrackerContext.Provider>
    ),
  });

  hook.rerender();

  const embeddedConfluenceET = hook.result.current;

  expect(setExperiencesForwarding).toHaveBeenCalledWith(
    embeddedConfluenceET,
    embeddingProductET,
  );
  expect(setExperiencesForwarding).toBeCalledTimes(1);
});

it('calls setExperienceForwarding when the embedding product experience tracker instance changes', () => {
  const oldEmbeddingProductET = new ExperienceTracker();
  let embeddingProductET = oldEmbeddingProductET;
  const hook = renderHook(() => useExperienceTracker(), {
    wrapper: ({ children }) => (
      <ExperienceTrackerContext.Provider value={embeddingProductET}>
        {children}
      </ExperienceTrackerContext.Provider>
    ),
  });
  let embeddedConfluenceET = hook.result.current;
  expect(setExperiencesForwarding).toBeCalledTimes(1);
  expect((setExperiencesForwarding as jest.Mock).mock.calls[0][0]).toBe(
    embeddedConfluenceET,
  );
  expect((setExperiencesForwarding as jest.Mock).mock.calls[0][1]).toBe(
    oldEmbeddingProductET,
  );

  // Change the embedding product experience tracker instance and rerender
  const newEmbeddingProductET = new ExperienceTracker();
  embeddingProductET = newEmbeddingProductET;
  hook.rerender();
  embeddedConfluenceET = hook.result.current;

  expect(setExperiencesForwarding).toBeCalledTimes(2);
  expect((setExperiencesForwarding as jest.Mock).mock.calls[1][0]).toBe(
    embeddedConfluenceET,
  );
  expect((setExperiencesForwarding as jest.Mock).mock.calls[1][1]).toBe(
    newEmbeddingProductET,
  );
});
