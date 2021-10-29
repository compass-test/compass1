import React from 'react';

import { render } from '@testing-library/react';

import { ExperienceTracker } from '../../ExperienceTracker';
import { ExperienceStop } from '../ExperienceStop';
import { ExperienceTrackerContext } from '../ExperienceTrackerContext';

it('should render nothing', () => {
  const { container } = render(
    <ExperienceTrackerContext.Provider value={new ExperienceTracker()}>
      <ExperienceStop name="example" error={new Error('')} />
    </ExperienceTrackerContext.Provider>,
  );

  expect(container.innerHTML).toEqual('');
});

it('should call fail when provided an error', () => {
  const tracker = new ExperienceTracker();
  const failSpy = jest.spyOn(tracker, 'fail');
  const error = new Error('');

  render(
    <ExperienceTrackerContext.Provider value={tracker}>
      <ExperienceStop name="example" error={error} />
    </ExperienceTrackerContext.Provider>,
  );

  expect(failSpy).toHaveBeenCalledTimes(1);
  expect(failSpy).toHaveBeenCalledWith({
    name: 'example',
    error,
  });
});

it('should call succeed when not given an error', () => {
  const tracker = new ExperienceTracker();
  const succeedSpy = jest.spyOn(tracker, 'succeed');

  render(
    <ExperienceTrackerContext.Provider value={tracker}>
      <ExperienceStop name="example" />
    </ExperienceTrackerContext.Provider>,
  );

  expect(succeedSpy).toHaveBeenCalledTimes(1);
});

it('should abort on network error', () => {
  const experienceName = 'exampleExperienceName';
  const expectedNetworkError = new Error();
  const tracker = new ExperienceTracker({
    isNetworkOfflineError(err) {
      return err === expectedNetworkError;
    },
  });
  const abortSpy = jest.spyOn(tracker, 'abort');

  render(
    <ExperienceTrackerContext.Provider value={tracker}>
      <ExperienceStop name={experienceName} error={expectedNetworkError} />
    </ExperienceTrackerContext.Provider>,
  );

  expect(abortSpy).toHaveBeenCalledTimes(1);
  expect(abortSpy).toHaveBeenCalledWith({
    name: experienceName,
    reason: expect.stringMatching(
      /Aborted exampleExperienceName because of network error:/,
    ),
    checkForTimeout: false,
  });
});
